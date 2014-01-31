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

angular.module('mocks', []);

angular.module('mocks').factory('MockResource', function () {
    function resourceFactory() {
        var Resource, mockResource, mockResources, errorResponse;

        errorResponse = {
            data: {
                notifications: {
                    name: 'Invalid name'
                }
            }
        };

        mockResource = {
            $delete: function (callback) {
                callback();
            },
            $get: function () {},
            $save: function (data, success, error) {
                if (!this.failed) {
                    success(this);
                } else {
                    error(errorResponse);
                }
            },
            $update: function (success, error) {
                if (this.failed) {
                    error(errorResponse);
                } else {
                    success(this);
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

        Resource.get = function () {};

        Resource.query = function (params, callback) {

            if (typeof(params) === "function") {
                params.call(this, mockResources);
            } else if (callback) {
                callback.call(this, mockResources);
            }
            return mockResources;
        };

        Resource.save = function (params, success, error) {
            if (!this.failed) {
                success(this);
            } else {
                error(errorResponse);
            }
            return new Resource(params);
        };

        Resource.setErrorResponse = function (response) {
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