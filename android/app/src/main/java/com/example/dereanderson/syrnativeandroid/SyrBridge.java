package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;

import org.json.JSONObject;

/**
 * Created by dereanderson on 11/27/17.
 */

public class SyrBridge {
    Context mContext;

    /** Instantiate the interface and set the context */
    SyrBridge(Context c) {
        mContext = c;
    }

    /** Recieve message from the SyrBridge */
    @JavascriptInterface
    public void message(String message) {
        try {
            JSONObject obj = new JSONObject(message);
        } catch (Throwable tx) {
            Log.e("SyrBridge", "Could not parse malformed JSON: \"" + message + "\"");
        }
    }
}
