import React from 'react'
import { connect } from 'react-redux'
import { addBook } from '../../redux/user/actions'
import { Item, Label, Button } from 'semantic-ui-react'

//

const BookItem = ({ item, addBook, removeSave, addRemove }) => {
  const { volumeInfo, saleInfo, accessInfo } = item

  const handleSave = e => {
    e.stopPropagation()
    addBook(item)
  }

  const handleDelete = e => {
    e.stopPropagation()
  }

  return (
    <Item.Group>
      <Item>
        {volumeInfo.imageLinks && (
          <Item.Image size='tiny' src={`${volumeInfo.imageLinks.smallThumbnail}`} />
        )}

        <Item.Content>
          {volumeInfo.title && <Item.Header>{volumeInfo.title}</Item.Header>}

          {volumeInfo.authors && <Item.Meta>{volumeInfo.authors[0]}</Item.Meta>}

          <Item.Description>
            {volumeInfo.description
              ? `${volumeInfo.description.slice(0, 300)}...`
              : item.searchInfo && item.searchInfo.textSnippet
              ? `${item.searchInfo.textSnippet.slice(0, 300)}...`
              : 'No description available.'}
          </Item.Description>

          <Item.Extra>
            {saleInfo.saleability === 'FREE' ? (
              <Label tag icon='money' content='FREE' />
            ) : saleInfo.listPrice ? (
              <Label
                tag
                icon='money'
                content={`${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}`}
              />
            ) : (
              <Label tag icon='money' content={'For sale'} />
            )}

            {volumeInfo.categories && (
              <Label icon='tag' content={volumeInfo.categories[0]} />
            )}

            {volumeInfo.pageCount && <Label icon='book' content={volumeInfo.pageCount} />}

            {volumeInfo.publishedDate && (
              <Label icon='calendar check' content={volumeInfo.publishedDate} />
            )}

            {volumeInfo.previewLink && (
              <Label
                as='a'
                href={`${volumeInfo.previewLink}`}
                target='_blank'
                rel='noopener noreferrer'
                icon='file alternate outline'
                content='Preview'
              />
            )}

            {volumeInfo.infoLink && (
              <Label
                as='a'
                href={`${volumeInfo.infoLink}`}
                target='_blank'
                rel='noopener noreferrer'
                icon='info'
                content='Info'
              />
            )}

            {accessInfo.pdf.isAvailable && accessInfo.pdf.downloadLink && (
              <Label
                as='a'
                href={`${saleInfo.buyLink}`}
                target='_blank'
                rel='noopener noreferrer'
                icon='file pdf'
                content='Read'
              />
            )}

            {saleInfo.saleability === 'FOR_SALE' && saleInfo.buyLink && (
              <Label
                as='a'
                href={`${saleInfo.buyLink}`}
                target='_blank'
                rel='noopener noreferrer'
                icon='cart'
                content='Buy'
              />
            )}

            {!removeSave && (
              <Button positive floated='right' onClick={handleSave}>
                Save
              </Button>
            )}

            {addRemove && (
              <Button negative floated='right' onClick={handleDelete}>
                Delete
              </Button>
            )}
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default connect(null, { addBook })(BookItem)
