/**
 * @ngdoc directive
 * @name subrosa.account:imageChooser
 *
 * @requires i18n
 * @requires Image
 *
 * @description
 *   A directive to allow choosing an image.
 */
angular.module('subrosa.account').directive('imageChooser', function (i18n, Image) {
    return {
        restrict: 'AE',
        controller: 'ChooserDirectiveController',
        templateUrl: '/app/account/image/views/image-chooser.html',
        scope: {
            items: '=imageChooser',
            onEdit: '&',
            onDelete: '&',
            onDeleteError: '&',
            onSave: '&',
            onSaveError: '&',
            onSelect: '&'
        },
        link: function (scope) {
            scope.chooserFormNotifications = [];

            // TODO: Disable editing of images?
            scope.disableEdit = true;
            scope.onEdit = function () {};

            scope.saveResource = function (image) {
                var success, error;

                success = function () {
                    var notification = {type: 'success', message: i18n('Your image has been created')};
                    scope.chooserFormNotifications.push(notification);
                };

                error = function (response) {
                    scope.selectedItem.edit = true;
                    scope.chooserFormNotifications = response.data.notifications;
                };

                return Image.update(image, success, error);
            };

            scope.deleteResource = function (image) {
                var success, error;

                success = function () {
                    var notification = {type: 'success', message: i18n('Your image has been removed')};
                    scope.chooserFormNotifications.push(notification);
                };

                error = function (response) {
                    scope.chooserFormNotifications = response.data.notifications;
                };

                return Image.delete({id: image.id}, success, error);
            };

            scope.setImage = function (response) {
                scope.selectedItem.id = response.id;
            };
        }
    };
});
