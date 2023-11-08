import React from 'react'
import Soundboard from './Soundboard'

describe('<Soundboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Soundboard />)
  })
})