package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.View;
import android.widget.ImageView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrImage implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context) {
        String value = "";
        JSONObject style = null;
        JSONObject source = null;
        Integer left = 0;
        Integer top = 0;
        ImageView imageView = new ImageView(context);

        try {
            JSONObject instance = component.getJSONObject("instance");
            JSONObject attributes = component.getJSONObject("attributes");

            if (attributes.has("style")) {
                style = attributes.getJSONObject("style");
                imageView.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(imageView, style);
            }

            if (attributes.has("source")) {
                // grabs the source url if present
                source = attributes.getJSONObject("source");
                String path = source.toString();

                // check if image exists in Resources
                int pathExists = context.getResources().getIdentifier(path, "drawable", context.getPackageName());

                if (pathExists != 0) {
                    // if exist set image
                    imageView.setScaleType(ImageView.ScaleType.FIT_XY);
                    imageView.setImageResource(pathExists);
                } else {
                    // throw yellow box that image is not found in res/drawable
                    // revert to a friendly image for now
                    imageView.setImageResource(R.drawable.ic_muppets_misspiggy);
                }

            } else {
                // throw red box because missing source prop entirely
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (style != null) {

        }

        return imageView;
    }

    @Override
    public String getName() {
        return "Image";
    }
}
