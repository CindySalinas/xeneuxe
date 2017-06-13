angular.module('app.users', [])
  .controller('UsersCtrl', ['$scope', 'ApiRequests', '$uibModal', function($scope, ApiRequests, $uibModal) {

    $scope.user = {};
    $scope.userList = [];
    $scope.edit = false;
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
          $scope.userList = res.data;
        })
        .catch(function(err) {
        });
    }
    $scope.dateChange = function(date) {
      $scope.user.birthDate = date;
    }

    $scope.createUser = function(data) {
      // console.log(data);
      if($scope.edit){
        ApiRequests.updateUser(data)
          .then(function(res) {
            $scope.alert = {
              show: true,
              type: 'success',
              msg: 'User successfully modified'
            };
            angular.forEach($scope.userList, function(value, index){
              if(data._id === value._id){
                $scope.userList[index] = data;
              }
            });
            $scope.user = {};
            $scope.dt = '';
            $scope.edit = false;
            $scope.userForm.$setPristine();
            $scope.userForm.$setUntouched();
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
      else{
        ApiRequests.saveUser(data)
          .then(function(res) {
            $scope.alert = {
              show: true,
              type: 'success',
              msg: 'User successfully created'
            };
            $scope.userList.push(res.data);
            $scope.user = {};
            $scope.dt = '';
            $scope.edit = false;
            $scope.userForm.$setPristine();
            $scope.userForm.$setUntouched();
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
    }
    $scope.editUser = function(data, index){
      $scope.edit = true;
      $scope.user = angular.copy(data);
      if(data.birthDate){
        $scope.dt = new Date(data.birthDate);
        $scope.dateChange(new Date(data.birthDate));
      }
      else
        $scope.dt = '';
    }
    $scope.deleteUser = function(data, index){
      var modalInstance = $uibModal.open({
        templateUrl: 'templates/users/users-delete.html',
        controller: 'userDeleteController',
        size: 'md',
        resolve: {
          Items: function(){
            return data;
          }
        }
      });
      modalInstance.result.then(function (result) {
        ApiRequests.deleteUser(data._id)
          .then(function(res) {
            angular.forEach($scope.userList, function(value, index){
              if(data._id === value._id){
                $scope.userList.splice(index,1);
              }
            });
            var modalInstance2 = $uibModal.open({
              templateUrl: 'templates/users/users-success.html',
              controller: 'userDeleteController',
              size: 'md',
              resolve: {
                Items: function(){
                  return {};
                }
              }
            });
            modalInstance2.result.then(function (result) {}, function () {});
          })
          .catch(function(err) {
            var modalInstance2 = $uibModal.open({
              templateUrl: 'templates/users/users-error.html',
              controller: 'userDeleteController',
              size: 'md',
              resolve: {
                Items: function(){
                  return {};
                }
              }
            });
            modalInstance2.result.then(function (result) {}, function () {});
          });
      }, function () {

      });
    }
    $scope.cancel = function(){
      $scope.user = {};
      $scope.dt = '';
      $scope.edit = false;
    }
  }])

  .controller('userDeleteController', ['$scope','$uibModalInstance','Items', function($scope, $uibModalInstance,Items){
    $scope.items = Items;
    $scope.save = function (){
      $uibModalInstance.close($scope.items);
    };

    $scope.cancel = function (){
      $uibModalInstance.dismiss('cancel');
    };
}]);
