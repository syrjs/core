package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.MotionEvent;
import android.view.View;
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
    private SyrInstance mInstance;
    private Boolean mLoaded = false;
    private int mHeight;
    private int mWidth;

    public SyrRootView(Context context) {
        super(context);

        // stop touches from falling (bubbling) through rootview
        this.setOnTouchListener(new OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                return true;
            }
        });

        // use application context so we don't get memory leaks
        // when activities are bound to context, we'll leak
        mContext = context;
    }

    public SyrRootView startSyrApplication(SyrInstance instance, SyrBundle bundle) {
        mBridge = new SyrBridge(mContext);
        mRaster = new SyrRaster(mContext);
        mRaster.setRootview(this);
        mInstance = instance;
        return this;
    }

    public void destroy() {
        mContext = null;
        mBridge = null;
        mRaster = null;
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);
        mWidth = this.getWidth();
        mHeight = this.getHeight();

        if(mHeight > 0 && mWidth > 0 && !mLoaded) {
            mLoaded = true;
            mBridge.bootParams.put("height", Integer.toString(mHeight));
            mBridge.bootParams.put("width", Integer.toString(mWidth));
            mInstance.setBridge(mBridge).setRaster(mRaster).loadBundle();
        }
    }
}
