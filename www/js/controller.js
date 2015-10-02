
angular.module('starter.controllers', [])
.controller('canvasController', function($scope, $ionicModal, $state, $stateParams, $http , $location, $ionicScrollDelegate, $ionicPopup,pdfDelegate, $cordovaFileTransfer,$cordovaFile){
	//console.log("canvasControlller");
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


	  //$scope.pdfUrl = "http://n2.transparent.sg:3000/assets/pdfs/loos/1443509865855_23loo.pdf";
    $scope.pdfUrl = "img/angularjs_tutorial.pdf";
       pdfDelegate
        .$getByHandle('my-pdf-container')
        .load($scope.pdfUrl);


	$scope.getTouchposition = function(event){
	// $scope.hide = true;
	// var canvasPosition = getPosition(event.gesture.touches[0].target);

	// var tap = { x:0, y:0 };
	//         if(event.gesture.touches.length>0){
	//         tt = event.gesture.touches[0];
	//         tap.x = tt.clientX || tt.pageX || tt.screenX ||0;
	//         tap.y = tt.clientY || tt.pageY || tt.screenY ||0;  
	//         }
	//  tap.x = tap.x - canvasPosition.x;
	//  tap.y = tap.y - canvasPosition.y;

  //  	 var alertPopup = $ionicPopup.alert({
	 //     title: 'Defect unfixed..!',
	 //     template: '<div id="sign" style="width: 90%;height: 90%;background-color: #fff; margin: 10px;"><canvas ng-signature-pad="signature" width="210"></canvas></div>',
	 // });
	var img1 = document.getElementById('img1');
     var confirmPopup = $ionicPopup.confirm({
       title: 'Sign here',
       template: '<div id="sign" style="width: 90%;height: 90%;background-color: #fff; margin: 10px;"><canvas id="signatureCanvas" ng-signature-pad="signature" width="210"></canvas></div>',
     });
     confirmPopup.then(function(res) {
       if(res) {
				
	
    var img2 = document.getElementById('signatureCanvas');
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var canvas1 = document.getElementById("canvas1");
    var context1 = canvas1.getContext("2d");

    //console.log(img1);
    var width = img1.width;
    var height = img1.height;
    canvas.width = width;
    canvas.height = height;
    var pixels = 4 * width * height;

    context.drawImage(img1, 0, 0);

    var image1 = context.getImageData(0, 0, width, height);
    var imageData1 = image1.data;
    image1.data = imageData1;
    context.putImageData(image1, 0, 0);

    context1.drawImage(img2, 0, 0);
    var image2 = context1.getImageData(0, 0, width, height);
    var imageData2 = image2.data;
    // while (pixels--) {
    //     imageData1[pixels] = imageData2[pixels] * 0.5;
    // }
    context1.putImageData(image2, 0, 0);

	 // var alertPopup = $ionicPopup.alert({
	 //     title: 'Defect unfixed..!',
	 //     template: 'X cordinate'+tap.x+ '\nY cordinate'+tap.y+'.',
	 // });
	 // return {x: tap.x, y: tap.y};
       } else {
         console.log('You are not sure');
       }
     });
   




	}

      $scope.openNextPage = function(){
      pdfDelegate.$getByHandle('my-pdf-container').next();
    };

    $scope.openPrevPage = function(){
      pdfDelegate.$getByHandle('my-pdf-container').prev();
    };

    $scope.zoomIn = function(){
      pdfDelegate.$getByHandle('my-pdf-container').zoomIn();
    };

    $scope.zoomOut = function(){
     pdfDelegate.$getByHandle('my-pdf-container').zoomOut();
    };


	var draggable = document.getElementById('canvas1');
	draggable.addEventListener('touchmove', function(event) {
	    var touch = event.targetTouches[0];
	    // Place element where the finger is
	    draggable.style.left = touch.pageX-80 + 'px';
	    draggable.style.top = touch.pageY-80 + 'px';
      //console.log(draggable.style.left+''+draggable.style.top);
	    event.preventDefault();
  	}, false);


	//this function gets called from the html template
	var zoomed = true;
	  $scope.touchFunction = function(){
	  	//console.log("zoomFunction");
	    if(zoomed){// toggle zoom in
	      var tap = {x:0, y:0};
	      var position = $scope.getTouchposition(event);
	      // $ionicScrollDelegate.zoomBy(1.8, true, position.x, position.y);
	      // zoomed = !zoomed;
	      //console.log(ionic.tap.pointerCoord(event));

	      //console.log(position.x);
	    }else{ // toggle zoom out
	     $ionicScrollDelegate.zoomTo(1, true);
	      zoomed = !zoomed;
	    }    
	  }

	 $scope.fileupload = function(){
	 	console.log('asdasd');
	 	$state.go('app.browse');
	};

  $scope.merge = function(event){
    console.log("Merge");
    $scope.hide = true;
    var img2 = document.getElementById('canvas1');
    var img1 = document.getElementById('img1');
    var canvasPosition = getPosition(img2);
    //console.log(canvasPosition.x);
    //console.log(canvasPosition.y);
    var canvas = document.getElementById("canvas3");
    var context = canvas.getContext("2d");
    var width = img1.width;
    var height = img1.height;
    canvas.width = width;
    canvas.height = height;
    var pixels = 4 * width * height;
    context.drawImage(img1, 0, 0);
    var image1 = context.getImageData(0, 0, width, height);
    var imageData1 = image1.data;
    context.moveTo(canvasPosition.x-98,canvasPosition.y-280);
    context.lineTo(canvasPosition.x,canvasPosition.y);
    context.drawImage(img2,0, 0 );

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

.controller('BrowseCtrl', function($window, $ionicPlatform, $rootScope, $scope, $ionicScrollDelegate, AudioSvc, $ionicModal) {
	console.log("Brose Controller");
    $scope.files = [];
 
    // $ionicModal.fromTemplateUrl('templates/player.html', {
    //   scope: $scope
    // }).then(function(modal) {
    //   $scope.modal = modal;
    // });
 
    // $rootScope.hidePlayer = function() {
    //   $scope.modal.hide();
    // };
 
    // $rootScope.player = function() {
    //   $scope.modal.show();
    // };
 
    $ionicPlatform.ready(function() {
      
      console.log(cordova.file);
     $cordovaFile.getFreeDiskSpace()
      .then(function (success) {
        console.log("file directory success");
         // success in kilobytes
      }, function (error) {
          // error
          console.log("file directory success");
      });



      $rootScope.show('Accessing Filesystem.. Please wait');
      $window.requestFileSystem($window.LocalFileSystem.PERSISTENT, 0, function(fs) {
          //console.log("fs", fs);
 
          var directoryReader = fs.root.createReader();
 
          directoryReader.readEntries(function(entries) {
              var arr = [];
              processEntries(entries, arr); // arr is pass by refrence
              $scope.files = arr;
              $rootScope.hide();
            },
            function(error) {
              console.log(error);
            });
        },
        function(error) {
          console.log(error);
        });
 
      $scope.showSubDirs = function(file) {
 
        if (file.isDirectory || file.isUpNav) {
          if (file.isUpNav) {
            processFile(file.nativeURL.replace(file.actualName + '/', ''));
          } else {
            processFile(file.nativeURL);
          }
        } else {
          // if (hasExtension(file.name)) {
            
          // } else {
          //   $rootScope.toggle('Oops! We cannot play this file :/', 3000);
          // }
 
        }
 
      }
 
      function fsResolver(url, callback) {
        $window.resolveLocalFileSystemURL(url, callback);
      }
 
      function processFile(url) {
        fsResolver(url, function(fs) {
          //console.log(fs);
          var directoryReader = fs.createReader();
 
          directoryReader.readEntries(function(entries) {
              if (entries.length > 0) {
                var arr = [];
                // push the path to go one level up
                if (fs.fullPath !== '/') {
                  arr.push({
                    id: 0,
                    name: '.. One level up',
                    actualName: fs.name,
                    isDirectory: false,
                    isUpNav: true,
                    nativeURL: fs.nativeURL,
                    fullPath: fs.fullPath
                  });
                }
                processEntries(entries, arr);
                $scope.$apply(function() {
                  $scope.files = arr;
                });
 
                $ionicScrollDelegate.scrollTop();
              } else {
                $rootScope.toggle(fs.name + ' folder is empty!', 2000);
              }
            },
            function(error) {
              console.log(error);
            });
        });
      }
 
      // function hasExtension(fileName) {
      //   var exts = ['.mp3', '.m4a', '.ogg', '.mp4', '.aac'];
      //   return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
      // }
 
      function processEntries(entries, arr) {
 
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
 
          // do not push/show hidden files or folders
          if (e.name.indexOf('.') !== 0) {
            arr.push({
              id: i + 1,
              name: e.name,
              isUpNav: false,
              isDirectory: e.isDirectory,
              nativeURL: e.nativeURL,
              fullPath: e.fullPath
            });
          }
        }
        return arr;
      }
 
    });
  }
)
