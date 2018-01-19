package com.example.dereanderson.syrnativeandroid;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */


public class SyrBridge {

    public SyrRaster mRaster;
    public HashMap<String, String> bootParams = new HashMap<String,String>();

    static private Handler uiHandler = new Handler(Looper.getMainLooper());
    private Context mContext;
    private WebView mBridgedBrowser;
    private ArrayList<String> queue = new ArrayList<>();
    private Boolean recievingMessage = false;
    private HandlerThread thread = new HandlerThread("SyrWebViewThread");
    private Handler webViewHandler;

    /** Instantiate the interface and set the context */
    SyrBridge(Context c) { mContext = c; }

    public void setRaster(SyrRaster raster) {
        mRaster = raster;
    }

    /** Recieve message from the SyrBridge */
    @JavascriptInterface
    public void message(String message) {
        recievingMessage = true;
        try {
            JSONObject jsonObject = new JSONObject(message);
            String messageType = jsonObject.getString("type");

            if(messageType.equals("gui")) {
                mRaster.parseAST(jsonObject);
            } else if(messageType.equals("animation")) {
                mRaster.setupAnimation(jsonObject);
            }

        } catch (Throwable tx) {
            tx.printStackTrace();
        }
        recievingMessage = false;
    }

    public void loadBundle() {

        thread.start();
        webViewHandler = new Handler(thread.getLooper());

        final SyrBridge self = this;
        webViewHandler.post(new Runnable() {
            @SuppressLint("JavascriptInterface")
            @Override
            public void run() {
                mBridgedBrowser = new WebView(mContext);
                mBridgedBrowser.addJavascriptInterface(self, "SyrBridge");

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

                ArrayList<String> exportedMethods = mRaster.exportedMethods;
                JSONArray exportedMethodArray = new JSONArray(exportedMethods);
                try {
                    String exportedMethodString = URLEncoder.encode(exportedMethodArray.toString(), "UTF-8");
                    String screenDensity = Float.toString(mContext.getResources().getDisplayMetrics().density);
                    String loadURL = String.format("http://10.0.2.2:8080?window_height=%s&window_width=%s&screen_density=%s&platform=android&platform_version=%s",
                            bootParams.get("height"),
                            bootParams.get("width"),
                            screenDensity,
                            android.os.Build.VERSION.SDK_INT);

                    mBridgedBrowser.loadUrl(loadURL);

                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }

            }
        });
    }

    public void sendEvent(HashMap<String, String> event) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            JSONObject message = new JSONObject(event);
            sendImmediate(message);
        }
    }

    public void sendImmediate(JSONObject message) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            String msg = message.toString();
            final String eventJS = String.format("SyrEvents.emit(%s);", msg);
            webViewHandler.post(new Runnable() {
                @SuppressLint("JavascriptInterface")
                @Override
                public void run() {
                    mBridgedBrowser.evaluateJavascript(eventJS, null);
                }
            });
        }
    }
}
