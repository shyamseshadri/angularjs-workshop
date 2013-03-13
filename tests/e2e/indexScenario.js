describe('Index Page Display', function() {
  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should display 4 recipes by default', function() {
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(4);
  });

});
