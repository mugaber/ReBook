import React, { Component } from 'react'
import './style.scss'

import _ from 'lodash'
import faker from 'faker'
import { Search } from 'semantic-ui-react'

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$')
}))

export default class SearchExampleStandard extends Component {
  initialState = { isLoading: false, results: [], value: '' }

  state = this.initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(this.initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <>
        <div className='search-bar__container'>
          <Search
            fluid={true}
            size='huge'
            placeholder='Search...'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
          />
        </div>
      </>
    )
  }
}
