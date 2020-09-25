const user = {
  name: "greg bastianelli",
  username: "gregpants",
  password: "password",
};

const blog = {
  title: "We Are Legion (We Are Bob)",
  author: "Dennis E. Taylor",
  url: "https://www.goodreads.com/book/show/32109569-we-are-legion-we-are-bob",
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("allows user to login with valid credentials", function () {
    cy.contains("login");

    cy.get("input#username").type(user.username);
    cy.get("input#password").type(user.password);
    cy.get("#loginButton").click();

    cy.contains("greg bastianelli is logged in");
  });

  it("shows an error when a user logs in with wrong credentials", function () {
    cy.contains("login");

    cy.login("wronguser", "wrongpass");

    cy.contains("Invalid username/password combination");
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login(user.username, user.password);
    });

    it("A blog can be created via form", function () {
      cy.contains("Create Blog").click();
      cy.get("input#title").type(blog.title);
      cy.get("input#author").type(blog.author);
      cy.get("input#url").type(blog.url);
      cy.get("input#submitBlog").click();
    });

    it("A created blog can be liked by a user", function () {
      cy.contains("View").click();
      cy.get("button.likesButton").click();
      cy.get("p.likes").contains("Likes: 1");
    });
  });
});
