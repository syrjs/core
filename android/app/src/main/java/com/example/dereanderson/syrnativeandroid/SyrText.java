package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.util.TypedValue;
import android.view.Gravity;
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
        Integer left = 0;
        Integer top = 0;
        TextView textView = new TextView(context);

        try {
            JSONObject instance = component.getJSONObject("instance");
            JSONObject attributes = component.getJSONObject("attributes");

            if(attributes.has("style")) {
                style = attributes.getJSONObject("style");
                left = style.getInt("left");
                top = style.getInt("top");
                if(style.has("color")) {
                    textView.setTextColor(Color.parseColor(style.getString("color")));
                }

                if(style.has("fontSize")) {
                    textView.setTextSize(TypedValue.COMPLEX_UNIT_PX,style.getInt("fontSize"));
                }

                if(style.has("fontWeight")) {
                    if(style.getString("fontWeight").contains("bold")){
                        textView.setTypeface(null, Typeface.BOLD);
                    }
                }

                if(style.has("textAlign")) {
                    if(style.getString("textAlign").contains("center")) {
                        textView.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
                        textView.setGravity(Gravity.CENTER_HORIZONTAL);
                    } else if(style.getString("textAlign").contains("right")) {
                        textView.setTextAlignment(View.TEXT_ALIGNMENT_TEXT_END);
                    } else {
                        textView.setTextAlignment(View.TEXT_ALIGNMENT_TEXT_START);
                    }
                }
//
            }

            value = instance.getString("value");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        textView.setText(value);

        if(style != null) {
            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT);
            lp.setMargins(left, top, 0, 0);
            textView.setLayoutParams(lp);
        }

        return textView;
    }

    @Override
    public String getName() {
        return "Text";
    }

}
