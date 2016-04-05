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
  var webCam = null;
  var imageCompare = null;

  var rendering = false;

  var width = 64;
  var height = 48;

  var currentImage = null;
  var oldImage = null;

  var topLeft = [Infinity, Infinity];
  var bottomRight = [0, 0]

  var raf = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimation ||
    function(callback){
      window.setTimeout(callback, 1000/60)
    }
  })();

  App.Core = function(){
    function initialize() {
      imageCompare = App.CompareImage();
      webCam = App.CaptureImageCam(document.getElementById('webCamWindow'));

      rendering = true;

      main();
    }

    function render(){
      oldImage = currentImage;
      currentImage = webCam.captureImage(false);

      if(!oldImage || !currentImage){
        return;
      }

      var vals = imageCompare.compare(currentImage, oldImage, width, height);

      topLeft[0] = vals.topLeft[0] * 10;
      topLeft[1] = vals.topLeft[1] * 10;

      bottomRight[0] = vals.bottomRight[0] * 10;
      bottomRight[1] = vals.bottomRight[1] * 10;

      // console.log(topLeft[1]);

      document.getElementById('movement').style.top = topLeft[1] + 'px';
      document.getElementById('movement').style.left  = topLeft[0] + 'px';

      document.getElementById('movement').style.width  = (bottomRight[0] - topLeft[0]) + 'px';
      document.getElementById('movement').style.height  = (bottomRight[1] - topLeft[1]) + 'px';

      topLeft = [Infinity, Infinity];
      bottomRight = [0,0];
    }

    function main(){
      try{
        render();
      }catch (e){
        console.log(e);
        return;
      }

      if(rendering == true){
        raf(main.bind(this))
      }
    }

    initialize()
  }
})(MotionDetector)
