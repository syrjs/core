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
 * Created by dereanderson on 1/16/18.
 */

public class SyrAnimatedText extends SyrText {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        View animatedText = super.render(component, context, instance);
        animatedText.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        return animatedText;
    }

    @Override
    public String getName() {
        return "AnimatedText";
    }
}
