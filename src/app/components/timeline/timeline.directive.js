/**
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *  HTTP Auth Interceptor Module for AngularJS
 *  Copyright (c) 2013 Gabriele Destefanis
 *  License: MIT
 *
 *  https://github.com/destegabry/angular-timeline
 */

/**
 * @ngdoc directive
 * @name subrosa.components.timeline:timeline
 *
 * @description
 *   Provides a timeline that incorporates Almende's Timeline
 *   (http://almende.github.io/chap-links-library/timeline.html)
 *
 *   TODO PR this to the existing project
 */
angular.module('subrosa.components.timeline').directive('timeline', function (links) {

        return {
            restrict: 'A',
            scope: {
                model: '=timeline',
                options: '=timelineOptions',
                onAdd: '&timelineOnAdd',
                onChange: '&timelineOnChange',
                onDelete: '&timelineOnDelete',
                onEdit: '&timelineOnEdit',
                onSelect: '&timelineOnSelect',
                selection: '=timelineSelection'

            },
            link: function ($scope, $element) {
                var getSelection, timeline = new links.Timeline($element[0]);

                getSelection = function () {
                    var sel = timeline.getSelection();
                    if (sel[0]) {
                        sel = $scope.model[sel[0].row];
                    }
                    return sel;
                };

                links.events.addListener(timeline, 'add', function () {
                    $scope.onAdd({selection: getSelection()});
                });

                links.events.addListener(timeline, 'change', function () {
                    $scope.onChange({selection: getSelection()});
                });

                links.events.addListener(timeline, 'delete', function () {
                    $scope.onDelete({selection: getSelection()});
                });

                links.events.addListener(timeline, 'edit', function () {
                    $scope.onEdit({selection: getSelection()});
                });
                
                links.events.addListener(timeline, 'select', function () {
                    $scope.onSelect({selection: getSelection()});
                });

                $scope.$watch('model', function (newVal) {
                    timeline.setData(newVal);
                    timeline.setVisibleChartRangeAuto();
                });

                $scope.$watch('options', function () {
                    timeline.draw($scope.model, $scope.options);
                });

                $scope.$watch('selection', function (newVal, oldVal) {
                    if (!angular.equals(newVal, oldVal)) {
                        for (var i = $scope.model.length - 1; i >= 0; i = i - 1) {
                            if (angular.equals($scope.model[i], newVal)) {
                                timeline.setSelection([{
                                    row: i
                                }]);
                                break;
                            }
                        }
                    }
                });
            }
        };
    });