package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.os.Build;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;

import org.json.JSONObject;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */


public class SyrBridge {
    private Context mContext;
    private SyrRaster mRaster;

    /** Instantiate the interface and set the context */
    SyrBridge(Context c) {
        mContext = c;
    }
    public void setRaster(SyrRaster raster) {
        mRaster = raster;
    }

    /** Recieve message from the SyrBridge */
    @JavascriptInterface
    public void message(String message) {
        try {
            JSONObject jsonObject = new JSONObject(message);
            String messageType = jsonObject.getString("type");

            if(messageType.equals("gui")) {
                mRaster.parseAST(jsonObject);
            }

        } catch (Throwable tx) {
            Log.e("SyrBridge", "Could not parse malformed JSON: \"" + message + "\"");
        }
    }

    public void loadBundle() {
        WebView wv = new WebView(mContext);
        wv.addJavascriptInterface(this, "SyrBridge");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        WebSettings webSettings = wv.getSettings();
        webSettings.setJavaScriptEnabled(true);

        wv.loadUrl("http://10.0.2.2:8080");
    }
}
