describe("Login functionality", () => {
  it("Admin can login", () => {
    cy.loginAsAdmin();

    cy.get("#welcome-text").contains(
      "Welcome john. You have access to the admin role."
    );
  });

  it("User can login", () => {
    cy.loginAsUser();

    cy.get("#welcome-text").contains(
      "Welcome joe. You have access to the user role."
    );
  });
});
