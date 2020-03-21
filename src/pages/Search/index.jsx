import React, { useState, useEffect } from 'react'
import './style.scss'

import { Search, Grid, Item, Icon, Label } from 'semantic-ui-react'

const parseSearchItems = items => {
  const parsedItems = items.map(item => ({
    title: item.volumeInfo.title,
    image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : '',
    booklink: 'to be made'
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
          console.log(data)
          setSearchResponse(data)
          if (data.totalItems === 0) return setIsLoading(false)
          const parsedData = parseSearchItems(data.items)
          setSearchResults([])
          setSearchResults(parsedData)
        })

      setIsLoading(false)
    }

    fetchBooks()
  }, [searchString])

  const [isLoading, setIsLoading] = useState(false)

  const [showResults, setShowResults] = useState(false)

  const [searchResponse, setSearchResponse] = useState({})

  const [searchItems, setSearchItems] = useState([])

  const handleResultSelect = (e, { result }) => {
    setSearchString(result.title)

    if (searchResponse.items) {
      setSearchItems([])
      setSearchItems(searchResponse.items)
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
        setSearchItems([])
        setSearchItems(searchResponse.items)
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
            searchItems.map(item => {
              return (
                <Grid.Column key={item.id}>
                  <div className='item__container'>
                    <Item.Group>
                      <Item>
                        {item.volumeInfo.imageLinks && (
                          <Item.Image
                            size='tiny'
                            src={`${item.volumeInfo.imageLinks.smallThumbnail}`}
                          />
                        )}

                        <Item.Content>
                          {item.volumeInfo.title && (
                            <Item.Header>{item.volumeInfo.title}</Item.Header>
                          )}

                          {item.volumeInfo.authors && (
                            <Item.Meta>{item.volumeInfo.authors[0]}</Item.Meta>
                          )}

                          <Item.Description className='item__description'>
                            {item.volumeInfo.description
                              ? item.volumeInfo.description
                              : item.searchInfo && item.searchInfo.textSnippet
                              ? item.searchInfo.textSnippet
                              : 'No description available.'}
                          </Item.Description>

                          <Item.Extra>
                            {item.saleInfo.saleability === 'FREE' ? (
                              <Label tag icon='money' content='FREE' />
                            ) : item.saleInfo.listPrice ? (
                              <Label
                                tag
                                icon='money'
                                content={`${item.saleInfo.listPrice.amount} ${item.saleInfo.listPrice.currencyCode}`}
                              />
                            ) : (
                              <Label tag icon='money' content={'For sale'} />
                            )}

                            {item.volumeInfo.categories && (
                              <Label icon='tag' content={item.volumeInfo.categories[0]} />
                            )}

                            {item.volumeInfo.pageCount && (
                              <Label icon='book' content={item.volumeInfo.pageCount} />
                            )}

                            {item.volumeInfo.publishedDate && (
                              <Label
                                icon='calendar check'
                                content={item.volumeInfo.publishedDate}
                              />
                            )}

                            {item.volumeInfo.previewLink && (
                              <Label
                                as='a'
                                href={`${item.volumeInfo.previewLink}`}
                                target='_blank'
                                icon='file alternate outline'
                                content='Preview'
                              />
                            )}

                            {item.volumeInfo.infoLink && (
                              <Label
                                as='a'
                                href={`${item.volumeInfo.infoLink}`}
                                target='_blank'
                                icon='info'
                                content='Info'
                              />
                            )}

                            {item.accessInfo.pdf.isAvailable &&
                              item.accessInfo.pdf.downloadLink && (
                                <Label
                                  as='a'
                                  href={`${item.saleInfo.buyLink}`}
                                  target='_blank'
                                  icon='file pdf'
                                  content='Read'
                                />
                              )}

                            {item.saleInfo.saleability === 'FOR_SALE' &&
                              item.saleInfo.buyLink && (
                                <Label
                                  as='a'
                                  href={`${item.saleInfo.buyLink}`}
                                  target='_blank'
                                  icon='cart'
                                  content='Buy'
                                />
                              )}
                          </Item.Extra>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </div>
                </Grid.Column>
              )
            })}
        </Grid>
      </div>
    </div>
  )
}

export default SearchPage
