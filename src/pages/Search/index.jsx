import React, { useState, useEffect } from 'react'
import './style.scss'

import { Search, Icon } from 'semantic-ui-react'

const parseBooks = items => {
  const parsedItems = items.map(item => ({
    title: item.volumeInfo.title,
    image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : ''
  }))

  return parsedItems
}

const SearchPage = () => {
  const [searchString, setSearchString] = useState('')

  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchString.length < 1) return setIsLoading(false)

      await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchString}&key=AIzaSyCtC8yZXVMB8vRg-RAXN7LnEBhN3PwJilA`
      )
        .then(res => res.json())
        .then(data => {
          if (data.totalItems === 0) return setIsLoading(false)
          const parsedData = parseBooks(data.items)
          setSearchResults(parsedData)
        })

      setIsLoading(false)
    }

    fetchBooks()
  }, [searchString])

  const [isLoading, setIsLoading] = useState(false)

  const handleResultSelect = (e, { result }) => setSearchString(result.title)

  const handleSearchChange = async (e, { value }) => {
    setIsLoading(true)
    setSearchResults([])
    setSearchString(value)
  }

  const handleSearchEnter = e => {
    if (e.key === 'Enter') {
      alert(searchString)
    }
  }

  return (
    <>
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
    </>
  )
}

export default SearchPage
