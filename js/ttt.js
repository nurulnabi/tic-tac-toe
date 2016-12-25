 tttConfigApp = angular.module("ttt",[]);
tttConfigApp.controller("tttController", function($scope) {
	$scope.rows = 3;
	$scope.cols = 3;
	$scope.userWon = {
		"first":false,
		"second":false
	};
	$scope.changePlayer = 1;
	$scope.diagonallyDown = (function() {		
		var arr = [];
		var j = 0;
		for (var i = 0; i < $scope.rows; i++) {
				arr.push(10*i+j)
				j++;
		}
		return arr;	
	}());

	$scope.diagonallyUp = (function(){
		var arr = [];
		var j = $scope.rows;
		for (var i = 0; i < $scope.rows; i++) {
				j--;
				arr.push(10*i+j)
		}
		return arr;	
	}());

	$scope.playerCode = (function(){
		var arr =[];
		for (var i = 0; i < $scope.rows; i++) {
			for (var j = 0; j < $scope.cols; j++) {
				var idx = 10*i+j;
				arr[idx] = "";
			}
		}
		return arr;
	}());

	$scope.player = {
		"first":'O',
		"second":"X"
	}

	//fill the cell with the 'O' or 'X' as per the user
	$scope.fillUser = function(r,c) {
		if(!$scope.playerCode[10*r+c]){
			if($scope.changePlayer == 1){
				$scope.playerCode[10*r+c] = $scope.player.first;
				//call function to check win status
				$scope.checkWin(r,c,$scope.player.first);
				$scope.changePlayer = 2;
			}else{
				$scope.playerCode[10*r+c] = $scope.player.second;
				//call function to check win status
				$scope.checkWin(r,c,$scope.player.second);
				$scope.changePlayer = 1;
			}
		}
	}

	//check winning status
	$scope.checkWin = function (r,c,userCode) {
		//check diagonally
		
		var idx = 10*r+c;
		if($scope.diagonallyDown.indexOf(idx) != -1){			//check diangonally for winning
			if($scope.checkDiagonal($scope.diagonallyDown,userCode)) return;
		}
		if($scope.diagonallyUp.indexOf(idx) != -1){
			if($scope.checkDiagonal($scope.diagonallyUp,userCode)) return;
		}

		//otherwise horizontal or vertical cells

	}

	$scope.checkDiagonal = function(diagonalMatrix,userCode) {
		var status = true;
		for(var id in diagonalMatrix){				//id is index in diagonalMatrix arr
			if($scope.playerCode[diagonalMatrix[id]] != userCode){
				status = false;
			}			
		}
		if(status){							//set the user to be winner
			$scope.userWon.first = userCode=='O'?true:false;
			$scope.userWon.second = userCode=='X'?true:false;
		}
		return status;
	};

    $scope.numberToArray = function(num){
		var arr = [];
		//i must start with 1 and end to num
		for (var i = 1; i <= num; i++) {arr.push(i);};
		return arr;
	}
});

