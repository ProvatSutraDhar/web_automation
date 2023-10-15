///<reference types= "cypress">

// registration process

describe('User Authentication Operations', () => {
  it('User should not be registered and get a warning messege; Warning: You must agree to the Privacy Policy!' , () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.accordion-menu-item-1 > a > .links-text').click()
    cy.get('.well > .buttons > .pull-right > .btn').click()
    cy.get('.btn > span').click()// this will click to the registion complete button
    cy.contains('You must agree to the Privacy Policy!').should('exist');

  });

  it('User should not be registered and get a warning messege; Worning: Enter the required fields ' , () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.accordion-menu-item-1 > a > .links-text').click()// Navigate to the registration page and fill in the form
    cy.get('.well > .buttons > .pull-right > .btn').click()
    cy.get('.pull-right > input').click()// this will accept the privecy policy
    cy.get('.btn > span').click()// this will click to the registion complete button
    cy.contains('First Name must be between 1 and 32 characters!').should('exist');

  });

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

// Login process

  it('User should not be logged in and get a warning messege; No match for E-Mail Address and/or Password.', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('#input-email').type("example@example.com")
    cy.get('#input-password').type(" ")
    cy.get('.form-horizontal > .buttons > .pull-right > .btn').click() // this will click on the login button.
    cy.contains(' No match for E-Mail Address and/or Password.').should('exist');
  });

  it('User should be logged in existing url', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('#input-email').type("example@example.com")
    cy.get('#input-password').type("1234")
    cy.get('.form-horizontal > .buttons > .pull-right > .btn').click(); // this will click on the login button.
   cy.url().should('include', '/index.php?route=account/account');
  });
});

describe('CRUD - Operations', () => {
  
  it('should be updated user information' , () => {
      cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
      cy.get('#input-email').type("example@example.com")
      cy.get('#input-password').type("1234")
      cy.get('.form-horizontal > .buttons > .pull-right > .btn').click(); // this will click on the login button.
      cy.url().should('include', '/index.php?route=account/account');
      cy.visit('index.php?route=account/account'); // This will navigate to dashboard
      cy.get('.edit-info > a').click();
      cy.get('#input-firstname').clear().type("Jhon")
      //cy.get('#input-lastname').clear().type("testing Doe1")
      //cy.get('#input-telephone').clear().type("01245755441")
      cy.get('.pull-right > .btn').click()
      cy.contains('Your account has been successfully updated.').should('exist');
      cy.url().should('include', '/index.php?route=account/account');

  });

    it('should be create a product review' , () => {
      cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/'
      cy.get('.tt-input').clear().type("Smart watch")
      cy.get('.search-button').click()
      cy.get('.filter-radio > :nth-child(1) > input').click()
      cy.get(':nth-child(1) > .product-thumb > .image > .product-img > div').click()
      cy.get('.tab-3 > a').click()
      cy.get('#input-name').type("Doe Jhon")
      cy.get('#input-review').type("This is Automated testing review")
      cy.get('[value="4"]').click()
      cy.get('#button-review').click()
      cy.contains('Thank you for your review. It has been submitted to the webmaster for approval.').should('exist');
  });

    it('should add and delete from cart' , () => {
      cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
      cy.get('#input-email').type("example@example.com")
      cy.get('#input-password').type("1234")
      cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/'
      cy.get('.tt-input').clear().type("Smart watch")
      cy.get('.search-button').click()
      cy.get(':nth-child(1) > .product-thumb > .caption > .buttons-wrapper > .button-group > .cart-group > .btn').click()
      cy.get('.notification-buttons > .btn-cart').click()
      cy.get('.btn-remove > .fa').click()
      cy.contains('Your shopping cart is empty!').should('exist');
  });


it('should create a an order' , () => {
  cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/'
  cy.get('.tt-input').clear().type(" washing machine")
  cy.get('.search-button').click()
  cy.get('.filter-radio > :nth-child(1) > input').click()
  cy.get(':nth-child(1) > .product-thumb > .image > .product-img > div').click()
  cy.get('.tab-3 > a').click()
  cy.get('#input-name').type("Jhon Doe")
  cy.get('#input-review').type("This is Automated testing review")
  cy.get('[value="4"]').click()
  cy.get('#button-review').click()
  cy.contains('Thank you for your review. It has been submitted to the webmaster for approval.').should('exist');
});



it('should be create a an order' , () => {
  cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('.tt-input').clear().type(" washing machine") // will search for washing machine
    cy.get('.search-button').click()// search for the product
    cy.get('.filter-radio > :nth-child(1) > input').click() // check radio option for product in stock 
    cy.get(':nth-child(1) > .product-thumb > .caption > .buttons-wrapper > .button-group > .cart-group > .btn').click()// it will click on first product
    cy.get('.notification-buttons > .btn-cart').click()
    cy.get('.clearfix > .pull-right > .btn').click();
    cy.get(':nth-child(2) > .radio > label').click() //select cash on delivery
    cy.get('#input-firstname').type("Test order")
    cy.get('#input-email').type("jho@ndoe.com")
    cy.get('#input-telephone').type("telephone")
    cy.get('#input-payment-address-1').type("Test address")  
    cy.get('.section-comments > .form-control').type("automated testing order process")
    cy.get('.section-body > :nth-child(3) > label > input').click()//accept privecy policy
    cy.get(':nth-child(4) > label > input').click()//accept condition
    cy.get('#quick-checkout-button-confirm').click()//confirm order
    cy.wait(700)
    cy.get('#button-confirm').click()//confirm with pop-up
    cy.url().should('include', 'index.php?route=checkout/success');
    cy.contains('Your order has been placed!').should('exist');
  });


  let isProductOrder = false;
  it('should view an order', () => {
    cy.visit('index.php?route=account/login'); // This will navigate to 'https://www.tvhut.com.bd/'
    cy.get('#input-email').type("example@example.com")
    cy.get('#input-password').type("1234")
    cy.get('.form-horizontal > .buttons > .pull-right > .btn').click(); // this will click on the login button.
    cy.url().should('include', '/index.php?route=account/account');    
    cy.get('.accordion-menu-item-4 > a > .links-text').click()
    if (isProductOrder){
      cy.contains("You have not made any previous orders!").should("exist")
    }
    else{
          cy.get('tbody > tr > :nth-child(1)').invoke('text').then((text) => {
        // Extract the numeric value from the text (remove the "#" symbol)
        const numericOrderId = text.replace(/\D/g, '');
        cy.get(':nth-child(7) > .btn').click()
        cy.url().should('include', `route=account/order/info&order_id=${numericOrderId}`);
        cy.contains("Order ID:").should("exist")
      });
    }
  });

});


describe('Field Validation ', () => {

  it('should be validate empty feilds before create an order' , () => {
  
      cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/'
      cy.get('.tt-input').clear().type(" washing machine") // will search for washing machine
      cy.get('.search-button').click()// search for it
      cy.get('.filter-radio > :nth-child(1) > input').click() // check radio option for product in stock 
      cy.get(':nth-child(1) > .product-thumb > .caption > .buttons-wrapper > .button-group > .cart-group > .btn').click()// it will click on first product
      cy.get('.notification-buttons > .btn-cart').click()
      cy.get('.clearfix > .pull-right > .btn').click();
      cy.get(':nth-child(2) > .radio > label').click() //select cash on delivery
      cy.get('#input-firstname').type(" ")
      cy.get('#input-email').type("jho@ndoe.com")
      cy.get('#input-telephone').type("telephone")
      cy.get('#input-payment-address-1').type("Test address")  
      cy.get('.section-comments > .form-control').type("automated testing order process")
      cy.get('.section-body > :nth-child(3) > label > input').click()//accept privecy policy
      cy.get(':nth-child(4) > label > input').click()//accept condition\
      cy.get('#quick-checkout-button-confirm').click()//confirm order
      cy.contains('First Name must be between 1 and 32 characters!').should('exist');
    });
    
  });


  describe('link verification', () => {

    it('should verify privecy policy', () => {
      cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/'
      cy.get('.links-menu-item-10 > a > .links-text').click()
      cy.url().should('include', 'privacy-policy'); // Verify that the URL contains the specified string
      cy.contains('Privacy Policy').should('exist'); // Verify the location details are visible on the page
    });
  

    it('should verify terms and condition', () => {
      cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/'
      cy.get('.links-menu-item-4 > a > .links-text').click()
      cy.url().should('include', 'terms'); // Verify that the URL contains the specified string
      cy.contains('DISCLAIMER').should('exist'); // Verify the location details are visible on the page
    });


    it('should click an dropdown menu', () => {
      cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/'
      cy.get('.main-menu-item-9 > .dropdown-toggle > .links-text').click() // click on the dropdown
      cy.get('.menu-item-c419 > a > .links-text').click()// click dopdown list
      cy.contains("Samsung").should("exist")// check the product is exist?
        });


     it('should be search for product', () => {
      cy.visit('/'); // This will navigate to 'https://www.tvhut.com.bd/
      cy.get('.tt-input').type('LG')
      cy.wait(1000);
      cy.get('.search-button').click()
      cy.contains("Products meeting the search criteria").should('exist')
      });    

});







  