/**
 * @ngdoc directive
 * @name subrosa.components.form:formGroup
 *
 * @description
 *   Select a form field template based on field type.
 */
angular.module('subrosa.components.form').directive('formGroup', function () {
    return {
        restrict: 'AE',
        require: '?^asSortableItemHandle',
        templateUrl: '/app/components/form/fields/views/form-group.html',
        scope: {
            field: '=formGroup',
            model: '='
        },
        link: function (scope, element, attributes, sortableItemHandle) {
            scope.templateUrl = '/app/components/form/fields/views/%s-field.html'.replace('%s', scope.field.type);

            if (sortableItemHandle) {
                scope.type = 'handle';
            }

            scope.$watch('field.value', function (field) {
                if (field) {
                    scope.model[field.fieldId] = field.value;
                }
            });

        }
    };
});
