var agentsServices = angular.module('agentsServices', ['ngResource']);

agentsServices.factory('Agents', ['$resource',
    function($resource) {
        return $resource('data/agents.json', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }
]);
