var angularApp = angular.module('RecipeApp', []);

angularApp.controller('RecipeListCtrl', ['$scope', function($scope) {
  $scope.recipes = [
    {id: 1, author: 'Shyam Seshadri', name: 'Paneer Tikka Masala', imgSrc: ''},
    {id: 2, author: 'Shyam Seshadri', name: 'Goan Fish Curry', imgSrc: '', featured: true},
    {id: 3, author: 'Someone else', name: 'Tandoori Naan', imgSrc: ''},
    {id: 4, author: 'Someone else', name: 'Paneer lababdar', imgSrc: '', featured: true}
  ];
}]);
