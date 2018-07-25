package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigDecimal;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrView implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {

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
                } else {

                    if (style.has("width")) {

                        layout.getLayoutParams().width = style.getInt("width");

                    }

                    if (style.has("height")) {

                        layout.getLayoutParams().height = style.getInt("height");
                    }
                    layout.setLayoutParams(layout.getLayoutParams());

                }
                if (style.has("left")) {
                    layout.setX(BigDecimal.valueOf(style.getDouble("left")).floatValue());
                }

                if (style.has("top")) {
                    layout.setY(BigDecimal.valueOf(style.getDouble("top")).floatValue());
                }

                if (style.has("opacity")) {
                    layout.setAlpha(BigDecimal.valueOf(style.getDouble("opacity")).floatValue());
                }

                SyrStyler.styleView(layout, style);


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
        return layout;
    }

    @Override
    public String getName() {
        return "View";
    }

}
