package syr.js.org.syrnative;


/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrInstanceManager {
    private SyrBundle mBundle;

    public SyrInstanceManager() {
        // does this need the (additional) config param?
        // if not do we need this constructor?
    }

    public SyrInstanceManager setJSBundleFile(SyrBundle bundle) {
        mBundle = bundle;
        return this;
    }

    public SyrInstance build() {
        return new SyrInstance(this);
    }
}