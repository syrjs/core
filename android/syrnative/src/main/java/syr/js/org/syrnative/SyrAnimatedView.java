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

        RelativeLayout layout;
        if(instance != null) {
            layout = (RelativeLayout) instance;
        } else {
            layout = new RelativeLayout(context);
        }

        // word on the street is this should only be used for animations?
        // these are not free
        layout.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        JSONObject style = null;
        try {
            JSONObject componentInstance = component.getJSONObject("instance");
            if(componentInstance.has("style")){
                style = componentInstance.getJSONObject("style");
                layout.setLayoutParams(SyrStyler.styleLayout(style));

                if(style.has("left")) {
                    layout.setX(style.getInt("left"));
                }

                if(style.has("top")) {
                    layout.setY(style.getInt("top"));
                }

                if(style.has("opacity")) {
                    layout.setAlpha(style.getInt("opacity"));
                }

                SyrStyler.styleView(layout, style);

                if(style.has("overflow")) {
                    String overflow = style.getString("overflow");
                    if(overflow.contains("hidden")) {
                        layout.setClipChildren(true);
                    } else {
                        layout.setClipChildren(false);
                    }
                }

            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return layout;
    }
    @Override
    public String getName() {
        return "AnimatedView";
    }
}
