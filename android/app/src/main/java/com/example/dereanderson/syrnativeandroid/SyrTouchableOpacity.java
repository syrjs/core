package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrTouchableOpacity implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        RelativeLayout layout = new RelativeLayout(context);
        JSONObject style = null;

        try {
            final String guid  = component.getString("guid");
            style = component.getJSONObject("attributes").getJSONObject("style");

            layout.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) {
                    HashMap<String, String> eventMap = new HashMap<String, String>();
                    eventMap.put("type", "onPress");
                    eventMap.put("guid", guid);
                    SyrEventHandler.getInstance().sendEvent(eventMap);
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
