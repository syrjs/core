package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;
import android.widget.ScrollView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrScrollview implements SyrBaseModule, SyrComponent {

    public View render(JSONObject component, Context context, View instance) {
        ScrollView scrollview = new ScrollView(context);
        JSONObject style = null;

        try {
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject props = jsonInstance.getJSONObject("props");

            // set linearLayout styles
            if (jsonInstance.has("style")){
                style = jsonInstance.getJSONObject("style");
                scrollview.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(scrollview, style);

                if(style.has("left")) {
                    scrollview.setX(style.getInt("left"));
                }

                if(style.has("top")) {
                    scrollview.setY(style.getInt("top"));
                }

            }
            scrollview.setLayoutParams(SyrStyler.styleLayout(style));
            SyrStyler.styleView(scrollview, style);
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
