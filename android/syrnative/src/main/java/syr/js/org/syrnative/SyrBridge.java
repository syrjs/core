package syr.js.org.syrnative;

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
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */


public class SyrBridge {

    public SyrRaster mRaster;
    public HashMap<String, String> bootParams = new HashMap<String, String>();

    static private Handler uiHandler = new Handler(Looper.getMainLooper());
    private Context mContext;
    private WebView mBridgedBrowser;

    private HandlerThread thread = new HandlerThread("SyrWebViewThread");
    private Handler webViewHandler;

    /**
     * Instantiate the interface and set the context
     */
    SyrBridge(Context c) {
        mContext = c;
    }

    public void setRaster(SyrRaster raster) {
        mRaster = raster;
    }

    public SyrBridge getBridge() {
        return this;
    }

    /**
     * Recieve message from the SyrBridge
     */
    @JavascriptInterface
    public void message(String message) {
        try {
            JSONObject jsonObject = new JSONObject(message);
            String messageType = jsonObject.getString("type");

            if (messageType.equals("gui")) {
                mRaster.parseAST(jsonObject);
            } else if (messageType.equals("animation")) {
                mRaster.setupAnimation(jsonObject);
            } else if (messageType.equals("cmd")) {
                String commandString = jsonObject.getString("ast");
                runCMD(commandString);
            }

        } catch (Throwable tx) {
            tx.printStackTrace();
        }
    }

    public void loadBundle() {
        thread.start();
        webViewHandler = new Handler(thread.getLooper());

        final SyrBridge self = this;
        uiHandler.post(new Runnable() {
            @SuppressLint("JavascriptInterface")
            @Override
            public void run() {
                mBridgedBrowser = new WebView(mContext);
                mBridgedBrowser.addJavascriptInterface(self, "SyrBridge");

                // if the url is changes from it's initial loadURL then cancel
                // android 19 loadUrl("javascript:;");
                mBridgedBrowser.setWebViewClient(new WebViewClient() {
                    public boolean shouldOverrideUrlLoading(WebView view, String url) {
//                        Log.i("bridgebrowser", "navigating");
                        mRaster.clearRootView();
                        return false;
                    }
                });

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                    WebView.setWebContentsDebuggingEnabled(true);
                }

                WebSettings webSettings = mBridgedBrowser.getSettings();
                webSettings.setJavaScriptEnabled(true);

                JSONArray jsArray = new JSONArray(mRaster.exportedMethods);
                String exportedMethods = jsArray.toString();
                String exportedMethodString = null;

                try {
                    exportedMethodString = URLEncoder.encode(exportedMethods, "UTF-8");
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }

                ///random comment

                String screenDensity = Float.toString(mContext.getResources().getDisplayMetrics().density);
                String loadURL = String.format("http://10.0.2.2:8080?window_height=%s&window_width=%s&screen_density=%s&platform=android&platform_version=%s&exported_methods=%s&initial_props=%s",
                        bootParams.get("height"),
                        bootParams.get("width"),
                        screenDensity,
                        Build.VERSION.SDK_INT,
                        exportedMethodString,
                        bootParams.get("initial_props"));

                mBridgedBrowser.loadUrl(loadURL);

            }
        });
    }

    public void runCMD(String commandString) throws JSONException, ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        JSONObject commandObj = new JSONObject(commandString);
        String clazz = commandObj.getString("clazz");

        // ensure that the calls are only going to a registered module
        // and not an exposed system method
        if (mRaster.registeredModules.containsKey(clazz)) {

            HashMap<String, Class> primativeClasses = new HashMap<>();
            primativeClasses.put("boolean", boolean.class);
            primativeClasses.put("byte", byte.class);
            primativeClasses.put("char", char.class);
            primativeClasses.put("double", double.class);
            primativeClasses.put("float", float.class);
            primativeClasses.put("int", int.class);
            primativeClasses.put("long", long.class);
            primativeClasses.put("short", short.class);

            String methodName = commandObj.getString("method");
            String argString = commandObj.getString("args");
            JSONObject argsObj = new JSONObject(argString);
            ArrayList<Object> argsList = new ArrayList<>();

            for (Iterator<String> iter = argsObj.keys(); iter.hasNext(); ) {
                String key = iter.next();
                argsList.add(argsObj.get(key));
            }


            JSONArray paramsTypes = commandObj.getJSONArray("paramTypes");


            Class<?> c = Class.forName(clazz);
            Object obj = c.newInstance();

            ArrayList<Class> paramsList = new ArrayList<>();
            for (int i = 0; i < paramsTypes.length(); i++) {
                String paramType = paramsTypes.getString(i);
                if (primativeClasses.containsKey(paramType)) {
                    paramsList.add(primativeClasses.get(paramType));
                } else {
                    paramsList.add(Class.forName(paramType));
                }
            }

//             Log.i("Class name", c.toString());
            //@TODO: Make passing of context generic
            if (c.toString().contains("SyrAlertDialogue")) {
//                paramsList.add(Context.class);
                argsList.add(mContext);
            }


            Class params[] = paramsList.toArray(new Class[paramsList.size()]);
            Object args[] = argsList.toArray(new Object[argsList.size()]);

            // FooMethod
            // Class params[] = {String.class, int.class}
            //
            Method m = c.getMethod(methodName, params);
            Object res = m.invoke(obj, args);
        } else {
            Log.w("syrcmdexec", "Unacceptable Class Accessed: " + clazz);
        }

    }

    public void sendEvent(JSONObject message) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            sendImmediate(message);
        }
    }

    public void sendImmediate(JSONObject message) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            String msg = message.toString();
            final String eventJS = String.format("SyrEvents.emit(%s);", msg);
            uiHandler.post(new Runnable() {
                @SuppressLint("JavascriptInterface")
                @Override
                public void run() {
                    mBridgedBrowser.evaluateJavascript(eventJS, null);
                }
            });
        }
    }
}
