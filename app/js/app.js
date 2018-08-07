var cruiseApp = angular.module('cruiseApp', [
    'ui.router',
    'agentsServices',
    'agentsCtrls'
]);

cruiseApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

cruiseApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'header@index': {
                    templateUrl: 'tpls/header.html'
                },
                'main@index': {
                    templateUrl: 'tpls/tabs.html'
                },
                'footer@index': {
                    templateUrl: 'tpls/footer.html'
                }
            }
        });
});
