package com.example.dereanderson.syrnativeandroid;

import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;

import org.json.JSONObject;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrStyler{
    static public ViewGroup.LayoutParams styleLayout(JSONObject style) {
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(100,100);
        return params;
    }

    static public void styleView(View component, JSONObject style) {
        component.setBackgroundColor(Color.parseColor("#000000"));
    }
}
