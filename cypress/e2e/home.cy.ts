describe('GitHub Search App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should load homepage and search users', () => {
    cy.intercept('GET', '/search/users*', {
      delay: 200,
      fixture: 'searchUsers.json',
    }).as('getSearchUsers');

    cy.get('input[placeholder="Enter username"]').type('tester');
    cy.contains('Search').click();

    cy.wait('@getSearchUsers');
    cy.contains('Showing users for “tester”').should('exist');
  });

  it('should show loading state while fetching users', () => {
    cy.intercept('GET', '/search/users*', {
      delay: 2000,
      fixture: 'searchUsers.json',
    }).as('getSearchUsers');

    cy.get('input[placeholder="Enter username"]').type('tester');
    cy.contains('Search').click();

    cy.contains('Loading users...').should('exist');
    cy.wait('@getSearchUsers');
    cy.contains('Showing users for “tester”').should('exist');
  });

  it('should show error state when fetching users fails', () => {
    cy.intercept('GET', '/search/users*', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('getSearchUsersError');

    cy.get('input[placeholder="Enter username"]').type('tester');
    cy.contains('Search').click();

    cy.wait('@getSearchUsersError').then(() => {
      cy.contains('Error fetching users').should('not.exist');
    });
  });

  it('should expand user details and show repositories', () => {
    cy.intercept('GET', '/search/users*', {
      fixture: 'searchUsers.json',
    }).as('getSearchUsers');

    cy.intercept('GET', '/users/tester/repos*', {
      fixture: 'userRepos.json',
    }).as('getUserRepos');

    cy.visit('http://localhost:5173/');
    cy.get('input[placeholder="Enter username"]').type('tester');
    cy.contains('Search').click();
    cy.wait('@getSearchUsers');

    cy.get('[data-testid="user-tester"]').click();
    cy.wait('@getUserRepos');

    cy.contains('repo1').should('exist');
    cy.contains('repo2').should('exist');
  });

  it('should show no users found when search returns empty', () => {
    cy.intercept('GET', '/search/users*', {
      statusCode: 200,
      body: { items: [] },
    }).as('getSearchUsersEmpty');

    cy.get('input[placeholder="Enter username"]').type('nonexistentuser');
    cy.contains('Search').click();

    cy.wait('@getSearchUsersEmpty');
    cy.contains('No users found').should('exist');
  });

  it('should handle empty search input', () => {
    cy.contains('Search').click();
    cy.contains('Please enter a username.').should('exist');
  });
});
