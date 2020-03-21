import React from 'react'

import { Item, Grid, Label } from 'semantic-ui-react'

const ResultItem = ({ item }) => {
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
                  <Label icon='calendar check' content={item.volumeInfo.publishedDate} />
                )}

                {item.volumeInfo.previewLink && (
                  <Label
                    as='a'
                    href={`${item.volumeInfo.previewLink}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    icon='file alternate outline'
                    content='Preview'
                  />
                )}

                {item.volumeInfo.infoLink && (
                  <Label
                    as='a'
                    href={`${item.volumeInfo.infoLink}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    icon='info'
                    content='Info'
                  />
                )}

                {item.accessInfo.pdf.isAvailable && item.accessInfo.pdf.downloadLink && (
                  <Label
                    as='a'
                    href={`${item.saleInfo.buyLink}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    icon='file pdf'
                    content='Read'
                  />
                )}

                {item.saleInfo.saleability === 'FOR_SALE' && item.saleInfo.buyLink && (
                  <Label
                    as='a'
                    href={`${item.saleInfo.buyLink}`}
                    target='_blank'
                    rel='noopener noreferrer'
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
}

export default ResultItem
