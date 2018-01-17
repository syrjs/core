package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
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
    public View render(JSONObject component, Context context) {
        RelativeLayout layout = new RelativeLayout(context);
        JSONObject style = null;

        try {
            style = component.getJSONObject("attributes").getJSONObject("style");

        } catch (JSONException e) {
            e.printStackTrace();
        }

        layout.setLayoutParams(SyrStyler.styleLayout(style));
        SyrStyler.styleView(layout, style);

        return layout;
    }

    @Override
    public String getName() {
        return "View";
    }

    @SyrMethod
    public void testExportMethod(String message, int duration) {

    }
}
