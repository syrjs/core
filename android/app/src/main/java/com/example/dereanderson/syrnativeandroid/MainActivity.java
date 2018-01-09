package com.example.dereanderson.syrnativeandroid;

import com.example.dereanderson.syrnativeandroid.SyrBridge;

import android.content.Intent;
import android.os.Build;
import android.support.constraint.ConstraintLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        SyrBundle bundle = new SyrBundleManager().setBundleAssetName("").build();
        SyrInstance instance = new SyrInstanceManager().setJSBundleFile(bundle).build();
        SyrRootView rootview = new SyrRootView(this);
        rootview.startSyrApplication(instance, bundle);
        setContentView(rootview);
    }
}