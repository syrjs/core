package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.text.Layout;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
    private Handler uiHandler;
    private List<SyrBaseModule> mModules;
    private HashMap<String, Object> mModuleMap;
    private HashMap<String, Object> mModuleInstances;

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

    public void setModules(List<SyrBaseModule> modules) {
        mModules = modules;

        // map module names, these will be the JSX tags
        for (int i = 0; i < modules.size(); i++) {
            SyrBaseModule module = modules.get(i);
            String moduleName = module.getName();
            mModuleMap.put(moduleName, module);
        }
    }

    public void parseAST(JSONObject jsonObject) {
        try {
            final JSONObject ast = new JSONObject(jsonObject.getString("ast"));
            final View component = createComponent(ast);
            final String elementName = ast.getString("elementName");
            JSONArray children = ast.getJSONArray("children");
            String guid = ast.getString("guid");

            if(children.length() > 0) {
                buildChildren(children, (ViewGroup) component);
            }

            uiHandler.post(new Runnable() {
                @Override
                public void run() {
                    mRootview.addView(component);
                }
            });

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void buildChildren(JSONArray children, ViewGroup viewParent) {
            try {
                for (int i = 0; i < children.length(); i++) {
                    JSONObject child = children.getJSONObject(i);
                    View component = createComponent(child);
                    JSONArray childChildren = child.getJSONArray("children");
                    viewParent.addView(component);

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

        return returnView;
    }
}
