/**
 * @ngdoc service
 * @name subrosa.components.modal.modalCache
 *
 * @requires $modal
 * @requires $cacheFactory
 *
 * @description
 *  Provides a cache for modal dialogs so they can be opened later.
 */
angular.module('subrosa.components.modal').service('modalCache', function ($modal, $cacheFactory) {
    'use strict';

    var modalCache = $cacheFactory('modal');

    /**
     * Put a modal templateUrl into the modal cache.
     *
     * @param modalId the id to store in the cache.
     * @param templateUrl the templateUrl to store in the cache.
     */
    this.put = function (modalId, templateUrl) {
        modalCache.put(modalId, templateUrl);
    };

    /**
     * Get the modal templateUrl from the modal cache.
     *
     * @param modalId the id to retrieve from the cache.
     * @returns string the templateUrl of the modal.
     */
    this.get = function (modalId) {
        return modalCache.get(modalId);
    };

    /**
     * Open the specified modal with the provided scope.
     *
     * @param modalId the modal to open.
     * @param modalScope the scope to use for the modal.
     * @returns Object the $modal object.
     */
    this.openModal = function (modalId, modalScope) {
        var templateUrl = modalCache.get(modalId);

        return $modal.open({
            controller: 'ModalController',
            scope: modalScope,
            templateUrl: templateUrl
        });
    };
});
