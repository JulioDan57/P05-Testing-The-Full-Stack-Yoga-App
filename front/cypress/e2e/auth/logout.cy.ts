describe('Logout (Mocked session)', () => {

  beforeEach(() => {
    cy.viewport(1280, 720);

    cy.visit('/', {
      onBeforeLoad(win) {
        win.sessionStorage.setItem(
          'sessionInformation',
          JSON.stringify({
            id: 1,
            firstName: 'Yoga',
            lastName: 'Studio',
            username: 'yoga@studio.com',
            admin: true,
            token: 'FAKE_TOKEN',
            type: 'Bearer'
          })
        );
      }
    });

    cy.visit('/sessions');
  });

  it('should logout and clear sessionStorage', () => {
    cy.contains('Logout').should('be.visible').click();

    cy.window().then(win => {
      expect(win.sessionStorage.getItem('sessionInformation')).to.be.null;
    });

    cy.url().should('include', '/');
  });
});
