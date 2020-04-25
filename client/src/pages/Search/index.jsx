import React, { useState, useEffect } from 'react'
import './style.scss'

import ResultItem from '../../components/ResultItem'

import { Search, Grid, Icon, Label } from 'semantic-ui-react'

const parseSearchResults = items =>
  items.map(item => ({
    title: item.volumeInfo.title,
    image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : '',
    booklink: 'to be made',
  }))

//

const SearchPage = () => {
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchString.length < 1) return setIsLoading(false)

      try {
        await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=AIzaSyCtC8yZXVMB8vRg-RAXN7LnEBhN3PwJilA`
        )
          .then(res => res.json())
          .then(data => {
            setSearchResponse(data)
            if (data.totalItems === 0) return setIsLoading(false)
            const parsedData = parseSearchResults(data.items)
            setSearchResults(parsedData)
          })
      } catch (err) {
        console.log(err)
      }

      setIsLoading(false)
    }

    fetchBooks()
  }, [searchString])

  const [isLoading, setIsLoading] = useState(false)

  const [showResults, setShowResults] = useState(false)

  const [searchResponse, setSearchResponse] = useState({})

  const [resultItems, setResultItems] = useState([])

  const handleResultSelect = (e, { result }) => {
    setSearchString(result.title)

    if (searchResponse.items) {
      setResultItems([])
      setResultItems(searchResponse.items)
      setShowResults(true)
    }
  }

  const handleSearchChange = async (e, { value }) => {
    document.getElementsByClassName('results')[0].classList.add('visible')

    setIsLoading(true)
    setSearchString(value)
  }

  const handleSearchEnter = e => {
    if (e.key === 'Enter') {
      document.getElementsByClassName('results')[0].classList.remove('visible')

      if (searchResponse.items) {
        setResultItems([])
        setResultItems(searchResponse.items)
        setShowResults(true)
      }
    }
  }

  return (
    <div className='search-page__container'>
      <div className='search-bar__container'>
        <Search
          autoFocus
          size='huge'
          fluid={true}
          id='search-bar'
          loading={isLoading}
          value={searchString}
          results={searchResults}
          placeholder='Search...'
          onKeyDown={handleSearchEnter}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
        />

        {searchResponse.totalItems && (
          <Label color='teal' floating>
            {searchResponse.totalItems}
          </Label>
        )}

        {searchString && (
          <Icon
            onClick={() => {
              document.getElementById('search-bar').focus()
              setSearchString('')
            }}
            className='delete-icon'
            id='delete-icon'
            name='delete'
          />
        )}
      </div>

      <div className='results__container'>
        <Grid stackable container columns={1}>
          {showResults &&
            resultItems.map(item => <ResultItem key={item.id} item={item} />)}
        </Grid>
      </div>
    </div>
  )
}

export default SearchPage
