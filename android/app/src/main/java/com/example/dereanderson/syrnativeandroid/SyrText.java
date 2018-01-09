package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONObject;

/**
 * Created by dereanderson on 1/9/18.
 */

public class SyrText implements SyrBaseModule {

    private RelativeLayout mRelativeLayout;
    public Context mContext;

    @Override
    public void render(JSONObject component) {
        // add text view
        TextView tv = new TextView(mContext);
        tv.setText("Dynamic Text!");
    }

    @Override
    public void addChild(View child) {}

    @Override
    public String getName() {
        return "Text";
    }

    @Override
    public void setContext(Context context) {
        mContext = context;
    }
}
