package syr.js.org.syrnative;

import android.content.Context;
import android.view.MotionEvent;
import android.view.View;
import android.widget.RelativeLayout;

import android.os.Vibrator;

import org.json.JSONException;
import org.json.JSONObject;

import static android.content.Context.VIBRATOR_SERVICE;


/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrTouchableOpacity implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {

        RelativeLayout layout;
        final Vibrator myVib = (Vibrator) context.getSystemService(VIBRATOR_SERVICE);
        if (instance != null) {
            layout = (RelativeLayout) instance;

        } else {
            layout = new RelativeLayout(context);
        }
        JSONObject style = null;

        layout.setClipChildren(false);
        try {
            final String uuid = component.getString("uuid");
            style = component.getJSONObject("instance").getJSONObject("style");

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
                layout.setX(style.getInt("left"));
            }

            if (style.has("top")) {
                layout.setY(style.getInt("top"));
            }

            if (style.has("opacity")) {
                layout.setAlpha(style.getInt("opacity"));
            }

            SyrStyler.styleView(layout, style);


            layout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    try {
                        //@TODO: Make predefined vibrations like iOS and connect this to a prop
//                         myVib.vibrate(50);
                        JSONObject eventMap = new JSONObject();
                        eventMap.put("type", "onPress");
                        eventMap.put("guid", uuid);
                        SyrEventHandler.getInstance().sendEvent(eventMap);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });

            final RelativeLayout l = layout;
            layout.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View view, MotionEvent event) {
                    switch (event.getAction()) {
                        case MotionEvent.ACTION_DOWN:
                            l.setAlpha((float) 0.3);
                            break;
                        case MotionEvent.ACTION_UP:
                            l.setAlpha(1);
                            break;
                    }
                    return false;
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return layout;
    }


    @Override
    public String getName() {
        return "TouchableOpacity";
    }
}
