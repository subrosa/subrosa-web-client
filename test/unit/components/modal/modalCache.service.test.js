describe('Service: modalCache', function () {
    var $q, $modal, $cacheFactory, modalCache, modalCacheService;

    beforeEach(module('subrosa.components.modal'));

    beforeEach(module(function ($provide) {
        $modal = {
            open: function () {
                var deferred = $q.defer();
                if (this.success) {
                    deferred.resolve({});
                } else {
                    deferred.reject({});
                }
                return {
                    result: deferred.promise
                };
            }
        };

        modalCache = {
            get: function () {},
            put: function () {}
        };

        $cacheFactory = function () {
            return modalCache;
        };

        $provide.value('$modal', $modal);
        $provide.value('$cacheFactory', $cacheFactory);
    }));

    beforeEach(inject(function (_$q_, _modalCache_) {
        $q = _$q_;
        modalCacheService = _modalCache_;
    }));

    it("can register modals by adding them to the cache", function () {
        spyOn(modalCache, 'put');

        modalCacheService.put('myModal', 'template.html');

        expect(modalCache.put).toHaveBeenCalledWith('myModal', 'template.html');
    });

    it("can return cached modals", function () {
        spyOn(modalCache, 'get').andReturn('template.html');

        expect(modalCacheService.get('myModal')).toBe('template.html');
    });

    it("can open modals from the cache", function () {
        var scope = {blah: 'blah'};
        spyOn(modalCache, 'get').andReturn('template.html');
        spyOn($modal, 'open');

        modalCacheService.openModal('myModal', scope);

        expect(modalCache.get).toHaveBeenCalledWith('myModal');
        expect($modal.open).toHaveBeenCalledWith({controller: 'ModalController',
            scope: scope, templateUrl: 'template.html'});
    });
});