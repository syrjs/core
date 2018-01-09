package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.widget.FrameLayout;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */

public class SyrRootView extends FrameLayout {

    private Context mContext;
    private SyrBridge mBridge;
    private SyrRaster mRaster;

    public SyrRootView(Context context) {
        super(context);

        // use application context so we don't get memory leaks
        // when activities are bound to context, we'll leak
        mContext = context;
    }

    public SyrRootView startSyrApplication(SyrInstance instance, SyrBundle bundle) {
        mBridge = new SyrBridge(mContext);
        mRaster = new SyrRaster(mContext);
        mRaster.setRootview(this);
        instance.setBridge(mBridge).setRaster(mRaster).loadBundle();
        return this;
    }

    public void destroy() {
        mContext = null;
        mBridge = null;
        mRaster = null;
    }

}
