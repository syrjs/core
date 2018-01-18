package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.View;
import android.widget.ScrollView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrScrollview implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        ScrollView scrollview = new ScrollView(context);
        JSONObject style = null;

        try {
            style = component.getJSONObject("attributes").getJSONObject("style");

        } catch (JSONException e) {
            e.printStackTrace();
        }

        scrollview.setLayoutParams(SyrStyler.styleLayout(style));
        SyrStyler.styleView(scrollview, style);

        return scrollview;
    }

    @Override
    public String getName() {
        return "ScrollView";
    }
}
