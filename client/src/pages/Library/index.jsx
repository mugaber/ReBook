import React from 'react'
import './library.scss'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import BookItem from '../../components/BookItem'

//

export const Library = ({ history, books }) => {
  return (
    <div className='library__container'>
      <Grid stackable container columns={1}>
        {books.map(book => (
          <Grid.Column
            key={book.id}
            className='library__book'
            onClick={() => history.push(`/book/${book.id}`, { item: book })}
          >
            <BookItem item={book} removeSave addRemove />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  books: state.user.user.books
})

export default connect(mapStateToProps)(Library)
