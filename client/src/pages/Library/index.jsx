import React from 'react'
import './library.scss'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import BookItem from '../../components/BookItem'

//

export const Library = ({ history, user }) => {
  if (!user.isAuthenticated && !user.user) {
    history.push('/')
    return null
  }

  const {
    user: { books }
  } = user

  return (
    <div className='library__container'>
      {books.length ? (
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
      ) : (
        <div className='library__no-books'>No books in the library</div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Library)
