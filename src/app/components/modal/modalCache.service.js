/**
 * @ngdoc service
 * @name subrosa.components.modal.modalCache
 *
 * @requires $modal
 * @required $cacheFactory
 *
 * @description
 *  Provides a cache for modal dialogs so they can be opened later.
 */
angular.module('subrosa.components.modal').service('modalCache', function ($modal, $cacheFactory) {
    var modalCache = $cacheFactory('modal');

    this.put = function (modalId, templateUrl) {
        modalCache.put(modalId, templateUrl);
    };

    this.get = function (modalId) {
        return modalCache.get(modalId);
    };

    this.openModal = function (modalId, modalScope) {
        var templateUrl = modalCache.get(modalId);

        return $modal.open({
            controller: 'ModalController',
            scope: modalScope,
            templateUrl: templateUrl
        });
    };
});