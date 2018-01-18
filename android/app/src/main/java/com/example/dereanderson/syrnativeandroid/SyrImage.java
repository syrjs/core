package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
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
            return imageView;
        } else {
            imageView = new ImageView(context);
        }
        String value = "";
        JSONObject style = null;
        Integer left = 0;
        Integer top = 0;
        try {
            //JSONObject instance = component.getJSONObject("instance");
            JSONObject attributes = component.getJSONObject("attributes");

            if(attributes.has("style")) {
                style = attributes.getJSONObject("style");
                imageView.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(imageView, style);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        if(style != null) {

        }
        imageView.setScaleType(ImageView.ScaleType.FIT_XY);
        imageView.setImageResource(R.drawable.ic_muppets_misspiggy);
        return imageView;
    }

    @Override
    public String getName() {
        return "Image";
    }
}
