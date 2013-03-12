var angularApp = angular.module('RecipeApp', []);

angularApp.controller('RecipeListCtrl', ['$scope', function($scope) {
  $scope.recipes = [
    {id: 1, author: 'Shyam Seshadri', name: 'Recipe 1', imgSrc: ''},
    {id: 2, author: 'Shyam Seshadri', name: 'Recipe 2', imgSrc: ''},
    {id: 3, author: 'Shyam Seshadri', name: 'Recipe 3', imgSrc: ''},
    {id: 4, author: 'Shyam Seshadri', name: 'Recipe 4', imgSrc: ''}
  ];
}]);
