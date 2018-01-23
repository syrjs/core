package com.example.dereanderson.syrnativeandroid;

import android.animation.ObjectAnimator;
import android.content.Context;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.Typeface;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrButton implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        Button button;

        if(instance != null) {
            button = (Button) instance;
        } else {
            button =  new Button(context);
        }

        button.setAllCaps(false);
        JSONObject style = null;

        try {
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject jsonAttributes =  jsonInstance.getJSONObject("attributes");
            final String guid  = component.getString("guid");

            // if enabled prop is passed set it, else default to true
            Boolean isEnabled;
            if (jsonAttributes.has("enabled")) {
                isEnabled = jsonAttributes.getBoolean("enabled");
            } else {
                isEnabled = true;
            }

            button.setEnabled(isEnabled);

            // create button
            if (instance == null) {
                button.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        HashMap<String, String> eventMap = new HashMap<String, String>();
                        eventMap.put("type", "onPress");
                        eventMap.put("guid", guid);
                        SyrEventHandler.getInstance().sendEvent(eventMap);
                    }
                });
            }

            // set button styles
            if (component.has("attributes") && component.getJSONObject("attributes").has("style")){

                style = component.getJSONObject("attributes").getJSONObject("style");
                button.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(button, style);

                if (style.has("color")) {
                    button.setTextColor(Color.parseColor(style.getString("color")));
                }

                if (style.has("fontWeight")) {
                    if (style.getString("fontWeight").contains("bold")){
                        button.setTypeface(null, Typeface.BOLD);
                    }
                }
             }

             // set button label/text
            button.setText(jsonInstance.getString("value"));

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
