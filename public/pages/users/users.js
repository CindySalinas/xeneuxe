angular.module('app.users', [])
  .controller('UsersCtrl', ['$scope', 'ApiRequests', function($scope, ApiRequests) {

    $scope.user = {};
    $scope.userList = [];
    $scope.edit = false;

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
      .catch(function(err){
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
          $scope.user = {};
        })
        .catch(function(err) {
          console.log('err', err);
        });
    }
    $scope.editUser = function(data, index){
      $scope.edit = true;
      $scope.user = data;
    }
    $scope.deleteUser = function(data, index){

    }
  }]);
