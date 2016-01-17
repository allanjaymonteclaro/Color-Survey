var app=angular.module('color-survey', ['ngRoute', 'ngMessages', 'LocalStorageModule', 'chart.js']);

app.config(function($routeProvider, ChartJsProvider){

	$routeProvider
	.when('/', {
		templateUrl: 'home.html'
	})
	.when('/survey', {
		templateUrl: 'survey.html'
	})
	.when('/results', {
		templateUrl: 'results.html'
	})
	.when('/summary', {
		templateUrl: 'summary.html'
	});

	ChartJsProvider.setOptions({
      colours: ['#2ecc71', '#3d9cdd', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c'],
      responsive: false
    });

});

app.config(['localStorageServiceProvider', function(localStorageServiceProvider){
	localStorageServiceProvider.setPrefix('ls');
}]);


app.controller('csController',function($scope, localStorageService){

//***initiliaze data and others

	$scope.date = new Date();

	var profilesInStorage = localStorageService.get('profiles');
	$scope.profiles = profilesInStorage || [];
	$scope.$watch('profiles', function(){
		localStorageService.set('profiles', $scope.profiles);
	}, true);

	$scope.summaryPage = 'table';
	$scope.surveySaved = 'false';
	$scope.showSubmit = 'false';
/*
	$scope.profiles = {
		'date'	: 	'yyyy-mm-dd',
		'name'	: 	'Sam Jones',
		'email'	: 	'sjones@mail.com',
		'gender': 	'male',
		'color'	: 	'y#2ecc71' 
	}
*/
//***END initiliaze data and others

//***simplified color picker
	$scope.colors = [
		'#2ecc71',
        '#3d9cdd',
        '#9b59b6',
        '#f1c40f',
        '#e67e22',
        '#e74c3c'
	];


	$colorEquivalence = [
		'green',
        'blue',
        'purple',
        'yellow',
        'orange',
        'red'
	];

	$scope.colorSelect = function($color){

		for(var i = 0; i < $scope.colors.length; i++){
			if($color == $scope.colors[i]){
				$scope.colorSelected = $colorEquivalence[i];
			}
		}
		
		$scope.showColors = !$scope.showColors;
		$scope.showSubmit = 'true';
	}

	$scope.showColors = false;
	$scope.showPicker = function() {
		$scope.showColors = !$scope.showColors;
	}

//***END simplified color picker

//***save data from form
	$scope.saveData = function ($name, $email, $gender){
		$scope.profiles.push({
			'date'	: $scope.date, 
			'name'	: $name,
			'email'	: $email,
			'gender': $gender,
			'color'	: $scope.colorSelected
		});

		$scope.surveySaved = 'true';

	}
//***END save data from form

//***toggle saved
	$scope.toggleSaved = function(){
		$scope.surveySaved = 'false';
		$scope.showSubmit = 'false';
		$scope.colorSelected = '';
	}
//***END toggle saved

//***show summary
	$scope.updateSummary = function(){
	
	$scope.colorSummary = [0, 0, 0, 0, 0, 0];

	for (var i = 0; i < $scope.profiles.length; i++){
		switch($scope.profiles[i].color){
			case 'green':
				$scope.colorSummary[0]++;
				break;
			case 'blue':
				$scope.colorSummary[1]++;
				break;
			case 'purple':
				$scope.colorSummary[2]++;
				break;
			case 'yellow':
				$scope.colorSummary[3]++;
				break;
			case 'orange':
				$scope.colorSummary[4]++;
				break;
			case 'red':
				$scope.colorSummary[5]++;
				break;
		}

	}

	//***table summary
	$scope.colorOccurrence = [];

	for(var i = 0; i < $scope.colorSummary.length; i++){
		$scope.colorOccurrence.push({
			'color' : $colorEquivalence[i],
			'occur' : $scope.colorSummary[i]
		});
	}
	//***END table summary

	//***chart summary 
		$scope.labels = ["Green", "Blue", "Purple", "Yellow", "Orange", "Red"];
  		
	//		for(var i = 0; i < $scope.labels.length; i++) { $scope.data.push($scope.colorSummary[i]); }
	//		^for some reason data[] is throwing an error when used with push()
  		$scope.data = [
  			$scope.colorSummary[0],
  			$scope.colorSummary[1],
  			$scope.colorSummary[2],
  			$scope.colorSummary[3],
  			$scope.colorSummary[4],
  			$scope.colorSummary[5]
  		];
		//***END chart summary

	}
//***END show summary


//***show more data in lightbox
	$scope.showMore = function ($profileMore){
		$scope.profileLightbox = $profileMore;
	}
//***END show more data in lightbox
});



//***Javascript for pop-up/lightbox (for demo purposes)
function showLightbox(){
	document.getElementById('light').style.display='block';
	document.getElementById('fade').style.display='block';
}

function closeLightbox(){
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
}