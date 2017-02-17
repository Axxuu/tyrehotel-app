angular.module('appControllers', [])

//CONTROLLERS
.controller('loginCtrl', function($rootScope, $scope, $location, loginFactory) {
    //CONTROLLER FOR LOGIN VIEW

    $scope.cred = {};
    $rootScope.authed = false;

    $scope.submitLogin = () => { //submit login
        loginFactory.login($scope.cred)
            .then((response) => {
                $location.path("/tyres");
            }, (err) => {
                alert("Virhe: "+err.status+" "+err.statusText);
            });
    };

}) //loginCtrl

.controller('listviewCtrl', function($rootScope, $scope, $timeout, $location, $uibModal, dataFactory, loginFactory, auth) {
    //CONTROLLER FOR LIST VIEW

    $scope.userInfo = auth; //scope for user data
    $rootScope.authed = true;
    $rootScope.modalOpen = false;

    $scope.fetchData = (type) => { //fetch data of selected tab

        dataFactory.all(type)
            .then((response) => {
                $scope.dataa = response;
            }, (err) => {
                if(err.status === 401) {
                    $location.path("/login");
                    loginFactory.logout();
                } else {
                    alert("Virhe: "+err.status+" "+err.statusText);
                }
            });

    }; //$scope.fetchData

    $rootScope.$watch('searchInput', () => { //watch searchbar

        var timeout;
        $timeout.cancel(timeout); //cancel existing timeout
        timeout = $timeout( () => {   //Set timeout
            if($rootScope.searchInput==false) {
              $scope.search=""; //if search closed -> empty search filter
            };
        },500);

    }); //$rootScope.$watch

    $scope.openModal = (data, tbl) => { //open modal for viewing or editing data

        $rootScope.modalOpen = true; //for printing only modal window

        var editModal = $uibModal.open({
            animation: true,
            templateUrl: 'templates/modal-viewData.html',
            controller: 'viewDataCtrl',
            resolve: {
                modalData: () => {
                    return {
                        data: data, // data to modal
                        tbl: tbl  //which table is used
                    };
                }
            }
        });

    }; //$scope.openModal

    $rootScope.addTyres = (id) => {  //open modal for adding data

        var addModal = $uibModal.open({
            animation: true,
            templateUrl: 'templates/modal-addData.html',
            controller: 'addDataCtrl'
        });

    }; //$rootScope.addTyres

    $rootScope.logout = () => { //logs user out

        $scope.userInfo = null;
        $location.path("/login");
        loginFactory.logout();

    }; //$rootScope.logout

}) //listviewCtrl

.controller('viewDataCtrl', function($rootScope, $scope, $uibModalInstance, modalData, $window, dataFactory, functionFactory) {
    //CONTROLLER FOR VIEW / EDIT MODAL!
    $scope.form = {};

    $scope.tiedot = angular.copy(modalData.data); //create copy of object, so existing doesnt change before save

    $scope.range = (min, max, step) => { return functionFactory.listRange(min, max, step); }; //generate lists for tyresizes

    var tuuma = $scope.tiedot.koko.split("R");
    var koko = tuuma[0].split("/");
    $scope.obj = {leveys: koko[0], profiili: koko[1], tuuma: tuuma[1]};

    $scope.saveData = () => { //updates data on database

        $scope.tiedot.koko = $scope.obj.leveys+"/"+$scope.obj.profiili+"R"+$scope.obj.tuuma;

        if((!modalData.data.reknro && $scope.tiedot.reknro) || (modalData.data.reknro != "" && $scope.tiedot.reknro == "")) { //if added or removed reg, move to another database

            var toTbl = !modalData.data.reknro && $scope.tiedot.reknro ? "autot" : "vapaat";

            dataFactory.move($scope.tiedot, toTbl, modalData.tbl)
                .then( (succ) => {
                    alert("Siirretty");
                    $uibModalInstance.close();
                }, (err) => {
                    alert("Epäonnistui");
                    console.log(err);
                });

        } else { //else save changes

            dataFactory.edit($scope.tiedot, modalData.tbl)
                .then( (succ) => {
                    alert("Tallennettu");
                    $scope.edit = false;
                }, (err) => {
                    alert("Epäonnistui");
                    console.log(err);
                });

        }

    }; //$scope.saveData

    $scope.delData = () => {  //deletes data from database

      var confirm = $window.confirm("Poistetaanko varmasti?");
      if(confirm) {
        dataFactory.delete($scope.tiedot, modalData.tbl)
            .then( (succ) => {
                alert("Poistettu");
                $uibModalInstance.close();
            }, (err) => {
                alert("Epäonnistui");
                console.log(err);
            });
      }
    }; //$scope.delData

    $scope.moveData = () => { //transfers data from another database

      var confirm = $window.confirm("Siirretäänkö luovutettuihin?");

      if(confirm) {
        dataFactory.move($scope.tiedot, "luovutetut" , modalData.tbl)
            .then( (succ) => {
                alert("Siirretty");
                $uibModalInstance.close();
            }, (err) => {
                alert("Epäonnistui");
                console.log(err);
            });
      }

    }; //$scope.moveData

    $scope.cancel = () => { //closes modal
        $uibModalInstance.dismiss('cancel');
    };

    $scope.editData = () => { //changes modal to edit view
        $scope.edit = true;
    };

    $scope.$on('modal.closing', (event, reason, closed) => {
        $rootScope.modalOpen = false; //sets listview visible for printin while closing modal
    });

}) //viewTyresCtrl

.controller('addDataCtrl', function($scope, $uibModalInstance, dataFactory, functionFactory) {
    $scope.obj = {};

    $scope.range = (min, max, step) => { return functionFactory.listRange(min, max, step); };

    $scope.regExist = 0;
    $scope.$watch('obj.reknro', () => { $scope.regExist = 0; });

    $scope.checkReg = () => { //check if given registernumber exists in table autot

            dataFactory.check($scope.obj.reknro)
                .then( (data) => {
                  if(data.count == 1){
                      $scope.regExist = 1; //if exists
                  } else {
                      $scope.regExist = 2; //doesnt exist
                  }
                }, (err) => {
                    console.log(err);
                });


    }; //$scope.checkReg

    $scope.insertData = () => {

        dataFactory.insert($scope.obj)
            .then( (response) => {
                alert("Onnistui");
                $uibModalInstance.close();
            }, (err) => {
                alert("Epäonnistui");
                console.log(err);
            });

    }; //$scope.insertData

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };

}); //addTyresCtrl
