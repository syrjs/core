package syr.js.org.syrnative;

import android.content.Context;
import android.view.MotionEvent;
import android.view.View;
import android.widget.FrameLayout;

import org.json.JSONObject;

import java.util.Map;

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
    private JSONObject mProps = null;

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

    public SyrRootView startSyrApplication(SyrInstance instance, SyrBundle bundle, JSONObject appProps) {
        mBridge = new SyrBridge(mContext);
        mRaster = new SyrRaster(mContext);
        mProps = appProps;
        mRaster.setRootview(this);
        mInstance = instance;
        return this;
    }

    public JSONObject getAppProperties() {
        return mProps;
    }

    public void destroy() {
        mContext = null;
        mBridge = null;
        mRaster = null;
        mProps = null;
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        super.onLayout(changed, l, t, r, b);
        mWidth = this.getWidth();
        mHeight = this.getHeight();

        if (mHeight > 0 && mWidth > 0 && !mLoaded) {
            mLoaded = true;
            mBridge.bootParams.put("height", Integer.toString(mHeight));
            mBridge.bootParams.put("width", Integer.toString(mWidth));
            mBridge.bootParams.put("initial_props", mProps.toString());
            mInstance.setBridge(mBridge).setRaster(mRaster).loadBundle();
        }
    }
}
