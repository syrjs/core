package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrText implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context) {
        String value = "";
        try {
            JSONObject instance = component.getJSONObject("instance");
            value = instance.getString("value");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        TextView tv = new TextView(context);
        tv.setText(value);
        return tv;
    }

    @Override
    public String getName() {
        return "Text";
    }

}
