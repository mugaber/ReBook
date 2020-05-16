import React from 'react'
import './library.scss'
import { connect } from 'react-redux'
import BookItem from '../../components/BookItem'
import { Grid } from 'semantic-ui-react'

export const Library = ({ books }) => {
  return (
    <div className='library__container'>
      <Grid stackable container columns={1}>
        {books.map(book => (
          <Grid.Column key={book.id} className='library__book'>
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
