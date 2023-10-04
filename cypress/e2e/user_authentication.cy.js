///<reference types= "cypress">

// registration process

describe('User Ragistration without accepting any action and input fields', () => {
  it('User should not be registered and get a warning messege; Warning: You must agree to the Privacy Policy!' , () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.accordion-menu-item-1 > a > .links-text').click()
    cy.get('.well > .buttons > .pull-right > .btn').click()
    cy.get('.btn > span').click()// this will click to the registion complete button
    cy.contains('You must agree to the Privacy Policy!').should('exist');

  });
});


describe('User Ragistration with empty fields', () => {
  it('User should not be registered and get a warning messege; Worning: Enter the required fields ' , () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.accordion-menu-item-1 > a > .links-text').click()// Navigate to the registration page and fill in the form
    cy.get('.well > .buttons > .pull-right > .btn').click()
    cy.get('.pull-right > input').click()// this will accept the privecy policy
    cy.get('.btn > span').click()// this will click to the registion complete button
    cy.contains('First Name must be between 1 and 32 characters!').should('exist');

  });
});


describe('User Ragistration with an invalid email', () => {
  it('User should not be registered and get a warning messege; Warning:E-Mail Address does not appear to be valid!', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.accordion-menu-item-1 > a > .links-text').click()// Navigate to the registration page and fill in the form
    cy.get('.well > .buttons > .pull-right > .btn').click()
    cy.get('#input-firstname').type("new")
    cy.get('#input-lastname').type("user")
    cy.get('#input-email').clear().type(" ")
    cy.get('#input-telephone').clear().type("new user")
    cy.get('#input-password').type("1234")
    cy.get('#input-confirm').type("1234")
    cy.get('.pull-right > input').click() // this will accept the privecy policy
    cy.get('.btn > span').click() // this will click to the registion complete button
    cy.contains('E-Mail Address does not appear to be valid!').should('exist');

  });
});


describe('User Ragistration with unmatched password', () => {
  it('User should not be registered and get a warning messege; Warning:Password confirmation does not match password!', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.accordion-menu-item-1 > a > .links-text').click()// Navigate to the registration page and fill in the form
    cy.get('.well > .buttons > .pull-right > .btn').click()
    cy.get('#input-firstname').type("new")
    cy.get('#input-lastname').type("user")
    cy.get('#input-email').type("a@a.com")
    cy.get('#input-telephone').type("new user")
    cy.get('#input-password').type("1234")
    cy.get('#input-confirm').type("45678")
    cy.get('.pull-right > input').click() // this will accept the privecy policy
    cy.get('.btn > span').click() // this will click on the user reg complete button.
    cy.contains('Password confirmation does not match password!').should('exist');
  });
});


describe('User Ragistration with invalid telephone number', () => {
  it('User should not be registered and get a warning messege; Warning:Telephone must be between 3 and 32 characters!', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.accordion-menu-item-1 > a > .links-text').click()// Navigate to the registration page and fill in the form
    cy.get('.well > .buttons > .pull-right > .btn').click()
    cy.get('#input-firstname').type("new")
    cy.get('#input-lastname').type("user")
    cy.get('#input-email').type("a@a.com")
    cy.get('#input-telephone').type("ne")
    cy.get('#input-password').type("1234")
    cy.get('#input-confirm').type("45678")
    cy.get('.pull-right > input').click() // this will accept the privecy policy
    cy.get('.btn > span').click() // this will click on the user reg complete button.
    cy.contains('Telephone must be between 3 and 32 characters!').should('exist');
  });
});


describe('User Registration by all required acttion', () => {
  let isUserRegistered = false;

  it('User should be registered and redirected to the account URL with the success message', () => {
    if (!isUserRegistered) {
      cy.visit('index.php?route=account/login');

      cy.get('.accordion-menu-item-1 > a > .links-text').click(); // Navigate to the registration page and fill in the form
      cy.get('.well > .buttons > .pull-right > .btn').click();
      cy.get('#input-firstname').type('new');
      cy.get('#input-lastname').type('user');
      cy.get('#input-email').type('example@example.com');
      cy.get('#input-telephone').type('new user');
      cy.get('#input-password').type('1234');
      cy.get('#input-confirm').type('1234');
      cy.get('.pull-right > input').click(); // This accepts the privacy policy
      cy.get('.btn > span').click(); // This clicks on the complete button.
     
    } else {
      cy.url().should('include', 'index.php?route=success');
      cy.contains('Congratulations! Your new account has been successfully created!').should('exist');
      cy.log('User is already registered. Skipping registration test.');
    }
  });
});


describe('User Ragistration- User Exist', () => {
  it('User should not be registered and get a warning messege; Warning:E-Mail Address is already registered!', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.accordion-menu-item-1 > a > .links-text').click()
    cy.get('.well > .buttons > .pull-right > .btn').click()
    cy.get('#input-firstname').type("new")
    cy.get('#input-lastname').type("user")
    cy.get('#input-email').type("example@example.com")
    cy.get('#input-telephone').type("new user")
    cy.get('#input-password').type("1234")
    cy.get('#input-confirm').type("1234")
    cy.get('.pull-right > input').click() // this will accept the privecy policy
    cy.get('.btn > span').click() // this will click on the complete button.
    cy.contains(' E-Mail Address is already registered!').should('exist');
  });
});


// Login process


describe('User login with invalid email/password', () => {
  it('User should not be logged in and get a warning messege; No match for E-Mail Address and/or Password.', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('#input-email').type("example@example.com")
    cy.get('#input-password').type(" ")
    cy.get('.form-horizontal > .buttons > .pull-right > .btn').click() // this will click on the login button.
    cy.contains(' No match for E-Mail Address and/or Password.').should('exist');
  });
});

describe('User login with valid email andpassword', () => {
  it('User should be logged in existing url', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('#input-email').type("example@example.com")
    cy.get('#input-password').type("1234")
    cy.get('.form-horizontal > .buttons > .pull-right > .btn').click(); // this will click on the login button.
   // cy.url().should('include', 'index.php?route=account/success');
   cy.url().should('include', '/index.php?route=account/account');
  });
});