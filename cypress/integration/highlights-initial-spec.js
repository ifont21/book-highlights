import { createYield } from 'typescript';

describe('Highlighter - Initial State', function() {
  before(() => {
    cy.visit('/');
  });

  it('url should include highlighter', () => {
    cy.url().should('include', '/highlighter');
  });

  it('header title should say Book Highlights', () => {
    cy.get('[data-cy=title]').should(element => {
      const text = element.text().trim();
      expect(text).to.include('Book HighLights');
    });
  });

  it('should show three main colors to highlight', () => {
    cy.get('[data-cy=color-picker]')
      .get('.radio-color-picker__item')
      .should('have.length', 3);
  });

  it('should one button color highlighter be selected by default', () => {
    cy.get('[data-cy=color-picker]')
      .find('.radio-color-picker--item-selected')
      .should('have.class', 'highlight-option-red')
      .contains('Highlighter');
  });

  it('should have a highlight text area with no values initially', () => {
    cy.get('[data-cy=text-area]').should('have.value', '');
  });

  it('should be a Reset button', () => {
    cy.get('[data-cy=reset]').contains('Reset');
  });

  it('should have a filter option with no filter applied', () => {
    cy.get('[data-cy=filter]')
      .get('.filter-color__item')
      .should('have.length', 3)
      .and('not.have.class', 'filter-color--item-selected');
  });

  it('should highlight list be empty initially', () => {
    cy.get('[data-cy=highlights]')
      .get('.highlights__item')
      .should('have.length', 0);
  });
});
