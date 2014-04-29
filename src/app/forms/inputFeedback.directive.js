/**
 * @ngdoc directive
 * @name subrosa.forms:inputFeedback
 *
 * @requires $compile
 *
 * @description
 *   Provides input level form feedback while submitting a form.
 *
 * @example
 *   <div data-input-feedback="passwordForm.newPassword">
 *     <label for="newPassword">New Password</label>
 *     <input id="newPassword" name="newPassword" type="password"
 *          data-ng-model="account.password" required/>
 *   </div>
 */
angular.module('subrosa.forms').directive('inputFeedback', function ($compile) {

    return {
        require: '^?formFeedback',
        replace: true,
        transclude: 'element',
        templateUrl: '/app/forms/views/input-feedback.html',
        scope: {
            field: '=inputFeedback',
            warn: '=warn'
        },
        compile: function (element, attributes, tranclude) {
            var icons = element.find('span'),
                feedback = element.find('p'),
                notificationHasFieldDetails,
                fieldHasNotificationOfType = function () {
                    return false;
                };

            return function (scope, iElement, iAttributes, formFeedback) {
                notificationHasFieldDetails = function (notification) {
                    return notification.hasOwnProperty("details") && notification.details.hasOwnProperty("field");
                };

                if (formFeedback) {
                    fieldHasNotificationOfType = function (field, type) {
                        var found = false;
                        angular.forEach(scope.$parent.notifications, function (notification) {
                            var severityMatches, fieldMatches;
                            if (notificationHasFieldDetails(notification)) {
                                severityMatches = notification.severity.toLowerCase() === type.toLowerCase();
                                fieldMatches = field && notification.details.field === field.$name;

                                if (fieldMatches && severityMatches) {
                                    found = true;
                                }
                            }
                        });
                        return found;
                    };

                    scope.$watch('$parent.notifications', function (notifications) {
                        var input = iElement.find('input');
                        angular.forEach(notifications, function (notification) {
                            if (notificationHasFieldDetails(notification)) {
                                if (input.attr('name') === notification.details.field) {
                                    scope.message = notification.details.message;
                                }
                            }
                        });
                    });
                }

                scope.hasSuccess = function (field) {
                    var fieldSuccess = Boolean(field && field.$dirty && field.$valid);
                    return fieldSuccess || fieldHasNotificationOfType(field, "success");
                };

                scope.hasWarning = function (field) {
                    var fieldWarning = Boolean(field && field.$dirty && field.$invalid && scope.warn);
                    return fieldWarning || fieldHasNotificationOfType(field, "warning");
                };

                scope.hasError = function (field) {
                    var fieldError = Boolean(field && field.$dirty && field.$invalid && !scope.warn);
                    return fieldError || fieldHasNotificationOfType(field, "error");
                };

                tranclude(scope, function () {
                    var input = iElement.find('input');

                    icons = $compile(angular.element(icons))(scope);
                    feedback = $compile(angular.element(feedback))(scope);

                    input.after(icons);
                    icons.after(feedback);
                });
            };
        }
    };
});
