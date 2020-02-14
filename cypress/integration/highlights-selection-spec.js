const typeText = selector => text => {
  cy.get(selector).type(text);
  cy.get(selector).should('have.value', text);
};

const highlightText = selector => (selectorMark, contains, color) => {
  cy.get(selector).type('{selectall}');
  cy.get(selector).click();

  cy.get(selectorMark)
    .contains(contains)
    .should('have.class', `highlight-${color}`);
};

const colorPicker = selector => (selectorItem, color) => {
  cy.get(selector)
    .get(selectorItem)
    .find(`.highlight-option-${color}`)
    .click();
};

const validateHighlights = selector => (selectorItem, length) => {
  cy.get(selector)
    .get(selectorItem)
    .should('have.length', length);
};

const filterByColor = selector => color => {
  cy.get(selector)
    .find(`.highlight-option-${color}`)
    .click();
};

const validateError = () => {
  cy.get('[data-cy=error]')
    .should('be.visible')
    .should('have.class', 'error-message__wrapper');
};

describe('HIGHLIGHTER - selection', function() {
  const typeInTextArea = typeText('[data-cy=text-area]');
  const highlightInTextArea = highlightText('[data-cy=text-area]');
  const clickOnColorHighlighter = colorPicker('[data-cy=color-picker]');
  const isHighlightAdded = validateHighlights('[data-cy=highlights]');
  const applyFilter = filterByColor('[data-cy=filter]');

  const TYPED_TEXT =
    'Hello Folks I wanna show you a little bit about cypress and how cool it is';

  before(() => {
    cy.visit('/');
  });

  describe('GIVEN I typed some text WHEN I select Red Highlight THEN I Highlight the text AND a new row appears in list', () => {
    it('should type some text', () => {
      typeInTextArea(TYPED_TEXT);
    });

    it('should highlight text in red', () => {
      highlightInTextArea('.app-text-area__highlights', 'Hello Folks', 'red');
    });

    it('should appear one row down below showing the text was selected in red', () => {
      isHighlightAdded('.highlights__item', 1);
    });
  });

  describe('GIVEN I typed some text WHEN I select Green Highlight THEN I Highlight the text AND a new row appears in list', () => {
    before(() => {
      cy.get('[data-cy=reset]').click();
    });

    it('should pick a color to highlight', () => {
      clickOnColorHighlighter('.radio-color-picker__item', 'green');
    });

    it('should type some text', () => {
      typeInTextArea(TYPED_TEXT);
    });

    it('should highlight text in green', () => {
      highlightInTextArea('.app-text-area__highlights', 'Hello Folks', 'green');
    });

    it('should appear one row down below showing the text was selected in Green', () => {
      isHighlightAdded('.highlights__item', 1);
    });
  });

  describe('GIVEN I typed some text WHEN I select Yellow Highlight THEN I Highlight the text AND a new row appears in list', () => {
    before(() => {
      cy.get('[data-cy=reset]').click();
    });

    it('should pick a color to highlight', () => {
      clickOnColorHighlighter('.radio-color-picker__item', 'yellow');
    });

    it('should type some text', () => {
      typeInTextArea(TYPED_TEXT);
    });

    it('should highlight text in yellow', () => {
      highlightInTextArea(
        '.app-text-area__highlights',
        'Hello Folks',
        'yellow'
      );
    });

    it('should appear one row down below showing the text was selected in Yellow', () => {
      isHighlightAdded('.highlights__item', 1);
    });
  });

  describe('GIVEN I typed some text WHEN I select some color Highlight THEN I Highlight the text AND a new row appears in list AND I click on other color to filter', () => {
    before(() => {
      cy.get('[data-cy=reset]').click();
    });

    it('should pick a color to highlight', () => {
      clickOnColorHighlighter('.radio-color-picker__item', 'red');
    });

    it('should type some text', () => {
      typeInTextArea(TYPED_TEXT);
    });

    it('should highlight text in Red', () => {
      highlightInTextArea('.app-text-area__highlights', 'Hello Folks', 'red');
    });

    it('should appear one row down below showing the text was selected in Red', () => {
      isHighlightAdded('.highlights__item', 1);
    });

    it('should appear an empty list when i change filter from other since there is just one', () => {
      applyFilter('green');
      isHighlightAdded('.highlights__item', 0);
    });

    it('should get the row again back if we select red color filter', () => {
      applyFilter('red');
      isHighlightAdded('.highlights__item', 1);
    });
  });

  describe('GIVEN I Highlight with the Red color WHEN i type some text AND highlight the same text using another color THEN an error message shows up', () => {
    before(() => {
      cy.get('[data-cy=reset]').click();
    });

    it('should type some text', () => {
      typeInTextArea(TYPED_TEXT);
    });

    it('should highlight text in Red', () => {
      highlightInTextArea('.app-text-area__highlights', 'Hello Folks', 'red');
    });

    it('should pick yellow to highlight', () => {
      clickOnColorHighlighter('.radio-color-picker__item', 'yellow');
    });

    it('should try to highlight text in yellow', () => {
      cy.get('[data-cy=text-area]').type('{selectall}');
      cy.get('[data-cy=text-area]').click();
    });

    it('should error message shows up', () => {
      validateError();
    });

    it('should appear an empty list when i change filter to the yellow one since was not highlighted', () => {
      applyFilter('red');
      applyFilter('yellow');
      isHighlightAdded('.highlights__item', 0);
    });
  });
});
