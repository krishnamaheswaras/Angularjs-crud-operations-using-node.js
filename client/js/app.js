var app = angular.module('sampleApp',[]);


/**
 *usersController
 *@input app
 */
app.controller('usersController',['$scope','$http',function($scope,$http) {
	
$scope.users = [];
	$http.get('/users/getAll').then(function(response){
	//all users
		$scope.users = response.data.data;
	},function(error){

	});

	//add user
	$scope.addUser = function(){
		var rowNo = $scope.users.length+1;
		var userObj = {firstName:"firstName"+rowNo,lastName:"lastName"+rowNo, userName:'newUser'+rowNo,isEditable:false,userId:rowNo};

		$http({
			method:"POST",
			url:'/users/save',
			data:JSON.stringify(userObj),
		}).then(function(response){
			$scope.users.push(userObj);
		},function(error){

		});
	};

	//edit user
	$scope.editUser = function(index){
		if(typeof index=='number'){
			$scope.users[index].isEditable = true;
		}
	};

	//save user
	$scope.updateUser = function(index){
		if(typeof index=='number'){
			var userObj = $scope.users[index];
			$http({
			method:"POST",
			url:'/users/update',
			data:JSON.stringify(userObj),
		}).then(function(response){
						$scope.users[index].isEditable = false;
		},function(error){

		});

		}
	};

	//delete user
	$scope.deleteUser = function(index){
		if(typeof index=='number' && index>0){
			var userObj = $scope.users[index];
			$http({
				method:"POST",
				url:'/users/delete',
				data:JSON.stringify(userObj),
			}).then(function(response){
				$scope.users.splice(index,1);
			},function(error){

			});
		}
	};



}]);