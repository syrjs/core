package syr.js.org.syrnative;

import android.graphics.Color;
import android.graphics.PorterDuff;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.LayerDrawable;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Array;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrStyler{

    static public int getColor(String colorString) {
        if(colorString.contains("rgb")) {
            if(colorString.contains("rgba")) {
                colorString = colorString.replace("rgba(","");
            }
            colorString = colorString.replace(("rgb"), "");
            colorString = colorString.replace(")", "");

            String[] colors = colorString.split(",");

            int red = Integer.parseInt(colors[0]);
            int blue = Integer.parseInt(colors[1]);
            int green = Integer.parseInt(colors[2]);

            double alphaD = 0.00;
            if(colors[3] != null){
                alphaD = Double.parseDouble(colors[3]);
                alphaD = 255/alphaD;
            }

            int alpha = (int)alphaD;

            return Color.argb(175, red, blue, green);
        } else if(colorString.contains("#")) {
            return Color.parseColor(colorString);
        }
        return Color.parseColor("#ffffff");
    }

    static public ViewGroup.LayoutParams styleLayout(JSONObject style) {
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(0,0);
        try {
            Integer left = 0;
            Integer top = 0;

            if(style.has("width")) {

                params.width = style.getInt("width");

            }

            if(style.has("height")) {
                
                params.height = style.getInt("height");
            }

            if(style.has("left")) {
                left = style.getInt("left");
            }

            if(style.has("top")) {
                top = style.getInt("top");
            }



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
                        new int[] {getColor(backgroundColor), getColor(backgroundColor)});

                if(style.has("borderRadius")) {
                    Integer borderRadius = style.getInt("borderRadius");
                    gd.setCornerRadius(borderRadius);
                }

                if(style.has("borderColor") && style.has("borderWidth")) {
                    // borders on views
                    gd.setStroke(style.getInt("borderWidth"), getColor(style.getString("borderColor")));

                } else  if(style.has("borderColor")) {

                    gd.setStroke(3, getColor(style.getString("borderColor")));
                }

                component.setBackground(gd);

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
