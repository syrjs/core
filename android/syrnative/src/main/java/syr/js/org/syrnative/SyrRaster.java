package syr.js.org.syrnative;

import android.content.Context;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.ScrollView;

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
    public Handler animationHandler;
    private List<SyrBaseModule> mModules;
    public HashMap<String, String> registeredModules = new HashMap<>();
    private HashMap<String, Object> mModuleMap = new HashMap<String, Object>(); // getName()-> SyrClass Instance
    private HashMap<String, Object> mModuleInstances = new HashMap<String, Object>(); // guid -> Object Instance
    private HashMap<String, String> mModuleCache = new HashMap<String, String>();
    public ArrayList<String> exportedMethods = new ArrayList<String>();
    private LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT,
            1.0f);

    /**
     * Instantiate the interface and set the context
     */
    SyrRaster(Context c) {
        mContext = c;
    }

    public void setRootview(SyrRootView rootview) {
        mRootview = rootview;
        // main thread looper for UI updates
        uiHandler = new Handler(Looper.getMainLooper());
    }

    /**
     * Sets the native modules that will be used in this Context
     */
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
            if (mModuleMap.containsKey(module)) {
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

    /**
     * Get all Exported Bridged Methods
     */
    public void getExportedMethods(Class clazz) {
        String originalClazzName = clazz.getName();
        while (clazz != null) {
            for (Method method : clazz.getDeclaredMethods()) {
                int modifiers = method.getModifiers();
                String methodName = method.getName();
                Annotation[] annos = method.getAnnotations();
                for (Annotation anno : annos) {
                    if (anno.toString().contains("SyrMethod")) {
                        // this is a native method to export over the bridge
                        if (Modifier.isPublic(modifiers) || Modifier.isProtected(modifiers)) {
                            String paramType = "";
                            Class<?>[] parameters = method.getParameterTypes();
                            for (Class _clazz : parameters) {
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
                    Boolean Update = ast.has("update");
                    if (ast.has("update")) {
                        Boolean isUpdate = ast.getBoolean("update");
                        if (isUpdate) {
                            update(ast);
                        } else {
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

    public void update(JSONObject ast) {
        syncState(ast, null);
    }

    public void syncState(final JSONObject component, ViewGroup viewParent) {

        try {
//            final String uuid = component.getString("uuid");

            //getting uuid of the component
            String tempUid = component.getString("uuid");

            final String reUpdate;
            //checking to see if it has a key (component inside an array), if it does changing it to match the key set we have in the cache

            if (component.has("attributes")) {
                if (component.getJSONObject("attributes").has("key")) {
                    tempUid = tempUid.concat(component.getJSONObject("attributes").getString("key"));
                }
            }

            final String uuid = tempUid;

            //getting the children of the components
            JSONArray children = component.getJSONArray("children");

            //checking if the component has been rendered before
            final View componentInstance = (View) mModuleInstances.get(uuid);

            if (componentInstance instanceof ViewGroup) {
                viewParent = (ViewGroup) componentInstance;
            }

            //getting the className of the element
            String className = null;
            if (component.has("elementName")) {
                className = component.getString("elementName");
            }

            //getting a componentModule if one is available with a className
            final SyrComponent componentModule = (SyrComponent) mModuleMap.get(className);

            //UNMOUNT CODE

            //checking for umount on the component --- only components to be umounted have this on them.
            Boolean unmount = null;
            if (component.has("unmount")) {
                unmount = component.getBoolean("unmount");
            }

            //remove the component from its parent if it has unmount on it
            if (unmount != null && unmount) {
                //BEST CASE scenario, the component to unmount is a single component which is a renderable
                //if we have an instance of it in the cache
                if (componentInstance != null) {
                    final View instanceToRemove = componentInstance;
                    mModuleInstances.remove(uuid); //remove the element from the cache to avoid unecessary collisions
                    uiHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            final ViewGroup parent = (ViewGroup) instanceToRemove.getParent();
                            if (instanceToRemove.getParent() != null) {
                                parent.removeView(instanceToRemove);
                                emitComponentDidUnMount(uuid);
                            }
                            //@TODO need to assign a new viewParent Here since we took out the current one
//                            viewParent = parent;
                        }
                    });
                } else { //this is the use case where the or the component to unmount is a non-renderable so we need to unmount all its children
                    if (children != null) {
                        //unmount the children if the parent is a non-renderable
                        unmountChildren(component);
                    }
                }
            } else { //no unmount on the component
                if (componentInstance != null && componentModule != null) {
                    //this will update an existing component, does not create or attach a new component.
                    View updatedComponent = createComponent(component);
                    //if the updated component is a view group and has children
                    if (updatedComponent instanceof ViewGroup) {
                        viewParent = (ViewGroup) updatedComponent;
                    }
                } else if (componentInstance == null && componentModule != null) { //if it is a new renderable element that has not been rendered yet.
                    final View newComponent = createComponent(component);
                    final ViewGroup vParent = viewParent; //reference to the current viewParent
                    if (viewParent instanceof LinearLayout) {
                        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                                LinearLayout.LayoutParams.WRAP_CONTENT,
                                LinearLayout.LayoutParams.WRAP_CONTENT,
                                1.0f);
                        newComponent.setLayoutParams(params);
                    }
                    uiHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            //add component to the viewParent
                            vParent.addView(newComponent);
                            emitComponentDidMount(uuid);
                        }
                    });
                    if (newComponent instanceof ViewGroup) {
                        viewParent = (ViewGroup) newComponent;
                    }

                }
            }
            syncChildren(component, viewParent);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void unmountChildren(final JSONObject component) {
        try {
            //get the children of the component
            JSONArray children = component.getJSONArray("children");
            for (int i = 0; i < children.length(); i++) {
                JSONObject child = children.getJSONObject(i);
                String childuuid = child.getJSONObject("instance").getString("uuid");
                View childInstance = (View) mModuleInstances.get(childuuid);
                //if the child is a non-renderable, get the first child (since we follow the pattern of returning a singe view), to unmount
                if (childInstance == null && child.has("children")) {
                    child = child.getJSONArray("children").getJSONObject(0);
                    childuuid = child.getJSONObject("instance").getString("uuid");
                    childInstance = (View) mModuleInstances.get(childuuid);
                }
                final String uuidToRemove = childuuid;
                final View instanceToRemove = childInstance;
                //just double checking, this will always hold true. Not sure why I dont trust my own code.
                Boolean unmountChildInstance = component.getBoolean("unmount");
                if (unmountChildInstance == true) {
                    mModuleInstances.remove(childuuid);
//                        uiHandler.post(new Runnable() {
//                            @Override
//                            public void run() {
                    if (instanceToRemove.getParent() != null) {
                        ViewGroup parent = (ViewGroup) instanceToRemove.getParent();
                        parent.removeView(instanceToRemove);
                        emitComponentDidUnMount(uuidToRemove);
                    }
//                            }
//                        });
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void syncChildren(final JSONObject component, final ViewGroup viewParent) {


        try {
            JSONArray children = component.getJSONArray("children");
            if (children != null && children.length() > 0) {
                String key = null;
                if (component.has("attributes")) {
                    JSONObject attributes = component.getJSONObject("attributes");
                    if (attributes.has("key")) {
                        key = attributes.getString("key");
                    }
                }
                for (int i = 0; i < children.length(); i++) {
                    JSONObject child = children.getJSONObject(i);
                    if (key != null) {
                        child.put("key", key);
                    }
                    syncState(child, viewParent);
                }
            } else {
                return;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /**
     * parse the AST sent from the Syr Bridge
     */
    public void buildInstanceTree(final JSONObject jsonObject) {
        try {
            final View component = createComponent(jsonObject);
            final JSONObject js = jsonObject;

            if (component != null) {
                final String uuid = jsonObject.getString("uuid");
                Log.d("uuid", uuid);

                JSONArray children = jsonObject.getJSONArray("children");

                if (component instanceof ScrollView && children.length() > 1) {
                    JSONObject firstChild = new JSONObject();
                    JSONObject style = new JSONObject();
                    JSONObject firstChildInstance = jsonObject.getJSONObject("instance");
                    firstChild.put("elementName", "View");
                    firstChild.put("attributes", jsonObject.getJSONObject("attributes"));
                    firstChild.put("children", children);
                    //this will emit an unecessary event to the JS layer, which will not be listened. Will get rid of this as soon as we finish everything. Pinky Promise!!!
                    firstChild.put("guid", jsonObject.getString("guid").concat("-1"));
                    firstChild.put("uuid", uuid.concat("-1"));
                    firstChildInstance.put("guid", jsonObject.getString("guid").concat("-1"));
                    firstChildInstance.put("uuid", uuid.concat("-1"));

                    style.put("height", firstChildInstance.getJSONObject("style").getInt("height"));
                    style.put("width", firstChildInstance.getJSONObject("style").getInt("width"));
                    firstChildInstance.put("style", style);
                    firstChild.put("instance", firstChildInstance);
                    children = new JSONArray().put(firstChild);
                }

                if (children.length() > 0) {
                    buildChildren(children, (ViewGroup) component, jsonObject, jsonObject);
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

            if (animation.has("guid")) {
                String animatedTarget = animation.getString("guid");
                View animationTarget = (View) mModuleInstances.get(animatedTarget);
                if (animationTarget != null) {
                    SyrAnimator.animate(animationTarget, animation, mBridge);
                }
            } else {
                Log.i("here", "there");
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /**
     * removes all sub view from the root
     */
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
        try {
            JSONObject eventMap = new JSONObject();
            eventMap.put("type", "componentDidMount");
            eventMap.put("guid", guid);
            mBridge.sendEvent(eventMap);
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    public void emitComponentDidUnMount(String guid) {

        // send event for componentDidMount
        try {
            JSONObject eventMap = new JSONObject();
            eventMap.put("type", "componentDidUnMount");
            eventMap.put("guid", guid);
            mBridge.sendEvent(eventMap);
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    private void buildChildren(JSONArray children, final ViewGroup viewParent, JSONObject renderedParent, JSONObject immediateParent) {
        try {

            for (int i = 0; i < children.length(); i++) {
                JSONObject child = children.getJSONObject(i);
                final View component = createComponent(child);
                JSONArray childChildren = child.getJSONArray("children");
                String tempUid = child.getString("uuid");
                ;
                if (child.has("attributes")) {
                    if (child.getJSONObject("attributes").has("key")) {
                        tempUid = tempUid.concat(child.getJSONObject("attributes").getString("key"));
                    }
                }
                final String uuid = tempUid;

                if (component instanceof ScrollView && children.length() > 1) {
                    JSONObject firstChild = new JSONObject();
                    JSONObject style = new JSONObject();
                    JSONObject firstChildInstance = child.getJSONObject("instance");
                    firstChild.put("elementName", "View");
                    firstChild.put("attributes", child.getJSONObject("attributes"));
                    firstChild.put("children", childChildren);
                    //this will emit an unecessary event to the JS layer, which will not be listened. Will get rid of this as soon as we finish everything. Pinky Promise!!!
                    firstChild.put("guid", child.getString("guid").concat("-1"));
                    firstChild.put("uuid", uuid.concat("-1"));
                    firstChildInstance.put("guid", child.getString("guid").concat("-1"));
                    firstChildInstance.put("uuid", uuid.concat("-1"));

                    style.put("height", firstChildInstance.getJSONObject("style").getInt("height"));
                    style.put("width", firstChildInstance.getJSONObject("style").getInt("width"));
                    firstChildInstance.put("style", style);
                    firstChild.put("instance", firstChildInstance);
                    childChildren = new JSONArray().put(firstChild);
                }

                if (component == null) {
                    buildChildren(childChildren, viewParent, renderedParent, child);
                    uiHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            emitComponentDidMount(uuid);
                        }
                    });
                } else {

                    //checking to see if the parent is a stackView a.k.a LinearLayout
                    //@TODO if possible do something similar to respondsToSelector on Obj c
                    if (viewParent instanceof LinearLayout) {
                        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                                LinearLayout.LayoutParams.WRAP_CONTENT,
                                LinearLayout.LayoutParams.WRAP_CONTENT,
                                1.0f); //equal spacing layoutParams for stackView

                        JSONObject parentInstance = renderedParent.getJSONObject("instance");
                        JSONObject parentProps = parentInstance.getJSONObject("props");
                        if (parentProps.has("spacing") && renderedParent.has("renderedChildren")) {
                            params.setMargins(0, parentProps.getInt("spacing"), 0, 0);
                        }
                        //@TODO defaulting to equal spacing between components. Need to change it and add spacing and distribution concept.
                        component.setLayoutParams(params);
                        if (renderedParent.has("renderedChildren")) {
                            renderedParent.getJSONArray("renderedChildren").put(component);
                        } else {
                            JSONArray renderedChildren = new JSONArray();
                            renderedChildren.put(component);
                            renderedParent.put("renderedChildren", renderedChildren);
                        }

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
                        buildChildren(childChildren, (ViewGroup) component, child, child);
                    }
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private View createComponent(final JSONObject child) {
        String className = null;
        View returnView = null;
        String uuid = null;
        if (child.has("elementName")) {

            try {

                uuid = child.getString("uuid");
                if (child.has("attributes")) {
                    if (child.getJSONObject("attributes").has("key")) {
                        uuid = uuid.concat(child.getJSONObject("attributes").getString("key"));
                    }
                }
                className = child.getString("elementName");
                final SyrComponent componentModule = (SyrComponent) mModuleMap.get(className);

                if (componentModule == null) {
                    return null;
                }

                if (mModuleInstances.containsKey(uuid)) {

                    final View view = (View) mModuleInstances.get(child.getString("uuid"));


                    componentModule.render(child, mContext, view);


                } else {
                    returnView = componentModule.render(child, mContext, null);
                    mModuleInstances.put(uuid, returnView);
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }

            return (View) mModuleInstances.get(uuid);
        } else {
            return null;
        }

    }
}
