package syr.js.org.syrnative;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.animation.ValueAnimator;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.LinearInterpolator;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrAnimator {
    // todo: width and height
    // do we need two of these? borrow this from the raster?
    static private Handler animationHandler = new Handler(Looper.getMainLooper());
    static private HashMap<View, ObjectAnimator> animationCache = new HashMap<>();

    static private String determineAnimationType(JSONObject animationDict) {
        if(animationDict.has("animatedProperty")) {
            return "animateInterpolate";
        }
        return "animateComponentXY";
    }

    // animate a view
    static void animate(final View component, final JSONObject jsonAnimation, final SyrBridge bridge) throws JSONException {
        final String guid = jsonAnimation.getString("guid");
        final JSONObject animationDict = jsonAnimation.getJSONObject("animation");
        String animationType = determineAnimationType(animationDict);

        final Animator.AnimatorListener listener = new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animation) {

            }

            @Override
            public void onAnimationEnd(final Animator animation) {
                try {
                    JSONObject eventMap = new JSONObject();
                    eventMap.put("type", "animationComplete");
                    eventMap.put("animation", jsonAnimation.toString());
                    eventMap.put("guid", guid);
                    bridge.sendEvent(eventMap);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onAnimationCancel(Animator animation) {

            }

            @Override
            public void onAnimationRepeat(Animator animation) {

            }
        };

        if(animationType == "animateComponentXY") {


            animationHandler.post(new Runnable() {
                @Override
                public void run() {

                    AnimatorSet mover = null;

                    Integer fromX = null;
                    Integer fromY  = null;
                    Integer toX = null;
                    Integer toY = null;
                    Integer duration = null;
                    try {
                        duration = animationDict.getInt("duration");

                        ObjectAnimator xAnimation = null;
                        ObjectAnimator yAnimation = null;

                        if(animationDict.has("x2") && animationDict.has("y2")) {
                            mover = new AnimatorSet();
                        }
                        //@TODO taking out fromX and fromY for now to get smooth working. Need to figure out a better way to do it
                        if(animationDict.has("x2")) {
                            fromX = animationDict.getInt("x");
                            toX = animationDict.getInt("x2");
                            xAnimation = ObjectAnimator.ofFloat(component, "x", toX);
                            xAnimation.setDuration(duration);

                            xAnimation.setInterpolator(new AccelerateDecelerateInterpolator());
                        }

                        if(animationDict.has("y2")) {
                            fromY = animationDict.getInt("y");
                            toY = animationDict.getInt("y2");
                            yAnimation = ObjectAnimator.ofFloat(component, "y", toY);
                            yAnimation.setDuration(duration);

                            yAnimation.setInterpolator(new AccelerateDecelerateInterpolator());
                        }

                        if(mover != null) {
                            mover.play(xAnimation).with(yAnimation);
                            mover.addListener(listener);
                            mover.start();
                        } else {
                            if(fromX != null) {
                                xAnimation.addListener(listener);
                                xAnimation.start();
                            } else if(fromY != null) {
                                yAnimation.addListener(listener);
                                yAnimation.start();
                            }
                        }

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }
            });


        }

        if(animationType == "animateInterpolate") {

            String propertyName = animationDict.getString("animatedProperty").toLowerCase();
            final Integer fromValue = animationDict.getInt("value");
            final Integer toValue = animationDict.getInt("toValue");
            final Integer duration = animationDict.getInt("duration");

            if(propertyName.contains("rotate") || propertyName.contains("opacity")) {

                if(propertyName.contains("rotate")) {
                    if(propertyName.contains("x")) {
                        propertyName = "rotationX";
                    }
                    if(propertyName.contains("y")) {
                        propertyName = "rotationY";
                    }
                    if(propertyName.contains("z")) {
                        propertyName = "rotation";
                    }
                }

                if(propertyName.contains("opacity")) {
                    propertyName = "alpha";
                }

                final String finalPropertyName = propertyName;
                animationHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        ObjectAnimator anim;
                        if(animationCache.containsKey(component) && !finalPropertyName.contains("alpha")) {
                            anim = animationCache.get(component);
                        } else {
                            anim = ObjectAnimator.ofFloat(component, finalPropertyName, fromValue, toValue); // rotationX, rotationY
                            animationCache.put(component, anim);
                            anim.addListener(listener);
                        }

                        anim.setDuration(duration);
                        // we don't want easing at the ends by default.
                        // otherwise callbacks will be delayed through final frames
                        anim.setInterpolator(new LinearInterpolator());
                        anim.start();
                    }
                });

            }

            if(propertyName.contains("height")){
                ValueAnimator valueAnimator = ValueAnimator
                        .ofInt(fromValue, toValue)
                        .setDuration(duration);

                valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                    @Override
                    public void onAnimationUpdate(final ValueAnimator animation) {

                        animationHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                // get the value the interpolator is at
                                Integer value = (Integer) animation.getAnimatedValue();
                                // I'm going to set the layout's height 1:1 to the tick
                                component.getLayoutParams().height = value.intValue();
                                // force all layouts to see which ones are affected by
                                // this layouts height change
                                component.requestLayout();
                            }
                        });

                    }
                });

                valueAnimator.addListener(new AnimatorListenerAdapter()
                {
                    @Override
                    public void onAnimationEnd(Animator animation)
                    {
                        animationHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                try {
                                    JSONObject eventMap = new JSONObject();
                                    eventMap.put("type", "animationComplete");
                                    eventMap.put("animation", jsonAnimation.toString());
                                    eventMap.put("guid", guid);
                                    bridge.sendEvent(eventMap);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        });
                    }
                });
                valueAnimator.start();
            }

            if(propertyName.contains("width")){
                ValueAnimator valueAnimator = ValueAnimator
                        .ofInt(fromValue, toValue)
                        .setDuration(duration);

                valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                    @Override
                    public void onAnimationUpdate(final ValueAnimator animation) {

                        animationHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                // get the value the interpolator is at
                                Integer value = (Integer) animation.getAnimatedValue();
                                // I'm going to set the layout's height 1:1 to the tick
                                component.getLayoutParams().width = value.intValue();
                                // force all layouts to see which ones are affected by
                                // this layouts height change
                                component.requestLayout();
                            }
                        });

                    }
                });

                valueAnimator.addListener(new AnimatorListenerAdapter()
                {
                    @Override
                    public void onAnimationEnd(Animator animation)
                    {
                        animationHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                try {
                                    JSONObject eventMap = new JSONObject();
                                    eventMap.put("type", "animationComplete");
                                    eventMap.put("animation", jsonAnimation.toString());
                                    eventMap.put("guid", guid);
                                    bridge.sendEvent(eventMap);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        });
                    }
                });
                valueAnimator.start();
            }
        }
    }
}
