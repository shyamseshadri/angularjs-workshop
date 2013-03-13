describe('Index Page Display', function() {
  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should display 4 recipes by default', function() {
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(4);
  });

  it('should filter recipes by title', function() {
    input('filters.title').enter('5');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(1);

    input('filters.title').enter('a');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(3);

    input('filters.title').enter('ac');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(2);

    input('filters.title').enter('AcH');
    expect(repeater('.recipe-list', 'List of Recipes').count()).toBe(1);
  });

});
