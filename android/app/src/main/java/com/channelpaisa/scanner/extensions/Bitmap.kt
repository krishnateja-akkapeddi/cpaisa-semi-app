package com.channelpaisa.scanner.extensions

import android.graphics.Bitmap
import android.graphics.Matrix
import android.util.Base64
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream
import kotlin.math.sqrt

/**
 * This converts the bitmap to base64
 *
 * @return image as a base64 string
 */
fun Bitmap.toBase64(quality: Int): String {
    val byteArrayOutputStream = ByteArrayOutputStream()
    compress(Bitmap.CompressFormat.JPEG, quality, byteArrayOutputStream)
    return Base64.encodeToString(
        byteArrayOutputStream.toByteArray(),
        Base64.DEFAULT
    )
}

/**
 * This converts the bitmap to base64
 *
 * @param file the bitmap gets saved to this file
 */
fun Bitmap.saveToFile(file: File, quality: Int) {
    val fileOutputStream = FileOutputStream(file)
    compress(Bitmap.CompressFormat.JPEG, quality, fileOutputStream)
    fileOutputStream.close()
}

/**
 * This resizes the image, so that the byte count is a little less than targetBytes
 *
 * @param targetBytes the returned bitmap has a size a little less than targetBytes
 */
fun Bitmap.changeByteCountByResizing(targetBytes: Int): Bitmap {
    val scale = sqrt(targetBytes.toDouble() / byteCount.toDouble())
    return Bitmap.createScaledBitmap(
        this,
        (width * scale).toInt(),
        (height * scale).toInt(),
        true
    )
}

 fun rotateBitmap(bitmap: Bitmap, degrees: Float): Bitmap {
    val matrix = Matrix()
    matrix.postRotate(degrees)
    return Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
}

