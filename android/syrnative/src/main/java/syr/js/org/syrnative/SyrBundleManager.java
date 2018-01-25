package syr.js.org.syrnative;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */

public class SyrBundleManager {
    private String uri;

    public SyrBundleManager() {
        // does this need the (additional) config param?
        // if not do we need this constructor?
    }

    public SyrBundleManager setBundleAssetName(String uri) {
        this.uri = uri;
        return this;
    }

    public SyrBundle build() {
        return new SyrBundle(this);
    }
}
