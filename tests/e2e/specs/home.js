describe('Homepage', () => {
  it('assert that <title> is correct', () => {
    cy.visit('/');

    cy.title().should('equal', 'Hodlfolio');
  });

  it('assert that only new wallet button exists', () => {
    cy.get('button')
      .contains('New list')
      .should('have.length', 1);

    cy.get('button.primary').should('not.exist');
  });

  it('should create new wallet', () => {
    cy.get('button')
      .contains('New list')
      .click();
  });

  it('should add 2 cryptocurrencies', () => {
    cy.get('.v-select.v-autocomplete input')
      .first()
      .as('select')
      .click()
      .type('Bitcoin');

    cy.get('.v-select-list .v-list-item__title')
      .first()
      .click();

    cy.get("input[type='number']")
      .as('amountInput')
      .type('0.23');

    cy.get('.v-card__actions > button')
      .eq(1)
      .as('addButton')
      .click();

    cy.get('@select')
      .click()
      .clear()
      .type('Lisk');

    cy.get('.v-autocomplete__content .v-list-item__title')
      .first()
      .click();

    cy.get('@amountInput').type('27.38');

    cy.get('.v-card__actions > button')
      .eq(2)
      .click();
  });

  it('Switch to home and back again', () => {
    cy.get('.v-app-bar__nav-icon')
      .as('sideButton')
      .click();

    cy.get('.v-navigation-drawer .v-list > a')
      .should('have.length', 2)
      .eq(0)
      .click();
  });

  it('assert that "my list" button exists', () => {
    cy.get('button.primary')
      .contains('My list')
      .should('exist')
      .click();
  });
});
