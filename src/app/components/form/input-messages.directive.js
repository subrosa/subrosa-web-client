/**
 * @ngdoc directive
 * @name subrosa.components.form:inputMessages
 *
 * @description
 *   Wrapper around ng-messages that displays common messages related to inputs.
 *
 * @example
 *  <p data-input-messages="someForm.someField"></p> will display the ng-messages for
 *  the input someForm.someField.
 */
angular.module('subrosa.components.form').directive('inputMessages', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: '/app/components/form/views/input-messages.html',
        scope: {
            field: '=inputMessages',
            fieldName: '@inputMessages'
        }
    };
});
