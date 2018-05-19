describe('Wallet', () => {
  it('assert that <title> is correct', () => {
    cy.visit('/');

    cy.title().should('equal', 'Hodlfolio');
  });

  it('should create new wallet', () => {
    cy.get('.btn--large').click();
  });

  it('should add 2 cryptocurrencies', () => {
    cy
      .get('.input-group--select__autocomplete')
      .as('select')
      .click()
      .type('Bitcoin');

    cy.get('.menu__content--select .list__tile--highlighted').click();

    cy
      .get("input[aria-label='Amount']")
      .as('amountInput')
      .type('1.23');

    cy
      .get('.card__actions > button')
      .eq(1)
      .as('addButton')
      .click();

    cy
      .get('@select')
      .click()
      .clear()
      .type('Lisk');

    cy.get('.menu__content--select .list__tile--highlighted').click();

    cy
      .get('@amountInput')
      .clear()
      .type('27.38');

    cy
      .get('.card__actions > button')
      .eq(2)
      .click();
  });

  it('should add bitcoin again', () => {
    cy
      .get('.btn.btn--bottom.btn--floating')
      .as('addAssetButton')
      .click();

    cy
      .get('.card__text .input-group--select__autocomplete')
      .as('select')
      .click()
      .clear()
      .type('Bitcoin');

    cy.get('.menu__content--select .list__tile--highlighted').click();

    cy
      .get("input[aria-label='Amount']")
      .as('amountInput')
      .clear()
      .type('1');

    cy
      .get('.card__actions > button')
      .eq(2)
      .click();
  });
});
