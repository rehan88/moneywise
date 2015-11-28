var db = null;
  
angular.module('BudgetApp', ['ionic',
                             'app.routeconfig',
                             'ionic-material',
                             'ngCordova', 
                             'app.services', 
                             'starter.controllers', 
                             'app.accounts', 
                             'app.expenses', 
                             'app.directdebits', 
                             'app.income', 
                             'ionic-toast'])
    
.run(function ($ionicPlatform, $cordovaSQLite) { $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        };
        if (window.StatusBar) {
          StatusBar.styleDefault();
        };        
        if(window.cordova) {        
          db = $cordovaSQLite.openDB("MoneyWise.db");
        } 
        else 
        {          
          db = window.openDatabase("MoneyWise.db", "1.0", "Money Wise", -1);
        }    
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS accounts (id integer primary key, accountname text, balance text)");
        
      });
 })    