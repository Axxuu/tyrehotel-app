angular.module('appServices', [])

.factory('dataFactory', function ($http, $q, loginFactory) {
    var cachedData = [];

    //Cache data to minimize datatransfer
    function getData(tbl){

        var deferred = $q.defer();
        var userAuth = loginFactory.getUserInfo();

        if(cachedData[tbl]) {
            deferred.resolve(cachedData[tbl]);
        } else {
            $http.get(`http://localhost:3000/api/data/${tbl}?token=${userAuth.token}`)
                .then( (response) => {
                    cachedData[tbl] = response.data;
                    deferred.resolve(response.data);
                }, (err) => {
                    deferred.reject(err);
                    loginFactory.logout();
                });
        }

        return deferred.promise;

    } //getData

    function insertData(data){

        var deferred = $q.defer();

        data.koko = data.leveys+"/"+data.profiili+"R"+data.tuuma;
        data.muokkaaja = loginFactory.getUserInfo().name;

        delete data.leveys;
        delete data.profiili;
        delete data.tuuma;

        var userAuth = loginFactory.getUserInfo();
        var tbl;

        if(data.hylly && !data.sijainti.includes('Hotelli')) { data.hylly = ""; }
        if(data.pultit && !data.tyyppi.includes('vanteilla')) { data.pultit = ""; }

        if(data.reknro && data.reknro !== "") { tbl = 'autot'; } else { tbl = 'vapaat'; }

        $http.post(`http://localhost:3000/api/data/${tbl}?token=${userAuth.token}`, { data: data })
            .then( (response) => {
                if(cachedData[tbl]) {
                  data.id = response.data.insertId;
                  cachedData[tbl].unshift(data);
                }
                deferred.resolve(response);
            }, (err) => {
                deferred.reject(err);
            });

        return deferred.promise;

    } //insertData

    function editData(data, tbl){

        var deferred = $q.defer();
        var userAuth = loginFactory.getUserInfo();

        data.muokkaaja = userAuth.name;

        if(data.hylly && !data.sijainti.includes('Hotelli')) { data.hylly = ""; }
        if(data.pultit && !data.tyyppi.includes('vanteilla')) { data.pultit = ""; }

        $http.post(`http://localhost:3000/api/data/${tbl}/${data.id}?token=${userAuth.token}`, { data: data })
            .then( (response) => {
                for(var i of cachedData[tbl]) {
                  if(i.id === data.id) {
                      angular.merge(cachedData[tbl][i], data);
                      break;
                  }
                }
                deferred.resolve(response.data);
            }, (err) => {
                deferred.reject(err);
            });

        return deferred.promise;

    } //editData

    function moveData(data, toTbl, fromTbl){

        var deferred = $q.defer();
        var userAuth = loginFactory.getUserInfo();

        data.muokkaaja = userAuth.name;

        var id = data.id;
        delete data.id;

        $http.post(`http://localhost:3000/api/move/${id}/${toTbl}/${fromTbl}?token=${userAuth.token}`, { data: data })
            .then( (response) => {
                for(var i of cachedData[fromTbl]) {
                    if(i.id === id) {
                        cachedData[fromTbl].splice(i, 1);
                        break;
                    }
                }

                if(cachedData[toTbl]) {
                  data.id = response.data.insertId;
                  cachedData[toTbl].unshift(data);
                }

                deferred.resolve(response);
            }, (err) => {
                deferred.reject(err);
            });

        return deferred.promise;

    } //moveData

    function deleteData(data, tbl){

        var deferred = $q.defer();
        var userAuth = loginFactory.getUserInfo();

        $http.delete(`http://localhost:3000/api/data/${tbl}/${data.id}?token=${userAuth.token}`)
            .then( (response) => {
                for(var i of cachedData[tbl]) {
                    if(i.id === data.id) {
                        cachedData[tbl].splice(i, 1);
                        break;
                    }
                }
                deferred.resolve(response.data);
            }, (err) => {
                deferred.reject(err);
            });

        return deferred.promise;

    } //deleteData

    function checkReg(data) {

      var deferred = $q.defer();
      var userAuth = loginFactory.getUserInfo();

      $http.get(`http://localhost:3000/api/find/autot/${data}?token=${userAuth.token}`)
          .then( (response) => {
              deferred.resolve(response.data[0]);
          }, (err) => {
              deferred.reject(err);
          });

      return deferred.promise;

    } //checkReg

    //Returns needed function
    return {
        all: getData,
        insert: insertData,
        edit: editData,
        delete: deleteData,
        move: moveData,
        check: checkReg
    };
})

.factory('loginFactory', function ($http, $q, $window) {
    var userInfo;

    function login(data) { //check if user and password ok

        var deferred = $q.defer();
        $http.post("http://localhost:3000/api/login", data)
          .then( (result) => {
            userInfo = {
                user: result.data.tunnus,
                name: result.data.nimi,
                token: result.data.token
            };
            $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
            deferred.resolve(userInfo);
        }, (err) => {
            deferred.reject(err);
        });

        return deferred.promise;

    } //login

    function logout() { //logs user out (destroys userinfo variable and sessionStorage)
        userInfo = null;
        $window.sessionStorage["userInfo"] = null;
    } //logout

    function getUserInfo() { //returns userInfo
        return userInfo;
    } //getUserInfo

    function init() { //check userInfo is in sessionStorage
        if($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    } //init

    init();

    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo
    };

})

.factory('functionFactory', function () {

    return {
      listRange: (min, max, step = 1) => {
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }

            return input;
      } //range
    }

});
