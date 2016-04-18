var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/cats-content', {
            templateUrl: 'cats-content.html'
        })
        .when('/dogs-content', {
            templateUrl: 'dogs-content.html'
        })
        .when('/horses-content', {
            templateUrl: 'horses-content.html'
        })
        .when('/contacts-content', {
            templateUrl: 'contacts-content.html'
        })
});

app.run(function($rootScope) {
    document.addEventListener("keyup", function(e) {
        if (e.keyCode === 27)
            $rootScope.$broadcast("escapePressed", e.target);
    });

    document.addEventListener("click", function(e) {
        $rootScope.$broadcast("documentClicked", e.target);
    });
});

app.controller("modalMenu", function($scope, $rootScope) {
    $scope.leftVisible = false;

    $scope.close = function() {
        $scope.leftVisible = false;
    };

    $scope.showLeft = function(e) {
        $scope.leftVisible = true;
        e.stopPropagation();
    };

    $rootScope.$on("documentClicked", _close);
    $rootScope.$on("escapePressed", _close);

    function _close() {
        $scope.$apply(function() {
            $scope.close();
        });
    }
});

app.directive("menu", function() {
    return {
        restrict: "E",
        template: "<div ng-class='{ show: visible, left: alignment === \"left\" }' ng-transclude></div>",
        transclude: true,
        scope: {
            visible: "=",
            alignment: "@"
        }
    };
});

app.directive("menuItem", function() {
    return {
        restrict: "E",
        template: "<div ng-click='navigate()' ng-transclude></div>",
        transclude: true,
        scope: {
            hash: "@"
        },
        link: function($scope) {
            $scope.navigate = function() {
                window.location.hash = $scope.hash;
            }
        }
    }
});

app.controller("ContentController", function($location) {
    this.tab = $location.path('/cats-content');

    this.thisPath = function() {
        return $location.path();
    };
});

app.directive('mailDirective', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (/[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i.test(value)) {
                    mCtrl.$setValidity('myEmail', true);
                } else {
                    mCtrl.$setValidity('myEmail', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

app.directive('messageDirective', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.length <= 10 ) {
                    mCtrl.$setValidity('myMessage', false);
                } else {
                    mCtrl.$setValidity('myMessage', true);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});


app.controller('submitController',  function() {
    this.formInfo = {};
    this.showDate = function() {
        console.log(this.formInfo);
        alert('SUCCESSFUL SENDING: \n\n' + "My Email: " + this.formInfo.myEmail+"\nMy message: " + this.formInfo.myMessage)
    };
});

app.controller('ModalController', function($window) {
    this.redirection = function() {
        $window.open("http://www.w3schools.com", '_blank');
    };
    this.message = function() {
        var message = "Help isn't needed.";
        console.log(message);
    }

});

















