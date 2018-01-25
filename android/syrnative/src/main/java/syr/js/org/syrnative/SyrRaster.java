package syr.js.org.syrnative;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

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
                buildInstanceTree(jsonObject);
            }
        });
    }
    /** parse the AST sent from the Syr Bridge */
    public void buildInstanceTree(JSONObject jsonObject) {
        try {
            final JSONObject ast = new JSONObject(jsonObject.getString("ast"));
            final String guid = ast.getString("guid");

            Boolean isUpdate = false;
            if(ast.has("update")) {
                isUpdate = ast.getBoolean("update");
            }

            // we shouldn't touch the layout of a view attached to the RootView
            final View component;
            if(!isUpdate) {
                component = createComponent(ast);
            } else {
                component = (View)mModuleInstances.get(guid);
            }

            final String elementName = ast.getString("elementName");

            JSONArray children = ast.getJSONArray("children");

            if(children.length() > 0) {
                buildChildren(children, (ViewGroup) component, isUpdate);
            }

            if(!isUpdate) {
                uiHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        mRootview.addView(component);
                        emitComponentDidMount(guid);
                    }
                });
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

    private void buildChildren(JSONArray children, final ViewGroup viewParent, Boolean isUpdate) {
            try {
                for (int i = 0; i < children.length(); i++) {
                    JSONObject child = children.getJSONObject(i);
                    final View component = createComponent(child);
                    JSONArray childChildren = child.getJSONArray("children");
                    final String guid = child.getString("guid");


                    if(component == null) {
                        buildChildren(childChildren, (ViewGroup) viewParent, isUpdate);
                        uiHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                emitComponentDidMount(guid);
                            }
                        });
                    } else {
                        if(!isUpdate) {
                            uiHandler.post(new Runnable() {
                                @Override
                                public void run() {
                                    if(component.getParent() != null){
                                        ViewGroup parent = (ViewGroup) component.getParent();
                                        parent.removeView(component);
                                    }
                                    viewParent.addView(component);
                                    emitComponentDidMount(guid);
                                }
                            });
                        }

                        if(component instanceof ViewGroup) {
                            buildChildren(childChildren, (ViewGroup) component, isUpdate);
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
        try {
            guid = child.getString("guid");
            className = child.getString("elementName");
            final SyrBaseModule componentModule = (SyrBaseModule) mModuleMap.get(className);

            if(componentModule == null) {
                return null;
            }

            if(mModuleInstances.containsKey(child.getString("guid"))) {

                final View view = (View)mModuleInstances.get(child.getString("guid"));
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
    }
}
