package syr.js.org.syrnative;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrButton implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        Button button;

        if (instance != null) {
            button = (Button) instance;
        } else {
            button = new Button(context);
        }

        button.setAllCaps(false);
        JSONObject style = null;

        try {
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject jsonProps = jsonInstance.getJSONObject("props");
            final String uuid = component.getString("uuid");

            // if enabled prop is passed set it, else default to true
            Boolean isEnabled;
            if (jsonProps.has("enabled")) {
                isEnabled = jsonProps.getBoolean("enabled");
            } else {
                isEnabled = true;
            }

            button.setEnabled(isEnabled);

            // create button
            if (instance == null) {
                button.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
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
            }

            // set button styles
            if (jsonInstance.has("style")) {

                style = jsonInstance.getJSONObject("style");
                if (instance == null) {
                    button.setLayoutParams(SyrStyler.styleLayout(style));

                } else {
                    if (style.has("width")) {

                        button.getLayoutParams().width = style.getInt("width");

                    }

                    if (style.has("height")) {

                        button.getLayoutParams().height = style.getInt("height");
                    }
                    button.setLayoutParams(button.getLayoutParams());
                }
                SyrStyler.styleView(button, style);

                if (style.has("color")) {
                    button.setTextColor(Color.parseColor(style.getString("color")));
                }

                if (style.has("fontWeight")) {
                    if (style.getString("fontWeight").contains("bold")) {
                        button.setTypeface(null, Typeface.BOLD);
                    }
                }

                if (style.has("left")) {
                    button.setX(style.getInt("left"));
                }

                if (style.has("top")) {
                    button.setY(style.getInt("top"));
                }
            }

            // set button label/text
            if(jsonInstance.has("value")) {
                button.setText(jsonInstance.getString("value"));
            } else {
                button.setText("");

            }

            //touchableOPacity effect for button since we are setting the state list animator to null. Need to couple this with the optional
            //for using the default android button behaviour
            final Button b = button;
            button.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View view, MotionEvent event) {
                    switch (event.getAction()) {
                        case MotionEvent.ACTION_DOWN:
                            b.setAlpha((float) 0.3);
                            break;
                        case MotionEvent.ACTION_UP:
                            b.setAlpha(1);
                            break;
                        case MotionEvent.ACTION_CANCEL:
                            b.setAlpha(1);
                            break;
                    }
                    return false;
                }
            });

        } catch (JSONException e) {
            e.printStackTrace();
        }

        //TODO: Depending on a prop we need add the drop shadow/default android button behaviour

        // no default drop shadow
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try {
                button.setStateListAnimator(null);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return button;
    }

    @Override
    public String getName() {
        return "Button";
    }
}
