package syr.js.org.syrnative;

import android.os.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;

/**
 * Created by simalkireddy on 5/3/18.
 */

public class SyrNetworking extends AsyncTask<JSONObject, Void, String> implements SyrBaseModule {

    private String guid;
    private Integer responseCode = null;
    private JSONObject platformErrors = new JSONObject();

    protected String doInBackground(JSONObject... request) {
        URL url;
        HttpURLConnection connection = null;
        String response = null;
        JSONObject requestObject = request[0];
        try {
            // Create connection
            url = new URL(requestObject.getString("url"));
            guid = requestObject.getString("guid");
            connection = (HttpURLConnection) url.openConnection();
            if (requestObject.has("method")) {
                connection.setRequestMethod(requestObject.getString("method"));
            } else {
                platformErrors.put("message", "No method found on fetch");
                return null;
            }

            connection.setRequestProperty("Content-Length",
                    Integer.toString(requestObject.getString("body").getBytes().length));

            if (requestObject.has("headers")) {
                JSONObject headers = new JSONObject(requestObject.getString("headers"));
                Iterator<?> keys = headers.keys();
                while (keys.hasNext()) {
                    String key = (String) keys.next();
                    connection.setRequestProperty(key, headers.getString(key));
                }
            }

            connection.setUseCaches(false);
            connection.setDoInput(true);
            connection.setDoOutput(true);

            // Send request
            DataOutputStream wr = new DataOutputStream(
                    connection.getOutputStream());
            wr.writeBytes(requestObject.getString("body"));
            wr.flush();
            wr.close();

            responseCode = connection.getResponseCode();

            // Get Response
            InputStream responseStream = connection.getErrorStream();
            if (responseStream == null) {
                responseStream = connection.getInputStream();
                response = streamConverter(responseStream);
            } else {
                response = streamConverter(responseStream);
                platformErrors.put("message", response);
                return null;
            }
            return response;

        } catch (IOException | JSONException ioe) {
            ioe.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    protected void onPostExecute(String response) {

        JSONObject eventMap = new JSONObject();
        JSONObject body = new JSONObject();
        try {
            body.put("data", response);
            body.put("guid", guid);
            body.put("responseCode", responseCode);
            body.put("platformError", platformErrors);
            eventMap.put("type", "event");
            eventMap.put("name", "NetworkingCallback");
            eventMap.put("body", body);
            SyrEventHandler.getInstance().sendEvent(eventMap);
            this.cancel(true);
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    @SyrMethod
    public static void request(JSONObject requestObject) {
        new SyrNetworking().execute(requestObject);
    }

    private String streamConverter(InputStream is) {
        BufferedReader rd = new BufferedReader(new InputStreamReader(is));
        String line;
        StringBuffer response = new StringBuffer();

        try {
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();

            return response.toString();

        } catch (IOException ioe) {
            ioe.printStackTrace();
            try {
                platformErrors.put("message", "IOException occured");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return null;
        }
    }

    @Override
    public String getName() {
        return "Networking";
    }

}
