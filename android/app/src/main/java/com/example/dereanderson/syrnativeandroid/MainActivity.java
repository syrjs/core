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

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // hide action bar aka title bar
        try
        {
            this.getSupportActionBar().hide();
        }
        catch (NullPointerException e){}

        // register NativeModules
        List<SyrBaseModule> modules = new ArrayList<>();

        // register NativeModules
        modules.add(new SyrView());
        modules.add(new SyrText());
        modules.add(new SyrButton());
        modules.add(new SyrImage());
        modules.add(new SyrTouchableOpacity());
        modules.add(new SyrLinearGradient());
        modules.add(new SyrScrollview());
        modules.add(new SyrAnimatedImage());
        modules.add(new SyrAnimatedView());
        modules.add(new SyrAnimatedText());

        // get the javascript bundle
        SyrBundle bundle = new SyrBundleManager().setBundleAssetName("").build();

        // create an instance of Syr
        SyrInstance instance = new SyrInstanceManager().setJSBundleFile(bundle).build();

        // expose the desired native modules to the instance
        instance.setNativeModules(modules);

        // create a new Rootview
        SyrRootView rootview = new SyrRootView(this);

        // start the Syr Application
        rootview.startSyrApplication(instance, bundle);


        // set the content of the to the Rootview
        setContentView(rootview);
    }
}