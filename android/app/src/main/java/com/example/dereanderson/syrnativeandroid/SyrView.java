package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrView implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context, View instance) {

        RelativeLayout layout;
        if(instance != null) {
            layout = (RelativeLayout) instance;
        } else {
            layout = new RelativeLayout(context);
        }

        JSONObject style = null;
        try {
            JSONObject attributes = component.getJSONObject("attributes");
            if(attributes.has("style")){
                style = attributes.getJSONObject("style");
                layout.setLayoutParams(SyrStyler.styleLayout(style));

                if(style.has("left")) {
                    layout.setX(style.getInt("left"));
                }

                if(style.has("top")) {
                    layout.setY(style.getInt("top"));
                }

                SyrStyler.styleView(layout, style);

                if(style.has("overflow")) {
                    String overflow = style.getString("overflow");
                    if(overflow.contains("hidden")) {
                        layout.setClipChildren(true);
                    } else {
                        layout.setClipChildren(false);
                    }
                }


            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return layout;
    }

    @Override
    public String getName() {
        return "View";
    }

    @SyrMethod
    // java.lang.String , int
    public void testExportMethod(String message, int duration) {
        message = message + "  " + this.getClass().getName();
        Log.i(message, message);
    }
}
