describe('Recipe App', function() {

  beforeEach(module('RecipeApp'));

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('RecipeFilterService', function() {
    var filterService;
    beforeEach(inject(function(RecipeFilterService) {
      filterService = RecipeFilterService;
    }));

    it('should filter recipes based on values in filter', function() {
      var recipe = {calories: 100, time: 20, cuisine: 'Indian', title: 'Shyams recipe'};

      filterService.filters.calories = 120;
      filterService.filters.time = 120;
      filterService.filters.cuisine = 'Indian';
      filterService.filters.title = '';

      expect(filterService.filterRecipes(recipe)).toBeTruthy();

      filterService.filters.calories = 90;
      expect(filterService.filterRecipes(recipe)).toBeFalsy();

      filterService.filters.calories = 120;
      filterService.filters.time = 10;
      expect(filterService.filterRecipes(recipe)).toBeFalsy();

      filterService.filters.time = 120;
      filterService.filters.cuisine = 'Chinese';
      expect(filterService.filterRecipes(recipe)).toBeFalsy();

      filterService.filters.cuisine = 'Indian';
      filterService.filters.title = 'Shyam';
      expect(filterService.filterRecipes(recipe)).toBeTruthy();

      filterService.filters.title = 'Shyamaaa';
      expect(filterService.filterRecipes(recipe)).toBeFalsy();
    });
  });

  describe('RecipeFilterController', function() {
    var filterService, scope, ctrl;
    beforeEach(inject(function(RecipeFilterService, $controller, $rootScope) {
      scope = $rootScope.$new();
      filterService = RecipeFilterService;

      ctrl = $controller('RecipeFilterCtrl', {
        $scope: scope
      });
    }));

    it('should use a singleton recipe filter service', function() {
      filterService.filters.calories = 123;
      filterService.filters.time = 323;

      expect(scope.filters.calories).toEqual(123);
      expect(scope.filters.time).toEqual(323);
    });
  });

  describe('RecipeViewCtrl', function() {
    var ctrl, scope, mockBackend;
    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      mockBackend = $httpBackend;

      $httpBackend.expectGET('/api/recipe/15').respond({id: 15, title: "Awesome Recipe", author: 'Shyam'});

      ctrl = $controller('RecipeViewCtrl', {
        $scope: scope,
        $routeParams: {id: 15}
      });
    }));

    it('should load the recipe based on id', function() {
      expect(scope.recipe).toEqualData({});

      mockBackend.flush();

      expect(scope.recipe).toEqualData({id: 15, title: "Awesome Recipe", author: 'Shyam'});
    });
  });
});
