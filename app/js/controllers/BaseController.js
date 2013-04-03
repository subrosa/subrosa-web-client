/*global angular */
'use strict';

/*
 * Base controller for common $scope functions.
 */
angular.module('subrosa').controller('BaseController', function ($rootScope) {
    /*
     * Provide a method to set the title of the page.
     * @param title the text to set.
     */
    $rootScope.setTitle = function (title) {
        $rootScope.title = title;
    };
});