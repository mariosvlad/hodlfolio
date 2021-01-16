describe('Wallet', () => {
  it('assert that <title> is correct', () => {
    cy.visit('/');

    cy.title().should('equal', 'Hodlfolio');
  });

  it('should create new wallet', () => {
    cy.get('button')
      .contains('Create new wallet')
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
      .type('1.23');

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

    cy.get('@amountInput')
      .clear()
      .type('27.38');

    cy.get('.v-card__actions > button')
      .eq(2)
      .click();
  });

  it('should add bitcoin again', () => {
    cy.get('button.v-btn--fab')
      .as('addAssetButton')
      .click();

    cy.get('.v-select.v-autocomplete input')
      .first()
      .as('select')
      .click()
      .clear()
      .type('Bitcoin');

    cy.get('.v-autocomplete__content .v-list-item__title')
      .first()
      .click();

    cy.get("input[type='number']")
      .as('amountInput')
      .clear()
      .type('1');

    cy.get('.v-card__actions > button')
      .eq(2)
      .click();
  });
});
