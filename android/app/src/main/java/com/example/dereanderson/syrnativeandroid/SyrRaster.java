package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.Locale;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */

public class SyrRaster {

    private Context mContext;
    private SyrRootView mRootview;
    private Handler uiHandler;

    /** Instantiate the interface and set the context */
    SyrRaster(Context c) {
        mContext = c;
    }

    public void setRootview(SyrRootView rootview) {
        mRootview = rootview;
        uiHandler = new Handler(Looper.getMainLooper());
    }

    public void parseAST(JSONObject jsonObject) {
        try {
            JSONObject ast = new JSONObject(jsonObject.getString("ast"));
            JSONArray children = ast.getJSONArray("children");
            Object component = createComponent(ast);
            final String elementName = ast.getString("elementName");
            String guid = ast.getString("guid");

            // abstract this out into classes, check to see how Java lets you register
            // with decorators
            uiHandler.post(new Runnable() {
                @Override
                public void run() {
                    if(elementName.contains("View")) {

                    }
                    Log.i("Stuff","parseAST: yo");
                }
            });

            if(children.length() > 0) {
                buildChildren(children, component);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void buildChildren(JSONArray children, Object viewParent) {
            try {
                for (int i = 0; i < children.length(); i++) {
                    JSONObject child = children.getJSONObject(i);
                    Object component = createComponent(child);
                    JSONArray childChildren = child.getJSONArray("children");
                    buildChildren(childChildren, component);
                    Log.i("Stuff","buildChildren: yo");
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
    }

    private Object createComponent(JSONObject child) {
        Object component = SyrView.render(mContext, child);
        return component;
    }
}
