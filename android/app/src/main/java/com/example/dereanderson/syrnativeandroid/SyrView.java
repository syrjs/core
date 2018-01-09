package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.View;
import android.widget.RelativeLayout;

import org.json.JSONObject;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrView implements SyrBaseModule {

    private RelativeLayout mRelativeLayout;
    public Context mContext;

    @Override
    public void render(JSONObject component) {
        RelativeLayout relativeLayout = new RelativeLayout(mContext);

        // need to find positioning
        RelativeLayout.LayoutParams rlp = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.FILL_PARENT,
                RelativeLayout.LayoutParams.FILL_PARENT);

        relativeLayout.setLayoutParams(rlp);
    }

    @Override
    public void addChild(View child) {
        mRelativeLayout.addView(child);
    }

    @Override
    public String getName() {
        return "View";
    }

    @Override
    public void setContext(Context context) {
        mContext = context;
    }
}
