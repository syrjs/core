package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;
import android.widget.HorizontalScrollView;
import android.widget.LinearLayout;
import android.widget.ScrollView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrScrollview implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {

        ScrollView scrollview = new ScrollView(context);
        JSONObject style = null;

        try {
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject props = jsonInstance.getJSONObject("props");

            // set linearLayout styles
            if (jsonInstance.has("style")) {
                style = jsonInstance.getJSONObject("style");
                if (instance == null || scrollview.getLayoutParams() == null) {
                    scrollview.setLayoutParams(SyrStyler.styleLayout(style));
                } else {
                    if (style.has("width")) {
                        if (scrollview.getLayoutParams() != null) {
                            scrollview.getLayoutParams().width = style.getInt("width");
                        }

                    }

                    if (style.has("height")) {
                        if (scrollview.getLayoutParams() != null) {
                            scrollview.getLayoutParams().height = style.getInt("height");
                        }
                    }
                    scrollview.setLayoutParams(scrollview.getLayoutParams());
                }

                SyrStyler.styleView(scrollview, style);

                if (style.has("left")) {
                    scrollview.setX(style.getInt("left"));
                }

                if (style.has("top")) {
                    scrollview.setY(style.getInt("top"));
                }

            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return scrollview;
    }

    @Override
    public String getName() {
        return "ScrollView";
    }
}
