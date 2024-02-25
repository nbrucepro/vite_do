describe("Vue_abridge e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Render all required todos", () => {
    cy.get(".dragclass").should("be.visible");
  });
  it("opens and closes modal", () => {
    cy.contains(".open-modal-button", "To do +").click();
    cy.get(".fixed").should("be.visible");
    cy.get(".fixed").contains("button", "×").click();
  });

  it("submits form", () => {
    cy.contains(".open-modal-button", "To do +").click();
    cy.get('input[type="text"]').type("Test Todo");
    cy.get("form").submit();
    cy.contains(".dragclass", "Test Todo");
  });
});
