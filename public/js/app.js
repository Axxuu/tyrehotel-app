angular.module('app', ['ngRoute','ngAnimate','ui.bootstrap','appControllers','appServices'])

.config(($routeProvider, $locationProvider) => {

    $routeProvider
        .when('/tyres', {
            templateUrl: 'templates/view-tyres.html',
            controller: 'listviewCtrl',
            resolve: {
                auth: ($q, loginFactory) => {
                    var userInfo = loginFactory.getUserInfo();

                    if(userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({authenticated: false});
                    }
                }
            }
        })
        .when('/login', {
            templateUrl: 'templates/view-login.html',
            controller: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        }); //$routeProvider

        $locationProvider.html5Mode({enabled: false, requireBase: false});

}) //config

.run(($rootScope, $location) => {

    $rootScope.$on("$routeChangeError", (event,current,previous,eventObj) => {

        //if user not logged in, show login view
        if(eventObj.authenticated === false) {
            $location.path("/login");
        }

    }); //$rootScope.$on(...)

}); //run
