describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "greg bastianelli",
      username: "gregpants",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("allows user to login with valid credentials", function () {
    cy.contains("login");
    cy.get("input#username").type("gregpants");
    cy.get("input#password").type("password");
    cy.get("#loginButton").click();

    cy.contains("greg bastianelli is logged in");
  });

  it("shows an error when a user logs in with wrong credentials", function () {
    cy.contains("login");
    cy.get("input#username").type("greg");
    cy.get("input#password").type("wrongpass");
    cy.get("#loginButton").click();

    cy.contains("Invalid username/password combination");
  });
});
