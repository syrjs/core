package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;

import org.json.JSONObject;

/**
 * Created by dereanderson on 1/16/18.
 */

public class SyrAnimatedText extends SyrText {

    @Override
    public View render(JSONObject component, Context context, View instance) {
        View animatedText = super.render(component, context, instance);
        return animatedText;
    }

    @Override
    public String getName() {
        return "AnimatedText";
    }
}
