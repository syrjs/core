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
    public View render(JSONObject component, Context context, View instance) {

        ImageView imageView;
        if(instance != null) {
            imageView = (ImageView) instance;
        } else {
            imageView = new ImageView(context);
        }
        String value = "";
        JSONObject style = null;
        JSONObject source = null;
        Integer left = 0;
        Integer top = 0;

        try {
            //JSONObject instance = component.getJSONObject("instance");
            JSONObject attributes = component.getJSONObject("attributes");

            if (attributes.has("style")) {
                style = attributes.getJSONObject("style");
                imageView.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(imageView, style);


                if(style.has("left")) {
                    imageView.setX(style.getInt("left"));
                }

                if(style.has("top")) {
                    imageView.setY(style.getInt("top"));
                }

            }

            if (attributes.has("source")) {
                // grabs the source url if present
                source = attributes.getJSONObject("source");
                String path = source.getString("uri");

                // check if image exists in Resources
                int pathExists = context.getResources().getIdentifier(path, "drawable", context.getPackageName());

                if (pathExists != 0) {
                    // if exist set image
                    imageView.setImageResource(pathExists);
                } else {
                    // throw yellow box that image is not found in res/drawable
                    // revert to a friendly image for now
                    imageView.setImageResource(R.drawable.ic_muppets_misspiggy);
                }

                imageView.setScaleType(ImageView.ScaleType.FIT_XY);

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
