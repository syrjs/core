package syr.js.org.syrnative;

import android.content.Context;
import android.view.View;

import org.json.JSONObject;


/**
 * Created by simalkireddy on 5/5/18.
 */

public interface SyrComponent {
    public View render(JSONObject component, Context context, View instance);
}
