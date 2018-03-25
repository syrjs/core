package syr.js.org.syrnative;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrStackview implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        LinearLayout linearLayout;

        if(instance !=null) {
            linearLayout = (LinearLayout) instance;
        } else {
            linearLayout = new LinearLayout(context);
        }

        JSONObject style = null;

        try {
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject jsonAttributes =  jsonInstance.getJSONObject("attributes");
            final String guid  = component.getString("guid");

            // set button styles
            if (component.has("attributes") && component.getJSONObject("attributes").has("style")){

                style = component.getJSONObject("attributes").getJSONObject("style");
                linearLayout.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(linearLayout, style);

                if(style.has("left")) {
                    linearLayout.setX(style.getInt("left"));
                }

                if(style.has("top")) {
                    linearLayout.setY(style.getInt("top"));
                }

            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return linearLayout;
    }

    @Override
    public String getName() {
        return "StackView";
    }
}
