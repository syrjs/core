package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;
import android.widget.LinearLayout;

import org.json.JSONException;
import org.json.JSONObject;


/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrStackview implements SyrBaseModule, SyrComponent {

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
            JSONObject props = jsonInstance.getJSONObject("props");

            // set linearLayout styles
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

                SyrStyler.styleView(linearLayout, style);

            }

            if(props.has("axis") && props.getString("axis").contains("vertical")) {
                linearLayout.setOrientation(LinearLayout.VERTICAL);
            } else {
                linearLayout.setOrientation(LinearLayout.HORIZONTAL);
            }
            if(jsonInstance.has("children")) {
                linearLayout.setWeightSum(jsonInstance.getJSONArray("children").length());
            }

            //@TODO recalculate the height based on the child elements. THen also pass the new height to the scrollView

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
