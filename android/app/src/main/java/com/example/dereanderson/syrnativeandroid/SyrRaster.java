package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.widget.RelativeLayout;
import android.widget.TextView;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */

public class SyrRaster {

    private Context mContext;
    private SyrRootView mRootview;
    private Handler uiHandler;

    /** Instantiate the interface and set the context */
    SyrRaster(Context c) {
        mContext = c;
    }

    public void setRootview(SyrRootView rootview) {
        mRootview = rootview;
        uiHandler = new Handler(Looper.getMainLooper());

    }

    public void parseAST() {
        uiHandler.post(new Runnable() {
            @Override
            public void run() {
                addText();
            }
        });
    }

    public void addText() {
        TextView tv = new TextView(mContext);
        tv.setText("Test");

        // Defining the layout parameters of the TextView
        RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.WRAP_CONTENT,
                RelativeLayout.LayoutParams.WRAP_CONTENT);
        lp.addRule(RelativeLayout.CENTER_IN_PARENT);

        // Setting the parameters on the TextView
        tv.setLayoutParams(lp);
        mRootview.addView(tv);
    }
}
