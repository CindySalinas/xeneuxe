
angular.module('app.users', [])
  .controller("UsersCtrl", ['$scope', function ($scope) {

    //datepicker options
    $scope.dateOptions = {
      formatYear: 'yyyy',
      maxDate: new Date(),
      startingDay: 1
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.popup2 = {
      opened: false
    };

}]);
