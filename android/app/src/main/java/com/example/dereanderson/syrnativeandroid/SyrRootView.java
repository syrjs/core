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

    public SyrRootView(Context context) {
        super(context);

        // use application context so we don't get memory leaks
        // when activities are bound to context, we'll leak
        mContext = context.getApplicationContext();
    }

    public SyrRootView startSyrApplication(SyrInstance instance, SyrBundle bundle) {
        SyrBridge bridge = new SyrBridge(mContext);
        SyrRaster raster = new SyrRaster(mContext);
        raster.setRootview(this);
        instance.setBridge(bridge).setRaster(raster).loadBundle();
        return this;
    }

}
