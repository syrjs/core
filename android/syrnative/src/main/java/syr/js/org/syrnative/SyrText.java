package syr.js.org.syrnative;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrText implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {

        TextView textView;
        if (instance != null) {
            textView = (TextView) instance;
        } else {
            textView = new TextView(context);
        }

        String value = "";
        JSONObject style = null;

        try {
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject props = jsonInstance.getJSONObject("props");

            if (jsonInstance.has("style")) {
                style = jsonInstance.getJSONObject("style");

                if (style.has("left")) {
                    textView.setX(style.getInt("left"));
                }

                if (style.has("top")) {
                    textView.setY(style.getInt("top"));
                }

                if (instance == null) {
                    textView.setLayoutParams(SyrStyler.styleLayout(style));
                } else {

                    if (style.has("width")) {

                        textView.getLayoutParams().width = style.getInt("width");

                    }

                    if (style.has("height")) {

                        textView.getLayoutParams().height = style.getInt("height");
                    }
                    textView.setLayoutParams(textView.getLayoutParams());

                }

                if (style.has("color")) {
                    textView.setTextColor(Color.parseColor(style.getString("color")));
                } else {
                    textView.setTextColor(Color.BLACK);
                }

                if (style.has("fontSize")) {
                    textView.setTextSize(TypedValue.COMPLEX_UNIT_PX, style.getInt("fontSize"));
                }

                if (style.has("fontWeight")) {
                    if (style.getString("fontWeight").contains("bold")) {
                        textView.setTypeface(null, Typeface.BOLD);
                    }
                }

                if (style.has("textAlign")) {
                    if (style.getString("textAlign").contains("center")) {
                        textView.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
                        textView.setGravity(Gravity.CENTER_HORIZONTAL);
                    } else if (style.getString("textAlign").contains("right")) {
                        textView.setTextAlignment(View.TEXT_ALIGNMENT_TEXT_END);
                        textView.setGravity(Gravity.END);
                    } else {
                        textView.setTextAlignment(View.TEXT_ALIGNMENT_TEXT_START);
                        textView.setGravity(Gravity.START);
                    }
                }
            }

            if (style.has("maxLines")) {
                textView.setLines(style.getInt("maxLines"));
            } else {
                //truncating the textView, so the it does not break the content
                textView.setEllipsize(TextUtils.TruncateAt.END);
                textView.setSingleLine(true);
            }

            value = jsonInstance.getString("value");
            textView.setText(value);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        //truncating the textView, so the it does not break the content
//        textView.setEllipsize(TextUtils.TruncateAt.END);
//        textView.setSingleLine(true);


        return textView;
    }

    @Override
    public String getName() {
        return "Text";
    }

}
