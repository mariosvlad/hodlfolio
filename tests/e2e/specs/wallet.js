describe('Wallet', () => {
  it('assert that <title> is correct', () => {
    cy.visit('/');

    cy.title().should('equal', 'Hodlfolio');
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
      .type('1.23');

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

    cy.get('@amountInput')
      .clear()
      .type('27.38');

    cy.get('.v-card__actions > button')
      .eq(2)
      .click();
  });

  it('should add bitcoin again', () => {
    cy.get('.v-btn.v-btn--bottom.v-btn--floating')
      .as('addAssetButton')
      .click();

    cy.get('.v-select.v-autocomplete input')
      .as('select')
      .click()
      .clear()
      .type('Bitcoin');

    cy.get('.v-autocomplete__content .v-list__tile--link')
      .first()
      .click();

    cy.get("input[aria-label='Amount']")
      .as('amountInput')
      .clear()
      .type('1');

    cy.get('.v-card__actions > button')
      .eq(2)
      .click();
  });
});
