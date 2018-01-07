package com.example.dereanderson.syrnativeandroid;

import com.example.dereanderson.syrnativeandroid.SyrBridge;

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
        setContentView(R.layout.activity_main);

        RelativeLayout layout = (RelativeLayout)findViewById(R.id.SyrRootView);

        WebView wv = new WebView(this);
        wv.addJavascriptInterface(new SyrBridge(this), "SyrBridge");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        WebSettings webSettings = wv.getSettings();
        webSettings.setJavaScriptEnabled(true);

        wv.loadUrl("http://10.0.2.2:8080");

        // add text view
        TextView tv = new TextView(this);
        tv.setText("Dynamic Text!");
        layout.addView(tv);

        //testing creating button
        Button bt = new Button(this);
        bt.setText("A Button");
        bt.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.FILL_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));

        layout.addView(bt);

    }
}


