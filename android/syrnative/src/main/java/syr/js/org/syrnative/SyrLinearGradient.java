package syr.js.org.syrnative;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.View;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrLinearGradient implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        View view = new View(context);
        JSONObject style = null;
        JSONArray colors = null;

        try {
            JSONObject attributes = component.getJSONObject("attributes");
            style = attributes.getJSONObject("style");
            colors = attributes.getJSONArray("colors");

            GradientDrawable gd = new GradientDrawable(
                    GradientDrawable.Orientation.TOP_BOTTOM,
                    new int[]{Color.parseColor(colors.getString(0)),
                            Color.parseColor(colors.getString(1))});

            if (style.has("borderColor") && style.has("borderWidth")) {
                // borders on views
                gd.setStroke(style.getInt("borderWidth"), Color.parseColor(style.getString("borderColor")));

            } else if (style.has("borderColor")) {

                gd.setStroke(3, Color.parseColor(style.getString("borderColor")));
            }

            // corner radius
            if (style.has("borderRadius")) {
                gd.setCornerRadius(style.getInt("borderRadius"));
            } else {
                gd.setCornerRadius(0);
            }

            view.setBackground(gd);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        view.setLayoutParams(SyrStyler.styleLayout(style));
        //SyrStyler.styleView(view, style);


        return view;
    }

    @Override
    public String getName() {
        return "LinearGradient";
    }
}
