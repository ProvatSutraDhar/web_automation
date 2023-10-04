///<reference types= "cypress">

describe('template spec', () => {
  it('passes', () => {
    // Use a relative URL path based on your base URL
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.well > .buttons > .pull-right > .btn').click()

  });
});