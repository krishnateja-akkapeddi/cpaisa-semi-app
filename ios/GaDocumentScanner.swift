//
//  GaDocumentScanner.swift
//  ChannelPaisa
//
//  Created by Krishna Teja Akkapeddi on 25/05/23.
//

import Foundation
import WeScan
import UIKit
import React

@objc(GoapptivDocumentScanner)
class GoapptivDocumentScanner: NSObject {
    
    @objc
    static func requiresMainQueueSetup() ->Bool{
      return false;
    }
  
    @objc
    func camera(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            let scannerViewController = ImageScannerController()
            scannerViewController.imageScannerDelegate = self
            scannerViewController.modalPresentationStyle = .fullScreen
            
            if #available(iOS 13.0, *) {
                scannerViewController.overrideUserInterfaceStyle = .dark
            }
            
            let rootViewController = UIApplication.shared.keyWindow?.rootViewController
            rootViewController?.present(scannerViewController, animated: true, completion: nil)
            
            self.resolve = resolve
            self.reject = reject
        }
    }
    
  
   @objc
    func gallery(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            let imagePicker = UIImagePickerController()
            imagePicker.delegate = self
            imagePicker.sourceType = .photoLibrary
            imagePicker.modalPresentationStyle = .fullScreen
            
            let rootViewController = UIApplication.shared.keyWindow?.rootViewController
            rootViewController?.present(imagePicker, animated: true, completion: nil)
            
            self.resolve = resolve
            self.reject = reject
        }
    }
    
    var resolve: RCTPromiseResolveBlock?
    var reject: RCTPromiseRejectBlock?
}

extension GoapptivDocumentScanner: ImageScannerControllerDelegate {
    func imageScannerController(_ scanner: ImageScannerController, didFinishScanningWithResults results: ImageScannerResults) {
        scanner.dismiss(animated: true)
        let path = Utils.getScannedFile(results: results)
        resolve?(path)
    }
    
    func imageScannerControllerDidCancel(_ scanner: ImageScannerController) {
        scanner.dismiss(animated: true)
        reject?("CANCELLED", "Image scanning was cancelled", nil)
    }
    
    func imageScannerController(_ scanner: ImageScannerController, didFailWithError error: Error) {
        scanner.dismiss(animated: true)
        reject?("ERROR", error.localizedDescription, error)
    }
}

extension GoapptivDocumentScanner: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true)
        reject?("CANCELLED", "Image picking was cancelled", nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
        picker.dismiss(animated: true)
        
        guard let image = info[.originalImage] as? UIImage else {
            reject?("ERROR", "Failed to get the picked image", nil)
            return
        }
        
        pikedCamera(image: image)
    }
    
    private func pikedCamera(image: UIImage? = nil){
        let scannerViewController = ImageScannerController(image: image)
        scannerViewController.imageScannerDelegate = self
        scannerViewController.modalPresentationStyle = .fullScreen

        if #available(iOS 13.0, *) {
            scannerViewController.overrideUserInterfaceStyle = .dark
        }
        
        let rootViewController = UIApplication.shared.keyWindow?.rootViewController
        rootViewController?.present(scannerViewController, animated: true, completion: nil)
    }
}
