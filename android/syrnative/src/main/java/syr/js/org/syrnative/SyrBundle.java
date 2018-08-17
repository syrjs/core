package syr.js.org.syrnative;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */

public class SyrBundle {
    private SyrBundleManager mManager;

    public SyrBundle(SyrBundleManager manager) {
        mManager = manager;
    }

    public String getBundleUrl() {
        return mManager.uri;
    }
}
