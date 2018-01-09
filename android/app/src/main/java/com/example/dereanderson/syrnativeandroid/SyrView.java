package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONObject;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrView implements SyrBaseModule {

    @Override
    public View render(JSONObject component, Context context) {
        return new RelativeLayout(context);
    }

    @Override
    public String getName() {
        return "View";
    }
}
