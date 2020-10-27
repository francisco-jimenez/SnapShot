/// <reference types="cypress" />

context('Snaphot-test', () => {


  it('load first mountain images ', () => {
    cy.visit('localhost:3000')
    
    cy.wait(4000)
    cy.get("img").should("be.visible");
  })

  it('load barcelona images when searched', () => {
    cy.get('input')
      .type('barcelona')

    cy.get('#searchButton')
      .click()


    cy.wait(4000)
    cy.get("img").should("be.visible");
  })

  it('when I click back in mountains it does not need to make a API call again', () => {
    cy.get('#mountainButton').click()
    cy.wait(150)
    cy.get("img").should("be.visible");
    cy.wait(4000)
  })

  it('after clicking in Mountains, search Text was deleted', () => {
    cy.get('input').should('not.have.value');
  })

  it('when I hover on a picture it shows a tooltip', () => {
    cy.get("img").first()
    .trigger('mouseover')
    cy.get(".popup").should("be.visible");
    cy.wait(4000)
  })

  it('when I click on a picture it shows Modal Info (Google maps iframe it is not available in this window)', () => {
    cy.get("img").first().click()
    cy.get(".modal").should("be.visible");
    cy.wait(4000)
  })

  it('when I click close modal it should close', () => {
    cy.get("#closeModalButton").click()
    cy.get(".modal").should("not.be.visible");
  })
})