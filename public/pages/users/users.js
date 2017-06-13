angular.module('app.users', [])
  .controller('UsersCtrl', ['$scope', 'ApiRequests', function($scope, ApiRequests) {

    $scope.user = {};
    $scope.userList = [];
    $scope.alert = {
      show: false,
      type: '',
      msg: ''
    };

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

    $scope.getUsers = function() {
      ApiRequests.getUsers()
        .then(function(res) {
          console.log(res);
          $scope.userList = res.data;
        })
        .catch(function(err) {
          console.log('err', err);
        });
    }
    $scope.dateChange = function(date) {
      $scope.user.birthDate = date;
    }

    $scope.createUser = function(data) {
      // console.log(data);
      ApiRequests.saveUser(data)
        .then(function(res) {
          console.log('res', res);
          $scope.alert = {
            show: true,
            type: 'success',
            msg: 'User successfully created'
          };
          $scope.userList.push(res.data);
          $scope.user = {};
          setTimeout(function() {
            $scope.alert = {};
          }, 2000);
        })
        .catch(function(err) {
          console.log('err', err);
          $scope.alert = {
            show: true,
            type: 'danger',
            msg: err.message
          };
          setTimeout(function() {
            $scope.alert = {};
          }, 2000);
        });
    }
  }]);
