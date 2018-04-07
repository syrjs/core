package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;
import android.widget.ScrollView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrScrollview implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        ScrollView scrollview = new ScrollView(context);
        JSONObject style = null;

        try {
//            style = component.getJSONObject("props").getJSONObject("style");
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject props = jsonInstance.getJSONObject("props");

            // set linearLayout styles
            if (jsonInstance.has("style")){
                style = jsonInstance.getJSONObject("style");
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
