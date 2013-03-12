var angularApp = angular.module('RecipeApp', ['ngResource']);

angularApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/recipeList.html'
  }).when('/view/:id', {
    templateUrl: 'views/recipeView.html',
    controller: 'RecipeViewCtrl'
  }).when('/create', {
    templateUrl: 'views/recipeCreateUpdate.html',
    controller: 'RecipeCreateUpdateCtrl'
  }).when('/edit/:id', {
    templateUrl: 'views/recipeCreateUpdate.html',
    controller: 'RecipeCreateUpdateCtrl'
  }).otherwise({redirectTo: '/'});
}]);

angularApp.factory('Recipe', ['$resource', function($resource) {
  return $resource('/api/recipe/:id', {id: '@id'});
}]);

angularApp.service('RecipeFilterService', function() {
  var filterService = {
    filters: {
      calories: 0,
      time: 0,
      cuisine: '',
      title: ''
    },
    filterRecipes: function(recipe) {
      var filters  = filterService.filters;

      var valid = true;
      valid = valid && (filters.calories > 0 ? filters.calories >= recipe.calories : true);
      valid = valid && (filters.time > 0 ? filters.time >= recipe.time : true);
      valid = valid && (filters.cuisine != '' ? filters.cuisine === recipe.cuisine : true);
      valid = valid && (filters.title != '' ? (new RegExp(filters.title, 'i')).test(recipe.title) : true);
      return valid;
    }
  };
  return filterService;
});

angularApp.controller('RecipeFilterCtrl', ['$scope', 'RecipeFilterService', function($scope, filterService) {
  $scope.filters = filterService.filters;
  $scope.cuisines = ['Indian', 'Chinese', 'American', 'Italian'];
}]);

angularApp.controller('RecipeListCtrl', ['$scope', 'RecipeFilterService', 'Recipe', function($scope, filterService, Recipe) {
  $scope.filterService = filterService;
  $scope.recipes = Recipe.query();
}]);

angularApp.controller('RecipeViewCtrl', ['$scope', '$routeParams', 'Recipe', function($scope, $routeParams, Recipe) {
  $scope.recipe = Recipe.get({id: $routeParams.id});
}]);
angularApp.controller('RecipeCreateUpdateCtrl', ['$scope', '$routeParams', 'Recipe', '$location',
    function($scope, $routeParams, Recipe, $location) {

  if ($routeParams.id) {
    $scope.recipe = Recipe.get({id: $routeParams.id});
  } else {
    $scope.recipe = {
      img_url: 'images/default-recipe-image.png',
      ingredients: [],
      method: [],
      cooking_tips: []
    };
  }


  $scope.addIngredient = function() {
    $scope.recipe.ingredients.push({name: null, amount: null});
  };

  $scope.removeIngredient = function(index) {
    $scope.recipe.ingredients.splice(index, 1);
  };

  $scope.addCookingSteps = function() {
    $scope.recipe.method.push({step: null});
  };

  $scope.removeCookingStep = function(index) {
    $scope.recipe.method.splice(index, 1);
  };

  $scope.addCookingTips = function() {
    $scope.recipe.cooking_tips.push({tip: null});
  };

  $scope.removeCookingTip = function(index) {
    $scope.recipe.cooking_tips.splice(index, 1);
  };

  $scope.saveRecipe = function() {
    Recipe.save({id: $scope.recipe.id}, {recipe: $scope.recipe}, function(response) {
      $location.path('/view/' + response.id);
    });
  };
}]);
