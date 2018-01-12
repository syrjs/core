package com.example.dereanderson.syrnativeandroid;

import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.GradientDrawable;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrStyler{
    static public ViewGroup.LayoutParams styleLayout(JSONObject style) {
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(0,0);
        try {
            Integer left = 0;
            Integer top = 0;

            if(style.has("width") && style.has("height")) {

                params.height = style.getInt("height");
                params.width = style.getInt("width");

            }

            if(style.has("left")) {
                left = style.getInt("left");
            }

            if(style.has("top")) {
                top = style.getInt("top");
            }

            params.setMargins(left,top,0,0);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        return params;
    }

    static public void styleView(View component, JSONObject style) {

        if(style.has("backgroundColor")) {
            try {

                String backgroundColor = style.getString("backgroundColor");

                GradientDrawable gd = new GradientDrawable(
                        GradientDrawable.Orientation.TOP_BOTTOM,
                        new int[] {Color.parseColor(backgroundColor), Color.parseColor(backgroundColor)});

                if(style.has("borderRadius")) {
                    Integer borderRadius = style.getInt("borderRadius");
                    gd.setCornerRadius(borderRadius);
                }

                if(style.has("borderColor") && style.has("borderWidth")) {
                    // borders on views
                    gd.setStroke(style.getInt("borderWidth"), Color.parseColor(style.getString("borderColor")));

                } else  if(style.has("borderColor")) {

                    gd.setStroke(3, Color.parseColor(style.getString("borderColor")));
                }

                component.setBackground(gd);

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
