import React, { Component } from 'react'
import './error-boundary.scss'

export default class ErrorBoundary extends Component {
  constructor() {
    super()

    this.state = {
      hasErrored: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true }
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className='error-image__overlay'>
          <div className='error-image__container' />
          <p className='error-text'>This page is Broken</p>
        </div>
      )
    }

    return this.props.children
  }
}
