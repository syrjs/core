package syr.js.org.syrnative;

import org.json.JSONObject;

/**
 * Created by simalkireddy on 5/31/18.
 */

public class Component {

    private String uuid;
    private Component[] children;
    private String guid;
    private String elementName;
    private JSONObject attributes;
    private JSONObject instance;
    private String fenceid;
    private String key;

    public String getUuid() {
        return uuid;
    }

    public String getGuid() {
        return guid;
    }

    public String getElementName() {
        return elementName;
    }

    public String getFenceid() {
        return fenceid;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Component[] getChildren() {
        return children;
    }

    public JSONObject getAttributes() {
        return attributes;
    }

    public JSONObject getInstance() {
        return instance;
    }

}
