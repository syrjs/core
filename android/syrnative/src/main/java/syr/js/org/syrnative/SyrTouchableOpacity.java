package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrTouchableOpacity implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {

        RelativeLayout layout;
        if(instance != null) {
            layout = (RelativeLayout) instance;
        } else {
            layout = new RelativeLayout(context);
        }
        JSONObject style = null;

        layout.setClipChildren(false);
        try {
            final String uuid  = component.getString("uuid");
            style = component.getJSONObject("instance").getJSONObject("style");


            if(style.has("left")) {
                layout.setX(style.getInt("left"));
            }

            if(style.has("top")) {
                layout.setY(style.getInt("top"));
            }


            layout.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) {
                    try {
                        JSONObject eventMap = new JSONObject();
                        eventMap.put("type", "onPress");
                        eventMap.put("guid", uuid);
                        SyrEventHandler.getInstance().sendEvent(eventMap);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }

        layout.setLayoutParams(SyrStyler.styleLayout(style));
        SyrStyler.styleView(layout, style);

        return layout;
    }

    @Override
    public String getName() {
        return "TouchableOpacity";
    }
}
