package com.example.dereanderson.syrnativeandroid;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import syr.js.org.syrnative.SyrAlertDialogue;
import syr.js.org.syrnative.SyrAnimatedImage;
import syr.js.org.syrnative.SyrAnimatedText;
import syr.js.org.syrnative.SyrAnimatedView;
import syr.js.org.syrnative.SyrBaseModule;
import syr.js.org.syrnative.SyrBundle;
import syr.js.org.syrnative.SyrBundleManager;
import syr.js.org.syrnative.SyrButton;
import syr.js.org.syrnative.SyrImage;
import syr.js.org.syrnative.SyrInstance;
import syr.js.org.syrnative.SyrInstanceManager;
import syr.js.org.syrnative.SyrLinearGradient;
import syr.js.org.syrnative.SyrNetworking;
import syr.js.org.syrnative.SyrRootView;
import syr.js.org.syrnative.SyrScrollview;
import syr.js.org.syrnative.SyrStackview;
import syr.js.org.syrnative.SyrText;
import syr.js.org.syrnative.SyrTouchableOpacity;
import syr.js.org.syrnative.SyrView;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        RelativeLayout layout = new RelativeLayout(this);
        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        layout.setLayoutParams(layoutParams);

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
        modules.add(new SyrStackview());
        modules.add(new SyrAnimatedImage());
        modules.add(new SyrAnimatedView());
        modules.add(new SyrAnimatedText());
        modules.add(new SyrNetworking());
        modules.add(new SyrAlertDialogue());

        // get the javascript bundle
        SyrBundle bundle = new SyrBundleManager(this).setBundleAssetName("http://10.0.2.2:8080").build();

        // create an instance of Syr
        SyrInstance instance = new SyrInstanceManager().setJSBundleFile(bundle).build();

        // expose the desired native modules to the instance
        instance.setNativeModules(modules);

        // create a new Rootview
        SyrRootView rootview = new SyrRootView(this);

        JSONObject appProps = new JSONObject();

        // start the Syr Application
        rootview.startSyrApplication(instance, bundle, appProps);

        rootview.setLayoutParams(layoutParams);
        layout.addView(rootview);

        // set the content of the to the Rootview
        setContentView(layout);
    }
}
