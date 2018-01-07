package com.example.dereanderson.syrnativeandroid;

/**
 * Created by dereanderson on 1/8/18.
 */

public class SyrInstance {
    SyrBridge mBridge;
    SyrRaster mRaster;

    public SyrInstance(SyrInstanceManager manager) {
        // start syr root activity
    }

    public SyrInstance setBridge(SyrBridge bridge) {
        mBridge = bridge;
        return this;
    }

    public SyrInstance setRaster(SyrRaster raster) {
        mRaster = raster;
        mBridge.setRaster(mRaster);
        return this;
    }

    public void loadBundle() {
        mBridge.loadBundle();
    }


}