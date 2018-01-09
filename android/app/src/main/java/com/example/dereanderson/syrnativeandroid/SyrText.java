package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
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
        JSONObject style = null;

        try {
            JSONObject instance = component.getJSONObject("instance");
            JSONObject attributes = component.getJSONObject("attributes");

            if(attributes.has("style")) {
                style = attributes.getJSONObject("style");
            }

            value = instance.getString("value");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        TextView tv = new TextView(context);
        tv.setText(value);

        if(style != null) {
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT);
            lp.setMargins(50, 300, 0, 0);
            tv.setLayoutParams(lp);
        }

        return tv;
    }

    @Override
    public String getName() {
        return "Text";
    }

}
