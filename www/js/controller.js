
angular.module('starter.controllers', [])
.controller('canvasControlller', function($scope, $ionicModal, $state, $stateParams, $http , $location, $ionicScrollDelegate, $ionicPopup){
	console.log("canvasControlller");
	function getPosition(element) {
	    var xPosition = 0;
	    var yPosition = 0;

	    while(element) {
	        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
	        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
	        element = element.offsetParent;
	    }
	    return { x: xPosition, y: yPosition };
	}

	$scope.getTouchposition = function(event){
	var canvasPosition = getPosition(event.gesture.touches[0].target);

	var tap = { x:0, y:0 };
	        if(event.gesture.touches.length>0){
	        tt = event.gesture.touches[0];
	        tap.x = tt.clientX || tt.pageX || tt.screenX ||0;
	        tap.y = tt.clientY || tt.pageY || tt.screenY ||0;  
	        }
	 tap.x = tap.x - canvasPosition.x;
	 tap.y = tap.y - canvasPosition.y;

	     var img1 = document.getElementById('img1');
    var img2 = document.getElementById('img2');
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = img1.width;
    var height = img1.height;
    canvas.width = width;
    canvas.height = height;
    var pixels = 4 * width * height;
    context.drawImage(img1, tap.x, tap.y);
    var image1 = context.getImageData(0, 0, width, height);
    var imageData1 = image1.data;
    context.drawImage(img2, 0, 0);
    var image2 = context.getImageData(10, 10, width, height);
    var imageData2 = image2.data;
    while (pixels--) {
        imageData1[pixels] = imageData1[pixels] * 0.5 + imageData2[pixels] * 0.5;
    }
    image1.data = imageData1;
    context.putImageData(image1, 0, 0);

	 var alertPopup = $ionicPopup.alert({
	     title: 'Defect unfixed..!',
	     template: 'X cordinate'+tap.x+ '\nY cordinate'+tap.y+'.',
	 });
	 return {x: tap.x, y: tap.y};
	}

	//this function gets called from the html template
	var zoomed = true;
	  $scope.touchFunction = function(){
	  	console.log("zoomFunction");
	    if(zoomed){// toggle zoom in
	      var tap = {x:0, y:0};
	      var position = $scope.getTouchposition(event);
	      $ionicScrollDelegate.zoomBy(1.8, true, position.x, position.y);
	      zoomed = !zoomed;
	      //console.log(ionic.tap.pointerCoord(event));

	      console.log(position.x);
	    }else{ // toggle zoom out
	     $ionicScrollDelegate.zoomTo(1, true);
	      zoomed = !zoomed;
	    }    
	  }

// window.onload = function () {
//     var img1 = document.getElementById('img1');
//     var img2 = document.getElementById('img2');
//     var canvas = document.getElementById("canvas");
//     var context = canvas.getContext("2d");
//     var width = img1.width;
//     var height = img1.height;
//     canvas.width = width;
//     canvas.height = height;
//     var pixels = 4 * width * height;
//     context.drawImage(img1, 50, 50);
//     var image1 = context.getImageData(0, 0, width, height);
//     var imageData1 = image1.data;
//     context.drawImage(img2, 0, 0);
//     var image2 = context.getImageData(10, 10, width, height);
//     var imageData2 = image2.data;
//     while (pixels--) {
//         imageData1[pixels] = imageData1[pixels] * 0.5 + imageData2[pixels] * 0.5;
//     }
//     image1.data = imageData1;
//     context.putImageData(image1, 0, 0);
// };
})