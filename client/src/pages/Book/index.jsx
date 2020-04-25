import React, { useState } from 'react'
import './book.scss'

import BookItem from '../../components/BookItem'
import { Grid, Button, Icon } from 'semantic-ui-react'

//

const BookPage = ({ location }) => {
  const item = location.state.item
  const { volumeInfo, accessInfo } = item

  const [loaded, setLoaded] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  const handleViewClick = () => {
    console.log(item)
    const ISBN = volumeInfo.industryIdentifiers[0].identifier

    if (!loaded) {
      window.viewCanvas(ISBN, 'viewCanvas')
      setViewOpen(true)
      return setLoaded(true)
    }

    if (viewOpen) {
      document.getElementById('viewCanvas').style.display = 'none'
      return setViewOpen(false)
    }

    if (!viewOpen) {
      document.getElementById('viewCanvas').style.display = 'block'
      return setViewOpen(true)
    }
  }

  return (
    <div className='book-page__container'>
      <Grid.Column className='book__container'>
        <BookItem item={item} />
      </Grid.Column>

      {/* view embed book canvas */}

      {accessInfo.embeddable && volumeInfo.industryIdentifiers.length && (
        <div className='canvas-buttons__container'>
          {!viewOpen ? (
            <Button animated fluid color='teal' onClick={handleViewClick}>
              <Button.Content visible>View Book</Button.Content>
              <Button.Content hidden>
                <Icon name='book' />
              </Button.Content>
            </Button>
          ) : (
            <Button animated fluid color='grey' onClick={handleViewClick}>
              <Button.Content visible>Hide Book</Button.Content>
              <Button.Content hidden>
                <Icon name='hide' />
              </Button.Content>
            </Button>
          )}
        </div>
      )}

      <div id='viewCanvas' className={viewOpen ? 'open-view' : ''}></div>
    </div>
  )
}

export default BookPage
