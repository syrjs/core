package com.example.dereanderson.syrnativeandroid;

import android.animation.Animator;
import android.animation.ObjectAnimator;
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

//                    ObjectAnimator anim = ObjectAnimator.ofFloat(button,"x", 0, 1000); // y
//                    ObjectAnimator anim = ObjectAnimator.ofFloat(button,"rotation", 0, 360); // rotationx, rotationy
//                    ObjectAnimator anim = ObjectAnimator.ofFloat(button,"alpha", 0.5f);
//                    anim.setDuration(3000); // duration 3 seconds
//                    anim.start();

    // do we need two of these? borrow this from the raster?
    static private Handler uiHandler = new Handler(Looper.getMainLooper());

    static private String determineAnimationType(JSONObject animationDict) {
        if(animationDict.has("animatedProperty")) {
            return "animateInterpolate";
        }
        return "animateComponentXY";
    }

    // animate a view
    static void animate(View component, final JSONObject jsonAnimation, final SyrBridge bridge) throws JSONException {
        final String guid = jsonAnimation.getString("guid");
        JSONObject animationDict = jsonAnimation.getJSONObject("animation");
        String animationType = determineAnimationType(animationDict);

        if(animationType == "animateInterpolate") {

            String propertyName = animationDict.getString("animatedProperty").toLowerCase();
            Integer fromValue = animationDict.getInt("value");
            Integer toValue = animationDict.getInt("toValue");
            Integer duration = animationDict.getInt("duration");

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
            anim.addListener(new Animator.AnimatorListener() {
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
            });

            anim.start();
        }
    }

}
