/**
 * @ngdoc directive
 * @name subrosa.forms:inputMessages
 *
 * @description
 *   Wrapper around ng-messages that displays common messages related to inputs.
 *
 * @example
 *  <p data-input-messages="someForm.someField"></p> will display the ng-messages for
 *  the input someForm.someField.
 */
angular.module('subrosa.forms').directive('inputMessages', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: '/app/forms/views/input-messages.html',
        scope: {
            field: '=inputMessages',
            fieldName: '@inputMessages'
        }
    };
});
