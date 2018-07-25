package syr.js.org.syrnative;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.widget.ImageView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;
import java.math.BigDecimal;

/**
 * Created by dereanderson on 1/10/18.
 */

public class SyrImage implements SyrBaseModule, SyrComponent {

    @Override
    public View render(JSONObject component, Context context, View instance) {

        ImageView imageView;
        if (instance != null) {
            imageView = (ImageView) instance;
        } else {
            imageView = new ImageView(context);
        }
        JSONObject style = null;
        JSONObject source = null;

        try {
            JSONObject jsonInstance = component.getJSONObject("instance");
            JSONObject jsonProps = jsonInstance.getJSONObject("props");

            if (jsonInstance.has("style")) {
                style = jsonInstance.getJSONObject("style");
                if (instance == null) {
                    imageView.setLayoutParams(SyrStyler.styleLayout(style));
                } else {
                    if (style.has("width")) {

                        imageView.getLayoutParams().width = style.getInt("width");

                    }

                    if (style.has("height")) {

                        imageView.getLayoutParams().height = style.getInt("height");
                    }
                    imageView.setLayoutParams(imageView.getLayoutParams());
                }
            }

            if (style != null) {
                SyrStyler.styleView(imageView, style);

                if (style.has("left")) {
                    imageView.setX(BigDecimal.valueOf(style.getDouble("left")).floatValue());
                }

                if (style.has("top")) {
                    imageView.setY(BigDecimal.valueOf(style.getDouble("top")).floatValue());
                }
            }
            if (jsonProps.has("source")) {

                // grabs the source url if present
                source = jsonProps.getJSONObject("source");
                String path = source.getString("uri");

                // check if image exists in Resources
                final int pathExists = context.getResources().getIdentifier(path, "drawable", context.getPackageName());
//
                if (pathExists != 0) {
                    final ImageView iv = imageView;
                    new Thread(new Runnable() {
                        @Override
                        public void run() {
                            // if exist set image
                            new Handler(Looper.getMainLooper()).post(new Runnable() {
                                @Override
                                public void run() {
                                    iv.setImageResource(pathExists);

                                }

                            });
                        }
                    }).start();
//                    imageView.setImageResource(pathExists);

                } else {
                    //Assume that its a url for now and try to fetch it in a background task
                    new DownloadImageTask(imageView, style).execute(path);
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
        JSONObject style;

        public DownloadImageTask(ImageView bmImage, JSONObject style) {
            this.bmImage = bmImage;
            this.style = style;
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

        protected void onPostExecute(Bitmap bitmap) {
            try {
                if (bitmap != null) {
                    Bitmap output = Bitmap.createBitmap(bitmap.getWidth(), bitmap
                            .getHeight(), Bitmap.Config.ARGB_8888);
                    Canvas canvas = new Canvas(output);

                    final int color = 0xff424242;
                    final Paint paint = new Paint();
                    final Rect rect = new Rect(0, 0, bitmap.getWidth(), bitmap.getHeight());
                    final RectF rectF = new RectF(rect);
                    float roundPx = 0;
                    if (style.has("borderRadius")) {
                        roundPx = BigDecimal.valueOf(style.getDouble("borderRadius")).floatValue();
                    }
                    paint.setAntiAlias(true);
                    canvas.drawARGB(0, 0, 0, 0);
                    paint.setColor(color);
                    canvas.drawRoundRect(rectF, roundPx, roundPx, paint);

                    paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
                    canvas.drawBitmap(bitmap, rect, rect, paint);
                    bmImage.setImageBitmap(output);
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
