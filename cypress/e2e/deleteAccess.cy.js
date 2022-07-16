describe("Login functionality", () => {
  it("Admin can delete both admins and users", () => {
    cy.loginAsAdmin();
    cy.intercept("DELETE", "**/api/users/1").as("deleteAdmin");
    cy.intercept("DELETE", "**/api/users/2").as("deleteUser");

    cy.get("#delete-admin-button").click();

    cy.get("#delete-status-container").contains(
      "User has been deleted successfully..."
    );

    cy.wait("@deleteAdmin")
      .its("response.statusCode")
      .should("be.oneOf", [200]);

    cy.get("#delete-user-button").click();

    cy.get("#delete-status-container").contains(
      "User has been deleted successfully..."
    );

    cy.wait("@deleteUser").its("response.statusCode").should("be.oneOf", [200]);
  });
  it("User can only delete users", () => {
    cy.loginAsUser();
    cy.intercept("DELETE", "**/api/users/1").as("deleteAdmin");
    cy.intercept("DELETE", "**/api/users/2").as("deleteUser");

    cy.get("#delete-admin-button").click();

    cy.get("#delete-status-container").contains(
      "You are not allowed to delete this user!"
    );

    cy.wait("@deleteAdmin")
      .its("response.statusCode")
      .should("be.oneOf", [403]);

    cy.get("#delete-user-button").click();

    cy.get("#delete-status-container").contains(
      "User has been deleted successfully..."
    );

    cy.wait("@deleteUser").its("response.statusCode").should("be.oneOf", [200]);
  });
});
