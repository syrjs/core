package com.example.dereanderson.syrnativeandroid;

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
    private Handler uiHandler;
    private List<SyrBaseModule> mModules;
    private HashMap<String, Object> mModuleMap;
    private HashMap<String, Object> mModuleInstances = new HashMap<String, Object>();
    public ArrayList<String> exportedMethods = new ArrayList<String>();

    /** Instantiate the interface and set the context */
    SyrRaster(Context c) {
        mModuleMap = new HashMap<String, Object>();
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
                mModuleMap.put(moduleName, module);
            }

            // get modules exportable methods
            getExportedMethods(module.getClass());
        }
    }

    /** Get all Exported Bridged Methods */
    public void getExportedMethods(Class clazz) {
        ArrayList<String> methods = new ArrayList<String>();
        while (clazz != null) {
            for (Method method : clazz.getDeclaredMethods()) {
                int modifiers = method.getModifiers();
                String methodName = method.getName();
                Annotation[] annos = method.getAnnotations();
                for(Annotation anno:annos){
                    if(anno.toString().contains("SyrMethod")) {
                        // this is a native method to export over the bridge
                        if (Modifier.isPublic(modifiers) || Modifier.isProtected(modifiers)) {
                            String moduleMethodName = String.format("%s_%s",clazz.getName(), methodName);
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

    /** parse the AST sent from the Syr Bridge */
    public void parseAST(JSONObject jsonObject) {
        try {
            final JSONObject ast = new JSONObject(jsonObject.getString("ast"));
            final View component = createComponent(ast);
            final String elementName = ast.getString("elementName");
            final String guid = ast.getString("guid");
            JSONArray children = ast.getJSONArray("children");

            if(children.length() > 0) {
                buildChildren(children, (ViewGroup) component);
            }

            uiHandler.post(new Runnable() {
                @Override
                public void run() {
                    mRootview.addView(component);
                    emitComponentDidMount(guid);
                }
            });

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void setupAnimation(JSONObject astDict) {
        try {
            String animationStringify = astDict.getString("ast");
            JSONObject animation = new JSONObject(animationStringify);
            String animatedTarget = animation.getString("guid");
            View animationTarget = (View) mModuleInstances.get(animatedTarget);
            if(animatedTarget != null) {
                SyrAnimator.animate(animationTarget, animation, mBridge);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    /** removes all sub view from the root */
    public void clearRootView() {
        mRootview.removeAllViews();
    }

    public void emitComponentDidMount(String guid) {

        // send event for componentDidMount
        HashMap<String, String> eventMap = new HashMap<>();
        eventMap.put("type", "componentDidMount");
        eventMap.put("guid", guid);
        mBridge.sendEvent(eventMap);
    }

    private void buildChildren(JSONArray children, ViewGroup viewParent) {
            try {
                for (int i = 0; i < children.length(); i++) {
                    JSONObject child = children.getJSONObject(i);
                    View component = createComponent(child);
                    JSONArray childChildren = child.getJSONArray("children");
                    final String guid = child.getString("guid");
                    viewParent.addView(component);

                    // bridge posts needs to be gui threads
                    uiHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            emitComponentDidMount(guid);
                        }
                    });

                    if(component instanceof ViewGroup) {
                        buildChildren(childChildren, (ViewGroup) component);
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
    }

    private View createComponent(JSONObject child) throws JSONException {
        String className = child.getString("elementName");
        SyrBaseModule componentModule = (SyrBaseModule) mModuleMap.get(className);
        View returnView = null;

        returnView = componentModule.render(child, mContext);
        mModuleInstances.put(child.getString("guid"), returnView);

        return returnView;
    }
}
