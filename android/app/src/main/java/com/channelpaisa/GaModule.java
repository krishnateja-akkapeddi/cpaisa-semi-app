package com.channelpaisa;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class GaModule extends ReactContextBaseJavaModule {
    GaModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "GaModule";
    }

    @ReactMethod
    public void editImage(String imageUrl, Callback callback){
        Log.d("Custom Ga Module", "From native module");
        callback.invoke("Sending data from native to react native"+"_IMAGE___"+imageUrl);
    }
}