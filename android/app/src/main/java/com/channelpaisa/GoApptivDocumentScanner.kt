package com.channelpaisa;

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.util.Log
import androidx.core.app.ActivityCompat

import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.channelpaisa.scanner.DocumentScannerActivity
import com.channelpaisa.scanner.constants.DocumentScannerExtra
import com.channelpaisa.scanner.constants.ImageProvider
import com.facebook.react.bridge.*

class GoApptivDocumentScanner(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {
    private lateinit var activity: Activity
    private var pendingResult: Callback? = null
    private val START_DOCUMENT_ACTIVITY = 0x362738

    override fun getName(): String {
        return "GoapptivDocumentScanner"
    }




    override fun initialize() {
        super.initialize()
        reactApplicationContext.addActivityEventListener(this)
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        reactApplicationContext.removeActivityEventListener(this)
    }

    override fun onNewIntent(intent: Intent) {
    }



    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {



        if (requestCode != START_DOCUMENT_ACTIVITY) {
            return
        }
        when (resultCode) {
            Activity.RESULT_OK -> {
                val error = data?.extras?.getString("error")

                if (error != null) {
                    throw Exception("error - $error")
                }
                val croppedImageResults = data?.getStringArrayListExtra("croppedImageResults")?.toList()
                        ?: throw Exception("No cropped images returned")
                Log.d("GoapptivDocumentScanner", croppedImageResults[0])
                val successResponse = croppedImageResults.map {
                    it.removePrefix("file://")
                }.toList()
                sendEvent("onDocumentScanSuccess", createResultMap(successResponse))
            }
            Activity.RESULT_CANCELED -> {
                sendEvent("onDocumentScanCancel", null)
            }
        }
    }


    private fun sendEvent(eventName: String, data: WritableMap?) {
        reactApplicationContext
                .getJSModule(RCTDeviceEventEmitter::class.java)
                .emit(eventName, data)
    }

    private fun sendCroppingEvent(eventName: String, data: String) {
        reactApplicationContext
                .getJSModule(RCTDeviceEventEmitter::class.java)
                .emit(eventName, data)
    }


    private fun createResultMap(data: List<String>): WritableMap {
        val resultMap = Arguments.createMap()
        val resultArray: WritableArray = Arguments.createArray()
        for (item in data) {
            resultArray.pushString(item)
        }
        resultMap.putArray("result", resultArray)
        return resultMap
    }

    @ReactMethod
    fun getPicture(callback: Callback) {
        pendingResult = callback
        startScan(ImageProvider.CAMERA)
    }

    @ReactMethod
    fun getPictureFromGallery(callback: Callback) {
        pendingResult = callback
        startScan(ImageProvider.GALLERY)
    }

    private fun createDocumentScanIntent(imageProvider: String): Intent {
        val documentScanIntent = Intent(currentActivity, DocumentScannerActivity::class.java)
        documentScanIntent.putExtra(DocumentScannerExtra.EXTRA_LET_USER_ADJUST_CROP, true)
        documentScanIntent.putExtra(DocumentScannerExtra.EXTRA_MAX_NUM_DOCUMENTS, 1)
        documentScanIntent.putExtra(DocumentScannerExtra.EXTRA_IMAGE_PROVIDER, imageProvider)
        documentScanIntent.putExtra(DocumentScannerExtra.EXTRA_LET_USER_ROTATE_IMAGE,true)
        return documentScanIntent
    }

    private fun startScan(imageProvider: String) {
            val intent = createDocumentScanIntent(imageProvider)
            try {
                val currentActivity = currentActivity ?: return
                ActivityCompat.startActivityForResult(
                        currentActivity,
                        intent,
                        START_DOCUMENT_ACTIVITY,
                        null
                )
            } catch (e: ActivityNotFoundException) {
                pendingResult?.invoke("FAILED TO START ACTIVITY", null)
            }
        }
    }

