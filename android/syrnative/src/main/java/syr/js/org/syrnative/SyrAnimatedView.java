package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/16/18.
 */

public class SyrAnimatedView extends SyrView {

    @Override
    public View render(JSONObject component, Context context, View instance) {

//        View animatedView = super.render(component, context, instance);
//        return animatedView;

        RelativeLayout layout;
        if (instance != null) {
            layout = (RelativeLayout) instance;
        } else {
            layout = new RelativeLayout(context);
        }

        JSONObject style = null;
        try {
            JSONObject componentInstance = component.getJSONObject("instance");
            if (componentInstance.has("style")) {
                style = componentInstance.getJSONObject("style");
                if (instance == null) {
                    layout.setLayoutParams(SyrStyler.styleLayout(style));
                    if (style.has("left")) {
                        layout.setX(style.getInt("left"));
                    }

                    if (style.has("top")) {
                        layout.setY(style.getInt("top"));
                    }

                    if (style.has("opacity")) {
                        layout.setAlpha(style.getInt("opacity"));
                    }
                    SyrStyler.styleView(layout, style);

                } else {

                    if (style.has("width")) {

                        layout.getLayoutParams().width = style.getInt("width");

                    }

                    if (style.has("height")) {

                        layout.getLayoutParams().height = style.getInt("height");
                    }
                    layout.setLayoutParams(layout.getLayoutParams());

                }


                if (style.has("overflow")) {
                    String overflow = style.getString("overflow");
                    if (overflow.contains("hidden")) {
                        layout.setClipChildren(true);
                    } else {
                        layout.setClipChildren(false);
                    }
                }

            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        layout.setLayerType(View.LAYER_TYPE_HARDWARE, null);


        return layout;

    }

    @Override
    public String getName() {
        return "AnimatedView";
    }
}
