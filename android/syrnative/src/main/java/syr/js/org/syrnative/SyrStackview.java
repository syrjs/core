package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;
import android.widget.LinearLayout;

import org.json.JSONException;
import org.json.JSONObject;


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
            final String guid  = component.getString("guid");

            // set button styles
            if (jsonInstance.has("style")){

                style = jsonInstance.getJSONObject("style");
                linearLayout.setLayoutParams(SyrStyler.styleLayout(style));
                SyrStyler.styleView(linearLayout, style);

                if(style.has("left")) {
                    linearLayout.setX(style.getInt("left"));
                }

                if(style.has("top")) {
                    linearLayout.setY(style.getInt("top"));
                }

                linearLayout.setOrientation(LinearLayout.VERTICAL);

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
