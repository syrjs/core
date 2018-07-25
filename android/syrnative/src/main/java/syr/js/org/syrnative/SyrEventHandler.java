package syr.js.org.syrnative;

import org.json.JSONObject;


/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrEventHandler {

    public SyrBridge mBridge;

    private static SyrEventHandler sSyrEventHandler;

    private SyrEventHandler() {
    }  //private constructor.

    public static SyrEventHandler getInstance() {
        if (sSyrEventHandler == null) { //if there is no instance available... create new one
            sSyrEventHandler = new SyrEventHandler();
        }
        return sSyrEventHandler;
    }

    public void sendEvent(final JSONObject event) {

        mBridge.sendEvent(event);

    }
}