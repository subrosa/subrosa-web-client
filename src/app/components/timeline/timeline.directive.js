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
 * @name subrosa.components:timeline:timeline
 *
 * @requires $locale
 * @requires linksTimeline
 * @requires timelineCache
 *
 * @description
 *   Provides a timeline that incorporates Almende's Timeline
 *   (http://almende.github.io/chap-links-library/timeline.html)
 *
 *   TODO PR this to the existing project
 */
angular.module('subrosa.components.timeline').directive('timeline', function ($locale, linksTimeline, timelineCache) {

        return {
            restrict: 'A',
            scope: {
                id: '@timeline',
                model: '=timelineData',
                options: '=timelineOptions',
                onAdd: '&timelineOnAdd',
                onChange: '&timelineOnChange',
                onDelete: '&timelineOnDelete',
                onEdit: '&timelineOnEdit',
                onSelect: '&timelineOnSelect'
            },
            link: function ($scope, $element) {
                var getSelection, timeline = new linksTimeline.Timeline($element[0]);

                getSelection = function () {
                    var sel = timeline.getSelection();
                    if (sel[0]) {
                        sel = $scope.model[sel[0].row];
                    }
                    return sel;
                };

                $scope.options = {
                    locale: $locale.id.split('-')[0],
                    showCurrentTime: true,
                    showCustomTime: true,
                    showNavigation: true
                };

                linksTimeline.events.addListener(timeline, 'add', function () {
                    $scope.onAdd({selection: getSelection()});
                });

                linksTimeline.events.addListener(timeline, 'changed', function () {
                    $scope.onChange({selection: getSelection()});
                });

                linksTimeline.events.addListener(timeline, 'delete', function () {
                    $scope.onDelete({selection: getSelection()});
                });

                linksTimeline.events.addListener(timeline, 'edit', function () {
                    $scope.onEdit({selection: getSelection()});
                });
                
                linksTimeline.events.addListener(timeline, 'select', function () {
                    $scope.onSelect({selection: getSelection()});
                });

                $scope.$watch('model', function (newVal) {
                    timeline.setData(newVal);
                    timeline.setVisibleChartRangeAuto();
                });

                $scope.$watch('options', function () {
                    timeline.draw($scope.model, $scope.options);
                });

                timelineCache.put($scope.id, timeline);
            }
        };
    });