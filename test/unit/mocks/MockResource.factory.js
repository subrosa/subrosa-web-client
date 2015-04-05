/**
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *  Copyright 2013 Red Hat, Inc.
 *
 *  This software is licensed to you under the GNU General Public
 *  License as published by the Free Software Foundation; either version
 *  2 of the License (GPLv2) or (at your option) any later version.
 *  There is NO WARRANTY for this software, express or implied,
 *  including the implied warranties of MERCHANTABILITY,
 *  NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 *  have received a copy of GPLv2 along with this software; if not, see
 *  http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

angular.module('mocks').factory('MockResource', function () {
    function resourceFactory() {
        var Resource, mockResource, mockResources, successResponse, errorResponse;

        errorResponse = {
            data: {
                notifications: [{
                    code: 1000,
                    name: 'Invalid name'
                }]
            }
        };

        mockResource = {
            id: 1,
            failed: false,
            $delete: function (success, error) {
                if (this.failed) {
                    error(errorResponse);
                } else {
                    success(this);
                }
            },
            $get: function () {},
            $save: function (data, success, error) {
                var successFn, errorFn;

                if (typeof(data) === "function") {
                    successFn = data;
                    errorFn = success;
                } else {
                    successFn = success;
                    errorFn = error;
                }

                if (this.failed) {
                    errorFn(errorResponse);
                } else {
                    successFn(successResponse || this);
                }
            },
            $update: function (success, error) {
                if (this.failed) {
                    error(errorResponse);
                } else {
                    success(this);
                }
            },
            $promise: {
                then: function (success, error) {
                    if (mockResource.failed) {
                        error(errorResponse);
                    } else
                        success(mockResource);
                }
            }
        };

        mockResources = {
            results: [mockResource]
        };

        Resource = function (parameters) {
            var copy = angular.copy(mockResource);
            if (parameters) {
                angular.extend(copy, parameters);
            }
            return copy;
        };

        Resource.get = function (params, callback) {
            var item;
            angular.forEach(mockResources.results, function (value) {
                if (value.id && (value.id.toString() === params.id.toString())) {
                    item = value;
                }
            });

            if (callback) {
                callback(item);
            }

            return item;
        };

        Resource.query = function (params, callback) {
            var response = successResponse || mockResources,
                self = this;
            if (typeof(params) === "function") {
                params.call(this, response);
            } else if (callback) {
                callback.call(this, response);
            }
            response.$promise = {
                then: function (success, error) {
                    if (self.failed) {
                        error(errorResponse);
                    } else
                        success(response);
                }
            };
            return response;
        };

        Resource.save = function (params, data, success, error) {
            var successFn, errorFn;

            if (typeof(data) === "function") {
                successFn = data;
                errorFn = success;
            } else {
                successFn = success;
                errorFn = error;
            }

            if (this.failed) {
                if (errorFn) {
                    errorFn(errorResponse);
                }
            } else {
                if (successFn) {
                    successFn(successResponse || data);
                }
            }
            return new Resource(params);
        };

        Resource.update = Resource.save;

        Resource.remove = function (params, success, error) {
            var successFn, errorFn;

            if (typeof(params) === "function") {
                successFn = params;
                errorFn = success;
            } else {
                successFn = success;
                errorFn = error;
            }

            if (this.failed) {
                if (errorFn) {
                    errorFn(errorResponse);
                }
            } else {
                if (successFn) {
                    successFn(successResponse);
                }
            }
        };

        Resource.setSuccessResponse = function (response) {
            successResponse = response;
        };

        Resource.setErrorResponse = function (response) {
            mockResource.failed = true;
            errorResponse = response;
        };

        return Resource;
    }

    return {
        $new: function () {
            return resourceFactory();
        }
    };
});
