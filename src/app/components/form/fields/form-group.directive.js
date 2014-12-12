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
        require: ['^form', '?^asSortableItemHandle'],
        templateUrl: '/app/components/form/fields/views/form-group.html',
        scope: {
            field: '=formGroup',
            model: '='
        },
        link: function (scope, element, attributes, requires) {
            var ngForm = requires[0],
                sortableItemHandle = requires[1],
                unbindControlWatch;

            scope.templateUrl = '/app/components/form/fields/views/%s-field.html'.replace('%s', scope.field.type);

            if (sortableItemHandle) {
                scope.type = 'handle';
            }

            scope.setImageId = function (file) {
                scope.field.value = file.id;
            };

            // Add the control to the actual form this formGroup is a part of
            // This is related to the need to create an ng-form in form-group.html
            unbindControlWatch = scope.$watch('form.formGroup', function (control) {
                if (control) {
                    control.$name = scope.field.fieldId;
                    ngForm.$addControl(control);
                    unbindControlWatch();
                }
            });
        }
    };
});
