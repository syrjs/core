package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;

import org.json.JSONObject;

/**
 * Created by dereanderson on 1/16/18.
 */

public class SyrAnimatedView extends SyrView {

    @Override
    public View render(JSONObject component, Context context, View instance) {

        View animatedView = super.render(component, context, instance);
        return animatedView;

    }

    @Override
    public String getName() {
        return "AnimatedView";
    }
}
