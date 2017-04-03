
angular.module('quoteMemoryApp', ['ngRoute'])
    .config(function($routeProvider) {
    	$routeProvider
    	    .when('/',
    		  {
    		      templateUrl: 'static/welcome.html'
    		  })
	    .when('/quiz',
		  {
		      templateUrl: 'static/quiz.html'
		  })
    	    .when('/addQuote',
    		  {
    		      templateUrl: 'static/addQuote.html'
    		  })
    	    .when('/login',
    		  {
    		      templateUrl: 'static/login.html',
		      controller: 'LoginController'
    		  })
    	    .when('/signup',
    		  {
    		      templateUrl: 'static/signup.html',
		      controller: 'SignUpController'
    		  })
    	    .otherwise(
    		{
    		    templateUrl: 'static/logout.html',
		    controller: 'LogoutController'
    		})
    })
	    
    .controller('AddQuoteController', function($scope, $http) {
	$scope.identifier = 'Ioan 3:16';
	$scope.text = 'Versetul cheie al bibliei.';

	$scope.addQuote = function() {
	    return $http({
	    	method: 'POST',
	    	url: '/api/quote',
	    	headers: { 'Content-Type': 'application/json; charset=UTF-8' },
	    	data: {
		    identifier: $scope.identifier,
	    	    text: $scope.text
	    	}
	    });
	}
    })

    .controller('ReadQuoteController', function($scope, $http) {
	$scope.quote = null;

	$http.get('/api/quote')
	    .then(function(response) {
		$scope.quote = response.data;
	    });
    })

    .controller('LoginController', function($scope, $http) {
	$scope.email = '';
	$scope.password = '';

	$scope.errorMessage = ''
	$scope.successMessage = ''

	$scope.login = function() {
	    $http({
		method: 'POST',
		url: '/api/login',
	    	headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		data: {
		    email: $scope.email,
		    password: $scope.password
		}
	    })
		.then(function(response) {
		    console.log(response.status);
		    $scope.errorMessage = response.data;
		    $scope.successMessage = '';
		});
	}
    })

    .controller('LogoutController', function($scope, $http) {
	$scope.errorMessage = ''
	$scope.successMessage = ''

	$scope.logout = function() {
	    $http({
		method: 'POST',
		url: '/api/logout',
	    	headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		data: {}
	    })
		.then(function(response) {
		    console.log(response.status);
		    $scope.errorMessage = response.data;
		    $scope.successMessage = '';
		});
	}
    })

    .controller('SignUpController', function($scope, $http) {
	$scope.email = 'lawleagle@gmail.com';
	$scope.password = 'manu';
	$scope.repeatedPassword = 'manu'

	$scope.errorMessage = ''
	$scope.successMessage = ''

	$scope.signup = function() {
	    if ($scope.email === '') {
		$scope.errorMessage = "Enter an email!";
		return;
	    }
	    if ($scope.password === '') {
		$scope.errorMessage = "Enter a password!";
		return;
	    }
	    if ($scope.password !== $scope.repeatedPassword) {
		$scope.errorMessage = "Passwords do not match.";
		return;
	    }
	    $http({
		method: 'POST',
		url: '/api/signup',
	    	headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		data: {
		    email: $scope.email,
		    password: $scope.password
		}
	    })
		.then(function(response) {
		    console.log(response.status)
		    $scope.errorMessage = response.data;
		    $scope.successMessage = '';
		});
	}
	$scope.resendActivation = function() {
	    if ($scope.email === '') {
		$scope.errorMessage = "Enter an email!";
		return;
	    }
	    $http({
		method: 'POST',
		url: '/api/resend_activation',
		headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		data: {
		    email: $scope.email
		}
	    })
		.then(function(response) {
		    console.log(response.status)
		    $scope.errorMessage = response.data;
		    $scope.sucessMessage = ''
		});
	}
    })
