package syr.js.org.syrnative;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.widget.ImageView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrImage implements SyrBaseModule, SyrComponent {

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
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject jsonProps = jsonInstance.getJSONObject("props");

            if (jsonInstance.has("style")) {
                style = jsonInstance.getJSONObject("style");
                imageView.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(imageView, style);


                if(style.has("left")) {
                    imageView.setX(style.getInt("left"));
                }

                if(style.has("top")) {
                    imageView.setY(style.getInt("top"));
                }

            }

            if (jsonProps.has("source")) {
                // grabs the source url if present
                source = jsonProps.getJSONObject("source");
                String path = source.getString("uri");

                // check if image exists in Resources
                int pathExists = context.getResources().getIdentifier(path, "drawable", context.getPackageName());

                if (pathExists != 0) {
                    // if exist set image
                    imageView.setImageResource(pathExists);
                } else {
                    // throw yellow box that image is not found in res/drawable
                    // revert to a friendly image for now
                    imageView.setBackgroundColor(Color.parseColor("#ff00ff"));
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
