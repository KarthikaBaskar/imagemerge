angular.module('starter.controllers', [])
.controller('BrowseCtrl', function($window, $ionicPlatform, $rootScope, $scope, $ionicScrollDelegate, $ionicModal) {
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
);