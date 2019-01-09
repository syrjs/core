package syr.js.org.syrnative;

import android.content.Context;
import android.os.AsyncTask;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 * Modified by Siddharth Reddy Malkireddy EveryDay. :P
 */

public class SyrBundleManager {
    protected String uri;
    protected Context context;
    protected String manifestHash = null;

    public SyrBundleManager(Context mContext) {
        // does this need the (additional) config param?
        // if not do we need this constructor?
        context = mContext;
    }

    public SyrBundleManager setBundleAssetName(String uri) {
        this.uri = uri;
        return this;
    }

    public SyrBundle build() {
        return new SyrBundle(this);
    }

    public SyrBundle build(String manifestURI) {
        this.getManifest(manifestURI);
        return new SyrBundle(this);
    }

    public void getManifest(String manifestURI) {
        new GetManifestTask(context).execute(manifestURI);
    }

    private class GetManifestTask extends AsyncTask<String, String, String> {
        private WeakReference<Context> contextRef;

        public GetManifestTask(Context mContext) {
            // does this need the (additional) config param?
            // if not do we need this constructor?
            contextRef = new WeakReference<>(mContext);
        }

        protected String doInBackground(String... params) {

            HttpURLConnection connection = null;
            BufferedReader reader = null;

            try {
                URL url = new URL(params[0]);
                connection = (HttpURLConnection) url.openConnection();
                connection.connect();

                InputStream stream = connection.getInputStream();

                reader = new BufferedReader(new InputStreamReader(stream));

                StringBuffer buffer = new StringBuffer();
                String line = "";

                while ((line = reader.readLine()) != null) {
                    buffer.append(line+"\n");
                }

                return buffer.toString();

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
                try {
                    if (reader != null) {
                        reader.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(String result) {

            try {
                JSONObject jsonObject = new JSONObject(result);
                JSONObject manifestObject = jsonObject.getJSONObject("app");
                String newManifestHash = manifestObject.getString("hash");
                JSONArray arrJson = manifestObject.getJSONArray("files");


                if(manifestHash == null || manifestHash.equals(newManifestHash)) {
                    manifestHash = newManifestHash;
                    for(int i = 0; i < arrJson.length(); i++) {
                        JSONObject fileObject = arrJson.getJSONObject(i);
                        String fileType = fileObject.getString("type");
                        fileObject.put("baseURI", manifestObject.getJSONObject("meta").getString("baseURI"));
                        fileObject.put("configVersion", manifestObject.getString("configVersion"));
                        // TODO: Check the file hashes to update/Download them
                        if(fileType.equals("script")) {
                            // we are only dealing with script updates currently
                            new GetFiles(context).execute(fileObject);
                        }
                    }
                }


            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }

    private class GetFiles extends AsyncTask<JSONObject, Void, JSONObject> {


        private WeakReference<Context> contextRef;
        public GetFiles(Context mContext) {
            // does this need the (additional) config param?
            // if not do we need this constructor?
            contextRef = new WeakReference<>(mContext);
        }

        protected JSONObject doInBackground(JSONObject... params) {
            try {
                JSONObject fileObject = params[0];
                JSONObject responseObject = new JSONObject();
                String fileName = fileObject.getString("name");
                String baseURI = fileObject.getString("baseURI");
                String configVersion = fileObject.getString("configVersion");
                String fileHash = fileObject.getString("hash");
                String url = baseURI + "/" + configVersion + "/" + fileName;

                String response = this.saveTextFileFromURL(url);
                responseObject.put("file", response);
                responseObject.put("fileName", fileName);
                responseObject.put("fileHash", fileHash);
                return responseObject;
            } catch (JSONException e) {
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(JSONObject result) {

            try {

                // TODO: Hash Comparision is not working good, need to check this too
//            if(checkHash(result.getString("file"), result.getString("fileHash"))) {
                FileOutputStream outputStream = context.openFileOutput(result.getString("fileName"), Context.MODE_PRIVATE);
                outputStream.write(result.getString("file").getBytes());
                outputStream.close();
//            }

            } catch ( JSONException | IOException e) {
                e.printStackTrace();
            }

        }

        public String saveTextFileFromURL(String urlString) {

            HttpURLConnection connection = null;
            BufferedReader reader = null;

            try {
                URL url = new URL(urlString);
                connection = (HttpURLConnection) url.openConnection();
                connection.connect();

                InputStream stream = connection.getInputStream();

                reader = new BufferedReader(new InputStreamReader(stream));

                StringBuffer buffer = new StringBuffer();
                String line = "";

                while ((line = reader.readLine()) != null) {
                    buffer.append(line+"\n");
                }

                return buffer.toString();

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
                try {
                    if (reader != null) {
                        reader.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return null;
        }

        public Boolean checkHash(String file, String baseHash) {
            final String MD5 = "MD5";
            try {
                // Create MD5 Hash
                MessageDigest digest = java.security.MessageDigest
                        .getInstance(MD5);
                digest.update(file.getBytes());
                byte messageDigest[] = digest.digest();

                // Create Hex String
                StringBuilder hexString = new StringBuilder();
                for (byte aMessageDigest : messageDigest) {
                    String h = Integer.toHexString(0xFF & aMessageDigest);
                    while (h.length() < 2)
                        h = "0" + h;
                    hexString.append(h);
                }

                return hexString.toString() == baseHash;

            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }

            return false;
        }
    }

}
