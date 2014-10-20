describe('Controller: EditGameEnrollment', function () {
    var $controller, $scope;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        var i18n = function (string) {
            return string;
        };

        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.game = MockResource.$new().get({id: 1});
        $scope.game.playerInfo = [];

        $controller('EditGameEnrollmentController', {$scope: $scope, i18n: i18n});
    }));

    it("sets up the default field object", function () {
        expect($scope.field).toEqual(jasmine.any(Object));
    });

    it("sets up the default field types", function () {
        var expectedFieldTypes = [
            {id: 'address', label: 'Address'},
            {id: 'image', label: 'Image'},
            {id: 'text', label: 'Text'}
        ];
        expect($scope.fieldTypes).toEqual(expectedFieldTypes);
    });

    describe("can modify required game information", function () {
        var expectedField;

        beforeEach(function () {
            expectedField = 'field';
        });

        it("by adding a field to the game's playerInfo array", function () {
            $scope.addField(expectedField);

            expect($scope.game.playerInfo.length).toBe(1);
            expect($scope.game.playerInfo).toContain(expectedField);
        });

        it("by setting a field as editable.", function () {
            $scope.editField(expectedField);
            expect($scope.field).toBe(expectedField);
        });

        describe("by saving a field", function () {

            beforeEach(function () {
                spyOn($scope.game, '$update').andCallThrough();
            });

            it("and succeed", function () {

            });

            it("and error", function () {
                $scope.game.failed = true;
                $scope.saveField();
                expect($scope.game.$update).toHaveBeenCalled();
                expect($scope.saveFieldNotifications.code).toBe(1000);
            });
        });

        describe("by removing a field", function () {
            beforeEach(function () {
                spyOn($scope.game, '$update').andCallThrough();
            });

            it("and succeed", function () {

            });

            it("and error", function () {
                $scope.game.failed = true;
                $scope.removeField();
                expect($scope.game.$update).toHaveBeenCalled();
                expect($scope.fieldNotifications.code).toBe(1000);
            });
        });
    });
});
