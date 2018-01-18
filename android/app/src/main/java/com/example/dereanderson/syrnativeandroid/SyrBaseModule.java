package com.example.dereanderson.syrnativeandroid;

import android.content.Context;
import android.view.View;

import org.json.JSONObject;

/**
 * Created by dereanderson on 1/9/18.
 */

public interface SyrBaseModule {
    String getName();
    View render(JSONObject component, Context context, View instance);
}