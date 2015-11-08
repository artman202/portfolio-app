angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {    

  function loop() {
    $('.animate').animate({'top': '25'}, {
    duration: 1000, 
    complete: function() {
        $('.animate').animate({'top': '0'}, {
            duration: 1000, 
            complete: 'loop'});
        loop();
    }});
  }
  loop();
  

})

.controller('PortCtrl', function($scope, $http, $ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $ionicLoading.show({
    template: '<ion-spinner icon="ripple"></ion-spinner>'
  });

  $http.get('http://www.criative.co.za/portfolio_api/dev_portfolio_api.php')
  .then(function successCallback(response){
    $scope.ports = response.data;
    $ionicLoading.hide();
  }, function errorCallback(error) {
    alert("Error retrieving data!");
  });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, $http, $cordovaInAppBrowser, $cordovaFile, $ionicLoading) {

  $ionicLoading.show({
    template: '<ion-spinner icon="ripple"></ion-spinner>'
  });

  $http.get('http://www.criative.co.za/portfolio_api/dev_portfolio_api.php')
  .then(function successCallback(response){
    var port = response.data;
    for (var x = 0; x < port.length; x++) {
      if (port[x].port_item_id === $stateParams.portId) {
        $scope.portfolio = port[x];
        $scope.tech = port[x].port_item_tech.split(', ');
      }
      
    }
    $ionicLoading.hide();        
  }, function errorCallback(error) {
    alert("Error retrieving data!");
  });

  $scope.openPdf = function(file) {

    console.log(cordova.file.applicationDirectory);

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };
    
    $cordovaInAppBrowser.open('http://docs.google.com/viewer?url=http://criative.co.za/files/'+file, '_system', options)
    .then(function(event) {
      console.log(event);
    })
    .catch(function(event) {
      console.log(event);
    });

  }  

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
