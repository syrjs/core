package syr.js.org.syrnative;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */

public class SyrRaster {

    private Context mContext;
    private SyrRootView mRootview;
    private SyrBridge mBridge;
    public Handler uiHandler;
    private List<SyrBaseModule> mModules;
    public HashMap<String,String> registeredModules = new HashMap<>();
    private HashMap<String, Object> mModuleMap = new HashMap<String, Object>(); // getName()-> SyrClass Instance
    private HashMap<String, Object> mModuleInstances = new HashMap<String, Object>(); // guid -> Object Instance
    public ArrayList<String> exportedMethods = new ArrayList<String>();
    private LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.MATCH_PARENT,
            1.0f); //equal spacing layoutParams for stackView

    /** Instantiate the interface and set the context */
    SyrRaster(Context c) {
        mContext = c;
    }

    public void setRootview(SyrRootView rootview) {
        mRootview = rootview;

        // main thread looper for UI updates
        uiHandler = new Handler(Looper.getMainLooper());
    }

    /** Sets the native modules that will be used in this Context */
    public void setModules(List<SyrBaseModule> modules) {
        mModules = modules;

        // map module names, these will be the JSX tags
        for (int i = 0; i < modules.size(); i++) {
            SyrBaseModule module = modules.get(i);
            String moduleName = module.getName();
            String className = module.getClass().getName();

            // register the modules that are being passed
            // if name is available, then register
            // otherwise throw a warn, and skip registration
            if(mModuleMap.containsKey(module)) {
                String loadURL = String.format("Module name already taken %s", className);
                Log.w("SyrRaster", "Module name already taken");
            } else {
                registeredModules.put(className, "registered");
                mModuleMap.put(moduleName, module);
            }

            // get modules exportable methods
            getExportedMethods(module.getClass());
        }
    }

    /** Get all Exported Bridged Methods */
    public void getExportedMethods(Class clazz) {
        String originalClazzName = clazz.getName();
        while (clazz != null) {
            for (Method method : clazz.getDeclaredMethods()) {
                int modifiers = method.getModifiers();
                String methodName = method.getName();
                Annotation[] annos = method.getAnnotations();
                for(Annotation anno:annos){
                    if(anno.toString().contains("SyrMethod")) {
                        // this is a native method to export over the bridge
                        if (Modifier.isPublic(modifiers) || Modifier.isProtected(modifiers)) {
                            String paramType= "";
                            Class<?> [] parameters = method.getParameterTypes();
                            for(Class _clazz:parameters){
                                paramType = paramType + _clazz.getName() + "_";
                            }
                            String moduleMethodName = String.format("%s_%s_%s", originalClazzName, methodName, paramType);
                            exportedMethods.add(moduleMethodName);
                        }
                    }
                }
            }
            clazz = clazz.getSuperclass();
        }
    }

    public void setBridge(SyrBridge bridge) {
        mBridge = bridge;
    }

    public void parseAST(final JSONObject jsonObject) {
        uiHandler.post(new Runnable() {
            @Override
            public void run() {
                try {
                    final JSONObject ast = new JSONObject(jsonObject.getString("ast"));
                    if(jsonObject.has("update")) {
                        Boolean isUpdate = jsonObject.getBoolean("update");
                        if(!isUpdate) {
                            buildInstanceTree(ast);
                        }
                    } else {
                        buildInstanceTree(ast);
                    }

                  } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        });
    }
    /** parse the AST sent from the Syr Bridge */
    public void buildInstanceTree(JSONObject jsonObject) {
        try {
            final View component = createComponent(jsonObject);
            //@TODO move this code out to syncState.
//            if(!isUpdate) {
//                component = (View)mModuleInstances.get(jsonObject.getString("uuid"));
//            }

            if(component != null) {
//                final String elementName = jsonObject.getString("elementName");
                final String uuid = jsonObject.getString("uuid");
//                Log.d("ast", ast.toString());
                Log.d("uuid", uuid);

                JSONArray children = jsonObject.getJSONArray("children");

                if(children.length() > 0) {
                    buildChildren(children, (ViewGroup) component);
                }

                    uiHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            mRootview.addView(component);
                            emitComponentDidMount(uuid);
                        }
                    });
            } else {

                JSONArray childComponents = jsonObject.getJSONArray("children");
                JSONObject childComponent = childComponents.getJSONObject(0);
                buildInstanceTree(childComponent);
                //@TODO check if instances uuid needs to be passed.
                emitComponentDidMount(jsonObject.getString("uuid"));
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void setupAnimation(JSONObject astDict) {
        try {
            String animationStringify = astDict.getString("ast");
            JSONObject animation = new JSONObject(animationStringify);

            if(animation.has("guid")) {
                String animatedTarget = animation.getString("guid");
                View animationTarget = (View) mModuleInstances.get(animatedTarget);
                if(animationTarget != null) {
                    SyrAnimator.animate(animationTarget, animation, mBridge);
                }
            } else {
                Log.i("here", "there");
            }


        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /** removes all sub view from the root */
    public void clearRootView() {
        mModuleInstances.clear();
        uiHandler.post(new Runnable() {
            @Override
            public void run() {
                mRootview.removeAllViews();
            }
        });
    }

    public void emitComponentDidMount(String guid) {

        // send event for componentDidMount
        HashMap<String, String> eventMap = new HashMap<>();
        eventMap.put("type", "componentDidMount");
        eventMap.put("guid", guid);
        mBridge.sendEvent(eventMap);
    }

    private void buildChildren(JSONArray children, final ViewGroup viewParent) {
            try {
                for (int i = 0; i < children.length(); i++) {
                    JSONObject child = children.getJSONObject(i);
                    final View component = createComponent(child);
                    JSONArray childChildren = child.getJSONArray("children");
                    final String uuid = child.getString("uuid");


                    if(component == null) {
                        buildChildren(childChildren, (ViewGroup) viewParent);
                        uiHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                emitComponentDidMount(uuid);
                            }
                        });
                    } else {
                        if (childChildren != null && childChildren.length() > 0) {
                            buildChildren(childChildren, (ViewGroup) component);
                        }
                        //@TODO add component to a cache
                        // sending did mount event to the JS layer.
                        emitComponentDidMount(uuid);
                        Log.v("parentTYpe", Boolean.toString(viewParent instanceof LinearLayout));


                        //eeewwww siddharth you are starting to write code like Derek... :P ...that might actually be good
                        //checking to see if the parent is a stackView a.k.a LinearLayout
                        //@TODO if possible do something similar to respondsToSelector on Obj c
                        if (viewParent instanceof LinearLayout) {
                            //@TODO defaulting to equal spacing between components. Need to change it and add spacing concept.
                            component.setLayoutParams(params);
                        }
                            //@TODO need better handling
                            uiHandler.post(new Runnable() {
                                @Override
                                public void run() {
                                    if (component.getParent() != null) {
                                        ViewGroup parent = (ViewGroup) component.getParent();
                                        parent.removeView(component);
                                    }

                                    viewParent.addView(component);
                                    emitComponentDidMount(uuid);
                                }
                            });

                        if (component instanceof ViewGroup) {
                            buildChildren(childChildren, (ViewGroup) component);
                        }
                    }
                    }
            } catch (JSONException e) {
                e.printStackTrace();
            }
    }

    private View createComponent(final JSONObject child)  {
        String className = null;
        View returnView = null;
        String guid = null;
        if(child.has("elementName")) {
            try {
                guid = child.getString("guid");
                className = child.getString("elementName");
                final SyrBaseModule componentModule = (SyrBaseModule) mModuleMap.get(className);

                if (componentModule == null) {
                    return null;
                }

                if (mModuleInstances.containsKey(child.getString("guid"))) {

                    final View view = (View) mModuleInstances.get(child.getString("guid"));
                    uiHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            componentModule.render(child, mContext, view);
                        }
                    });

                } else {
                    returnView = componentModule.render(child, mContext, null);
                    mModuleInstances.put(child.getString("guid"), returnView);
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }

            return (View) mModuleInstances.get(guid);
        } else {
            return null;
        }

    }
}
