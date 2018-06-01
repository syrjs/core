package syr.js.org.syrnative;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.LayerDrawable;
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


            if(style.has("width")) {

                params.width = style.getInt("width");

            }

            if(style.has("height")) {

                params.height = style.getInt("height");
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
        return params;
    }

    static public void styleView(View component, JSONObject style) {


            try {

                GradientDrawable gd = new GradientDrawable();

                Drawable[] layers = {gd};

                LayerDrawable layerDrawable = new LayerDrawable(layers);
                if(style.has("backgroundColor")) {
                    String backgroundColor = style.getString("backgroundColor");
                    gd = new GradientDrawable(
                            GradientDrawable.Orientation.TOP_BOTTOM,
                            new int[] {getColor(backgroundColor), getColor(backgroundColor)});
                }

                if(style.has("borderRadius")) {
                    float borderRadius = style.getInt("borderRadius");
                    gd.setCornerRadius(borderRadius);
                }

                if(style.has("borderColor") && style.has("borderWidth")) {
                    // borders on views
                    gd.setStroke(style.getInt("borderWidth"), getColor(style.getString("borderColor")));

                } else  if(style.has("borderColor")) {

                    gd.setStroke(3, getColor(style.getString("borderColor")));
                }

                if(style.has("borderRightWidth") || style.has("borderLeftWidth")) {

                    layerDrawable.setLayerInset(0, 6, -3, -3, -3);

                    component.setBackground(layerDrawable);
                } else {
                    component.setBackground(gd);
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }

    }
    //
    static LayerDrawable getBorders(int bgColor, int borderColor,
                                    int left, int top, int right, int bottom){
        // Initialize new color drawables
        ColorDrawable borderColorDrawable = new ColorDrawable(borderColor);
        ColorDrawable backgroundColorDrawable = new ColorDrawable(bgColor);

        // Initialize a new array of drawable objects
        Drawable[] drawables = new Drawable[]{
                borderColorDrawable,
                backgroundColorDrawable
        };

        // Initialize a new layer drawable instance from drawables array
        LayerDrawable layerDrawable = new LayerDrawable(drawables);

        // Set padding for background color layer
        layerDrawable.setLayerInset(
                1, // Index of the drawable to adjust [background color layer]
                left, // Number of pixels to add to the left bound [left border]
                top, // Number of pixels to add to the top bound [top border]
                right, // Number of pixels to add to the right bound [right border]
                bottom // Number of pixels to add to the bottom bound [bottom border]
        );

        // Finally, return the one or more sided bordered background drawable
        return layerDrawable;
    }
}
