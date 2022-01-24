describe("Login functionality", () => {
  it("Admin can delete both admins and users", () => {
    cy.loginAsAdmin();

    cy.get("#delete-admin-button").click();

    cy.get("#delete-status-container").contains(
      "User has been deleted successfully..."
    );

    cy.get("#delete-user-button").click();

    cy.get("#delete-status-container").contains(
      "User has been deleted successfully..."
    );
  });
  it("User can only delete users", () => {
    cy.loginAsUser();

    cy.get("#delete-admin-button").click();

    cy.get("#delete-status-container").contains(
      "You are not allowed to delete this user!"
    );

    cy.get("#delete-user-button").click();

    cy.get("#delete-status-container").contains(
      "User has been deleted successfully..."
    );
  });
});
