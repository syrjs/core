package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;

import org.json.JSONObject;

/**
 * Created by dereanderson on 1/16/18.
 */

public class SyrAnimatedImage extends SyrImage {
    @Override
    public View render(JSONObject component, Context context, View instance) {

        View animatedImage = super.render(component, context, instance);
        animatedImage.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        return animatedImage;

    }

    @Override
    public String getName() {
        return "AnimatedImage";
    }
}
