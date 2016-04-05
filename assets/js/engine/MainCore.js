/**
  *
  * @project       Motion Detector Prototype
  * @file          MainCore.js
  * @description   Prototype for motion detector
  * @author        Fandi Harsono
  * @package       MotionDetector
  * @version       -
  *
*/
;(function(App){

  "use strict";
  var webCam = false

  App.Core = function(){
    function initialize() {
      // imageCompare = App.ImageCompare
      webCam = App.CaptureImageCam(document.getElementById('webCamWindow'))
    }

    initialize()
  }
})(MotionDetector)
