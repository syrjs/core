package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.view.View;
import android.widget.Button;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrButton implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context) {
        Button button = new Button(context);
        JSONObject style = null;

        try {
            JSONObject instance = component.getJSONObject("instance");
            if(component.has("attributes") && component.getJSONObject("attributes").has("style")){

                style = component.getJSONObject("attributes").getJSONObject("style");

                button.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(button, style);

            }

            button.setText(instance.getString("value"));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return button;
    }

    @Override
    public String getName() {
        return "Button";
    }
}
