describe('Homepage', () => {
  it('assert that <title> is correct', () => {
    cy.visit('/');

    cy.title().should('equal', 'Hodlfolio');
  });

  it('assert that only new wallet button exists', () => {
    cy.get('.v-btn--large').should('have.length', 1);

    cy.get('.v-btn--large.primary').should('not.exist');
  });

  it('should create new wallet', () => {
    cy.get('.v-btn--large').click();
  });

  it('should add 2 cryptocurrencies', () => {
    cy.get('.v-select.v-autocomplete input')
      .as('select')
      .click()
      .type('Bitcoin');

    cy.get('.v-list__tile--link')
      .first()
      .click();

    cy.get("input[aria-label='Amount']")
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

    cy.get('.v-autocomplete__content .v-list__tile--link')
      .first()
      .click();

    cy.get('@amountInput').type('27.38');

    cy.get('.v-card__actions > button')
      .eq(2)
      .click();
  });

  it('Switch to home and back again', () => {
    cy.get('.v-toolbar__side-icon')
      .as('sideButton')
      .click();

    cy.get('.v-navigation-drawer > .v-list > div')
      .should('have.length', 2)
      .eq(0)
      .click();
  });

  it('assert that "Go to my wallet" button exists', () => {
    cy.get('.v-btn--large').should('have.length', 2);

    cy.get('.v-btn--large.primary')
      .should('exist')
      .click();
  });
});
