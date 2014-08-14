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
                allowEdit: '=timelineAllowEdit',
                options: '=timelineOptions',
                onAdd: '&timelineOnAdd',
                onChange: '&timelineOnChange',
                onDelete: '&timelineOnDelete',
                onEdit: '&timelineOnEdit',
                onSelect: '&timelineOnSelect'
            },
            link: function ($scope, $element) {
                var timeline = new linksTimeline.Timeline($element[0]);

                linksTimeline.events.addListener(timeline, 'add', function () {
                    $scope.onAdd({selection: timeline.getModel($scope.model)});
                });

                linksTimeline.events.addListener(timeline, 'changed', function () {
                    $scope.onChange({selection: timeline.getModel($scope.model)});
                });

                linksTimeline.events.addListener(timeline, 'delete', function () {
                    $scope.onDelete({selection: timeline.getModel($scope.model)});
                });

                linksTimeline.events.addListener(timeline, 'edit', function () {
                    $scope.onEdit({selection: timeline.getModel($scope.model)});
                });
                
                linksTimeline.events.addListener(timeline, 'select', function () {
                    $scope.onSelect({selection: timeline.getModel($scope.model)});
                });

                $scope.$watch('model', function (newVal) {
                    timeline.setData(newVal);
                    timeline.setVisibleChartRangeAuto();
                });

                $scope.$watch('options', function (options) {
                    if (options) {
                        options.editable = $scope.allowEdit;
                        options.locale = $locale.id.split('-')[0];
                        options.showCurrentTime = true;
                        options.showNavigation = true;

                        timeline.draw($scope.model, options);
                    }
                });

                timelineCache.put($scope.id, timeline);
            }
        };
    });