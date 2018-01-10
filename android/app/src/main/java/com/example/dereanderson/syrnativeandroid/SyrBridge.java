package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.os.Build;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.WeakHashMap;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */


public class SyrBridge {
    private Context mContext;
    private SyrRaster mRaster;
    private WebView mBridgedBrowser;

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
        mBridgedBrowser = new WebView(mContext);
        mBridgedBrowser.addJavascriptInterface(this, "SyrBridge");

        // if the url is changes from it's initial loadURL then cancel
        mBridgedBrowser.setWebViewClient(new WebViewClient(){
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                Log.i("bridgebrowser", "navigating");
                mRaster.clearRootView();
                return false;
            }
        });

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        WebSettings webSettings = mBridgedBrowser.getSettings();
        webSettings.setJavaScriptEnabled(true);

        mBridgedBrowser.loadUrl("http://10.0.2.2:8080");
    }

    public void sendEvent(HashMap<String, String> event) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            JSONObject message = new JSONObject(event);
            String msg = message.toString();
            String eventJS = String.format("SyrEvents.emit(%s);", msg);
            mBridgedBrowser.evaluateJavascript(eventJS, null);
        }
    }
}
