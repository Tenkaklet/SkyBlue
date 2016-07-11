// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('AppCtrl', ['$scope', 'Weather', function ($scope, Weather) {

  L.mapbox.accessToken = 'pk.eyJ1IjoidGVua2FrbGV0IiwiYSI6ImNpa2xsZzhlOTAwN2t2cWxzdXpqcHpwa3EifQ.H3dNmbWFhofi9ia3AVPzFA';
  $scope.hello = false;
  $scope.findMe = function () {
    $scope.hello = true;
    // get geolocation ..
    navigator.geolocation.getCurrentPosition(function (pos) {

      console.log(pos);
      var latitude = pos.coords.latitude;
      var longitude = pos. coords.longitude;
      var someplace = latitude + ',' + longitude;
      var map = L.mapbox.map('map', 'mapbox.streets').setView([latitude, longitude], 14);

      // with geolocation get weather ...
      Weather.find(someplace)
      .then(function (something) {
        console.log(something);
        $scope.Home = something.location.name;
        $scope.currentWeather = something.current.temp_c;
      });
    });




  };
}])
.factory('Weather', ['$http', function ($http) {
  var getWeather = function (location) {
    var key = '899505f3b5124485a9e175305161107';
    var Url = 'http://api.apixu.com/v1/forecast.json?key=' + key + '&q=' + location;
    return $http.get(Url)
    .then(function(anything) {
      return anything.data;
    });
  };
  return {
    find: function (location) {
      return getWeather(location);
    }
  };
}]);
