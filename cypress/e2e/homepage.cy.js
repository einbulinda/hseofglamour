describe("Navigation", () => {
  it("Passes", () => {
    cy.visit("http://localhost:3000/");

    cy.title().should("eq", "House of Glamour :: Admin");

    // Check logo of the image
    cy.get("nav>a>img[alt='House of Glamour logo']").click();
    // BEGIN: TOPBAR TESTS
    // Search Input
    cy.get("input");
    cy.get("[placeholder='Search...']").click();

    

    // SideNav Tests
    cy.contains("nav>ul>li", "Dashboard");
    cy.contains("nav>ul>li", "Products").click();
    cy.contains("nav>ul>li", "Users");
  });
});
