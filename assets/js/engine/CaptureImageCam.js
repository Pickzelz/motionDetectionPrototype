;(function(App){

  App.CaptureImageCam = function(Element){
    var webcam = false
    var width  = 640
    var height = 420

    function initialize(Element){
      if (typeof Element != 'object'){
        webcam = document.getElementById(Element)
      }else{
        webcam = Element
      }

      if(has_support()){
        if(webcam){
          webcam.style.width = width + 'px'
          webcam.style.height = height + 'px'
          stream()
        }
      }else{
        alert ("No Support")
      }
    }

    function stream(){
      (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia).call(
        navigator,
    		{video: true},
        function(localMediaStream){
          if(webcam){
            var vendorUrl = window.URL || window.webkitURL;

            if(navigator.mozGetUserMedia){
              webcam.mozSrcObject = localMediaStream;
            }else {
              webcam.src = vendorUrl.createObjectURL(localMediaStream);
            }
            webcam.play()
          }
        },
        console.error
      );
    }

    function captureImage(append){
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(webcam, 0, 0, width, height);

      var pngImage = canvas.toDataURL('image/png');

      if(append){
        append.appendChild(canvas);
      }

      return canvas;
    }

    function setSize(w, h){
      width = w;
      height = h;
    }

    function has_support(){
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    initialize(Element);

    return {
      setSize: setSize,
      hasSupport: has_support,
      captureImage: captureImage
    }
  }
})(MotionDetector)
