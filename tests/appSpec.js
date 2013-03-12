describe('Recipe App', function() {

  beforeEach(module('RecipeApp'));
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
});
