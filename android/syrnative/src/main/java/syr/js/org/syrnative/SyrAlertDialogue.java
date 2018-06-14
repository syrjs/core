package syr.js.org.syrnative;

import android.content.Context;
import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by simalkireddy on 6/8/18.
 */

public class SyrAlertDialogue implements SyrBaseModule {

    @SyrMethod
    public static void alert(String title, String message, final JSONArray actions, Context c) {

        AlertDialog.Builder builder = new AlertDialog.Builder(c);
        try {
            builder.setTitle(title)
                    .setMessage(message)
                    .setPositiveButton(actions.getJSONObject(0).getString("title"), new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            // continue with delete
                            try {

                                JSONObject eventMap = new JSONObject();
                                eventMap.put("type", "alertDialogue");
                                eventMap.put("body", actions.getJSONObject(0).getString("title"));
                                SyrEventHandler.getInstance().sendEvent(eventMap);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    })
                    .setNegativeButton(actions.getJSONObject(1).getString("title"), new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            try {

                                JSONObject eventMap = new JSONObject();
                                eventMap.put("type", "alertDialogue");
                                eventMap.put("body", actions.getJSONObject(1).getString("title"));
                                SyrEventHandler.getInstance().sendEvent(eventMap);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    })
                    .show();
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    @Override
    public String getName() {
        return "AlertDialogue";
    }
}
