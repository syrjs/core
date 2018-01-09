package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.widget.RelativeLayout;

import org.json.JSONObject;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrView {

    static public Object render(Context context, JSONObject component) {
        RelativeLayout relativeLayout = new RelativeLayout(context);

        // need to find positioning
        RelativeLayout.LayoutParams rlp = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.FILL_PARENT,
                RelativeLayout.LayoutParams.FILL_PARENT);

        relativeLayout.setLayoutParams(rlp);

        return relativeLayout;
    }

    static public void addChild(Object instance, Object child) {

    }
}
