const user = {
  name: "greg bastianelli",
  username: "gregpants",
  password: "password",
};

const otherUser = {
  name: "greg otherpants",
  username: "otherpants",
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
    cy.request("POST", "http://localhost:3003/api/users/", otherUser);

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

    cy.get("input#username").type("wronguser");
    cy.get("input#password").type("wrongpass");
    cy.get("#loginButton").click();

    cy.contains("Invalid username/password combination");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login(user.username, user.password);
    });

    it("A blog can be created via form", function () {
      cy.contains("Create Blog").click();
      cy.get("input#title").type(blog.title);
      cy.get("input#author").type(blog.author);
      cy.get("input#url").type(blog.url);
      cy.get("input#submitBlog").click();
      cy.contains("View").click();
    });

    describe.only("and atleast one blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test title",
          author: "someauthor",
          url: "example.com",
        });
      });

      it("a blog can be liked", function () {
        cy.contains("View").click();
        cy.get("p.likes").contains("Likes: 0");
        cy.get("button.likesButton").click();
        cy.get("p.likes").contains("Likes: 1");
      });

      it("can only be deleted by the assigned user", function () {
        cy.contains("Logout").click();
        cy.login(otherUser.username, otherUser.password);
        cy.get("button.delete").should("not.exist");
      });

      it("blogs are sorted by likes", function () {
        cy.createBlog({
          title: "Hideaway: A Novel",
          author: "Nora Roberts",
          url: "example.com/nora",
        });

        cy.createBlog({
          title: "Bobiverse",
          author: "Diablo Kody",
          url: "example.com/diablo",
        });

        cy.get(".blog:last").contains("View").click();

        cy.get(".blog:last")
          .find(".likesButton")
          .click()
          .then(() => {
            cy.visit("http://localhost:3000");
            cy.get(".blog:first").contains("Bobiverse - Diablo Kody");
          });
      });
    });
  });
});
