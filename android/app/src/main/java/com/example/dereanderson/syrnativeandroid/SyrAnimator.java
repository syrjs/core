package com.example.dereanderson.syrnativeandroid;

import android.animation.Animator;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.animation.ValueAnimator;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
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
    static private Handler uiHandler = new Handler(Looper.getMainLooper());

    static private String determineAnimationType(JSONObject animationDict) {
        if(animationDict.has("animatedProperty")) {
            return "animateInterpolate";
        }
        return "animateComponentXY";
    }

    // animate a view
    static void animate(final View component, final JSONObject jsonAnimation, final SyrBridge bridge) throws JSONException {
        final String guid = jsonAnimation.getString("guid");
        JSONObject animationDict = jsonAnimation.getJSONObject("animation");
        String animationType = determineAnimationType(animationDict);

        Animator.AnimatorListener listener = new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animation) {

            }

            @Override
            public void onAnimationEnd(Animator animation) {

                uiHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        HashMap<String, String> eventMap = new HashMap<>();
                        eventMap.put("type", "animationComplete");
                        eventMap.put("animation", jsonAnimation.toString());
                        eventMap.put("guid", guid);
                        bridge.sendEvent(eventMap);
                    }
                });

            }

            @Override
            public void onAnimationCancel(Animator animation) {

            }

            @Override
            public void onAnimationRepeat(Animator animation) {

            }
        };

        if(animationType == "animateComponentXY") {

            AnimatorSet mover = null;
            Integer fromX = null;
            Integer fromY  = null;
            Integer toX = null;
            Integer toY = null;
            Integer duration = animationDict.getInt("duration");
            ObjectAnimator xAnimation = null;
            ObjectAnimator yAnimation = null;

            if(animationDict.has("x2") && animationDict.has("y2")) {
                mover = new AnimatorSet();
            }

            if(animationDict.has("x2")) {
                fromX = animationDict.getInt("x");
                toX = animationDict.getInt("x2");
                xAnimation = ObjectAnimator.ofFloat(component, "x", fromX, toX);
                xAnimation.setDuration(duration);
            }

            if(animationDict.has("y2")) {
                fromY = animationDict.getInt("y");
                toY = animationDict.getInt("y2");
                yAnimation = ObjectAnimator.ofFloat(component, "y", fromY, toY);
                yAnimation.setDuration(duration);
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
        }

        if(animationType == "animateInterpolate") {

            String propertyName = animationDict.getString("animatedProperty").toLowerCase();
            Integer fromValue = animationDict.getInt("value");
            Integer toValue = animationDict.getInt("toValue");
            Integer duration = animationDict.getInt("duration");

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

                ObjectAnimator anim = ObjectAnimator.ofFloat(component, propertyName, fromValue, toValue); // rotationX, rotationY
                anim.setDuration(duration);

                // we don't want easing at the ends by default.
                // otherwise callbacks will be delayed through final frames
                anim.setInterpolator(new LinearInterpolator());
                anim.addListener(listener);

                anim.start();
            }

            if(propertyName.contains("height")){
                ValueAnimator slideAnimator = ValueAnimator
                        .ofInt(fromValue, toValue)
                        .setDuration(duration);

                slideAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                    @Override
                    public void onAnimationUpdate(final ValueAnimator animation) {

                        uiHandler.post(new Runnable() {
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

                slideAnimator.start();
            }
        }
    }
}
