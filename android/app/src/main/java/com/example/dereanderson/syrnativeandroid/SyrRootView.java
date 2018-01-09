package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.widget.FrameLayout;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */

public class SyrRootView extends FrameLayout {

    public SyrRootView(Context context) {
        super(context);
    }

    public SyrRootView startSyrApplication(SyrInstance instance, SyrBundle bundle) {
        SyrBridge bridge = new SyrBridge(getContext());
        SyrRaster raster = new SyrRaster(getContext());
        raster.setRootview(this);
        instance.setBridge(bridge).setRaster(raster).loadBundle();
        return this;
    }

}
