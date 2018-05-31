package syr.js.org.syrnative;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.AsyncTask;
import android.view.View;
import android.widget.ImageView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrImage implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {

        ImageView imageView;
        if(instance != null) {
            imageView = (ImageView) instance;
        } else {
            imageView = new ImageView(context);
        }
        String value = "";
        JSONObject style = null;
        JSONObject source = null;
        Integer left = 0;
        Integer top = 0;

        try {
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject jsonProps = jsonInstance.getJSONObject("props");

            if (jsonInstance.has("style")) {
                style = jsonInstance.getJSONObject("style");
                if(instance == null) {
                    imageView.setLayoutParams(SyrStyler.styleLayout(style));
                } else {
                    if(style.has("width")) {

                        imageView.getLayoutParams().width = style.getInt("width");

                    }

                    if(style.has("height")) {

                        imageView.getLayoutParams().height = style.getInt("height");
                    }
                    imageView.setLayoutParams(imageView.getLayoutParams());
                }
            }

            if (style != null) {
                SyrStyler.styleView(imageView, style);

                if(style.has("left")) {
                    imageView.setX(style.getInt("left"));
                }

                if(style.has("top")) {
                    imageView.setY(style.getInt("top"));
                }
            }

            if (jsonProps.has("source")) {
                // grabs the source url if present
                source = jsonProps.getJSONObject("source");
                String path = source.getString("uri");

                // check if image exists in Resources
                int pathExists = context.getResources().getIdentifier(path, "drawable", context.getPackageName());

                if (pathExists != 0) {
                    // if exist set image
                    imageView.setImageResource(pathExists);
                } else {
                    // throw yellow box that image is not found in res/drawable
                    // revert to a friendly image for now
                    new DownloadImageTask(imageView).execute(path);
//                    imageView.setBackgroundColor(Color.parseColor("#ff00ff"));
                }

                imageView.setScaleType(ImageView.ScaleType.FIT_XY);

            } else {
                // throw red box because missing source prop entirely
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }



        return imageView;
    }

    @Override
    public String getName() {
        return "Image";
    }

    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage;
        public DownloadImageTask(ImageView bmImage) {
            this.bmImage = bmImage;
        }

        protected Bitmap doInBackground(String... urls) {
            String urldisplay = urls[0];
            Bitmap mIcon11 = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                mIcon11 = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return mIcon11;
        }

        protected void onPostExecute(Bitmap result) {
            bmImage.setImageBitmap(result);
        }
    }
}
