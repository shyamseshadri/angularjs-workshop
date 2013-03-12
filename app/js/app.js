var angularApp = angular.module('RecipeApp', []);

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

angularApp.controller('RecipeListCtrl', ['$scope', 'RecipeFilterService', '$http', function($scope, filterService, $http) {
  $scope.filterService = filterService;
  $http.get('/api/recipe').success(function(recipes) {
    $scope.recipes = recipes;
  });
}]);

angularApp.controller('RecipeViewCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $http.get('/api/recipe/' + $routeParams.id).success(function(recipe) {
    $scope.recipe = recipe;
  });

}]);
angularApp.controller('RecipeCreateUpdateCtrl', ['$scope', '$routeParams', '$http', '$location',
    function($scope, $routeParams, $http, $location) {

  if ($routeParams.id) {
    $http.get('/api/recipe/' + $routeParams.id).success(function(recipe) {
      $scope.recipe = recipe;
    });
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
    var url = '/api/recipe';
    if ($routeParams.id) {
      url += '/' + $routeParams.id;
    }
    $http.post(url, {recipe: $scope.recipe}).success(function(recipe) {
      $location.path('/view/' + recipe.id);
    });
  };
}]);
