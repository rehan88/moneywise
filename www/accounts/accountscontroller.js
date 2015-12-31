(function () {
    'use strict'

    angular.module('app.accounts').controller('accountscontroller', accountscontroller);
    accountscontroller.$inject = ["$scope", "$ionicModal", "$location", "$cordovaSQLite", "Accounts", "Expenses", "ionicToast"];

    function accountscontroller($scope, $ionicModal, $location, $cordovaSQLite, Accounts, Expenses, ionicToast) {

        $scope.accounts = [];
        $scope.accountToDelete = {};

        $scope.$on('$ionicView.enter', function () {
            $scope.populateAllAccounts();
        });
        
        $scope.accountFormData = {
            "accountname": "",
            "balance": ""
        };
        
        $ionicModal.fromTemplateUrl('/accounts/deletemodal/delete-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        
        $scope.onSwipeLeft = function (account) {
            $location.url("app/expenses/" + account.id);
        };
        
        $scope.populateAllAccounts = function () {
            Accounts.all().then(function (accounts) {                
                $scope.accounts = accounts;                 
                if(accounts.length === 0){
                   $scope.noAccounts = true;
                }               
            });
        };
        
        $scope.showAddNewAccount = function () {
            $scope.noAccounts = false;
            $scope.addAccount = true;
            $scope.hideAddNewAccountBtn = true;
            $scope.focusInputAccountName = true;
        };
        
        $scope.showSubmitToast = function (accountName, toastType) {
            if (toastType === "success") {
                ionicToast.show("The account " + accountName + ' account has been added.', 'bottom', false, 2500);
            }
            if (toastType === "remove") {
                ionicToast.show("The account " + accountName + ' has been removed.', 'bottom', false, 2500);
            }
        };
        
        $scope.showRequiredToast = function (field) {
            ionicToast.show('Please enter' + field, 'bottom', false, 2500);
        };
        
        $scope.hideNewAccount = function () {
            $scope.focusInputAccountName = false;
            $scope.addAccount = false;
            $scope.hideAddNewAccountBtn = false;
        };
                
        $scope.setAccountToDelete = function (account) {
            $scope.accountToDelete = account;
        };
        
        $scope.deleteAccount = function () {
            Accounts.remove($scope.accountToDelete);
            Expenses.removeForAccount($scope.accountToDelete);
            $scope.populateAllAccounts();
            $scope.showSubmitToast($scope.accountToDelete.accountname, "remove");
        };
        
        $scope.isEmpty = function () {
            if ($scope.accountFormData.accountname === undefined || $scope.accountFormData.accountname === "") {
                $scope.showRequiredToast(" an account name");
                return true;
            }
            if ($scope.accountFormData.balance === undefined || $scope.accountFormData.balance === "" || $scope.accountFormData.balance === null) {
                $scope.showRequiredToast(" a balance");
                return true;
            }
        };
        
        $scope.submitNewAccount = function () {
            if ($scope.isEmpty()) {
                return false;
            };
            Accounts.add($scope.accountFormData);
            $scope.populateAllAccounts();
            $scope.addAccount = false;
            $scope.hideAddNewAccountBtn = false;
            $scope.showSubmitToast($scope.accountFormData.accountname, "success");
            $scope.accountFormData.accountname = '';
            $scope.accountFormData.balance = '';
        };
    }
})();