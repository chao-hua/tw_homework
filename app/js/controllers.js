var agentsCtrls = angular.module('agentsCtrls', []);

agentsCtrls.controller('AgentsListCtrl', ['$scope', '$timeout', 'Agents',
    function($scope, $timeout, Agents) {
        $scope.agents = Agents.query();
        $scope.agents.history = ['bjstdmngbgr02/Acceptance_test',
            'bjstdmngbgr03/Acceptance_test',
            'bjstdmngbgr04/Acceptance_test',
            'bjstdmngbgr05/Acceptance_test'
        ];

        $timeout(function() {
            $scope.agents.count = $scope.agents.length;

            var typeSummary = new Object();
            for (var i = 0; i < $scope.agents.length; i++) {
                var type = $scope.agents[i].type;
                if (!(type in typeSummary)) {
                    typeSummary[type] = 0;
                }
            }

            for (type in typeSummary) {
                var typeCount = 0;
                for (var j = 0; j < $scope.agents.length; j++) {
                    if (type == $scope.agents[j].type) {
                        typeCount++;
                    }
                }
                typeSummary[type] = typeCount;
            }
            $scope.agents.typeSummary = typeSummary;
        }, 500);

        $scope.removeResources = function(agentId, resource) {
            for (var i = 0; i < $scope.agents.length; i++) {
                if (agentId == $scope.agents[i].id) {
                    for (var j = 0; j < $scope.agents[i].resources.length; j++) {
                        if (resource == $scope.agents[i].resources[j]) {
                            $scope.agents[i].resources.splice(j, 1);
                        }
                    }
                }
            }
        };

        $scope.addResources = function(agentId) {
            //based on the button position show the prompt
            var addResourcesA = $("#add-resources-" + agentId);
            var yPos, xPos, skinClassName;
            xPos = addResourcesA.offset().left + addResourcesA.outerWidth() / 2 - 120;
            if (($(window).height() - addResourcesA.offset().top) < 200) {
                yPos = addResourcesA.offset().top - 120;
                skinClassName = 'down-arrow';
            } else {
                yPos = addResourcesA.offset().top + addResourcesA.outerHeight() + 20;
                skinClassName = 'up-arrow';
            }
            new $.Popup().prompt({
                content: '(separete multiple resources name with commas)',
                x: xPos,
                y: yPos,
                skinClassName: skinClassName,
                handler4ConfirmBtn: function(inputValue) {
                    for (var i = 0; i < $scope.agents.length; i++) {
                        if (agentId == $scope.agents[i].id) {
                            var newResources = new Array();
                            newResources = inputValue.split(",");
                            for (var j = 0; j < newResources.length; j++) {
                                if ($.trim(newResources[j])) {
                                    $scope.agents[i].resources.push(newResources[j]);
                                    $scope.$apply();
                                }
                            }
                        }
                    }
                }
            }).on('confirm', function() {
                $scope.saveHistory(agentId);
            });
        };


        $scope.saveHistory = function(agentId) {
            var history = '';
            for (var i = 0; i < $scope.agents.length; i++) {
                if (agentId == $scope.agents[i].id) {
                    history = $scope.agents[i].name.split('.')[0];
                }
            }
            history += '/Acceptance_test';
            $scope.agents.history.unshift(history);
            $scope.$apply();
        };
    }
]);
