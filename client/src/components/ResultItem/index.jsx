import React from 'react'
import { useHistory } from 'react-router-dom'

import BookItem from '../BookItem'
import { Grid } from 'semantic-ui-react'

//

const ResultItem = ({ item }) => {
  const history = useHistory()

  const handleClick = e => {
    e.stopPropagation()
    history.push(`/book/${item.id}`, { item })
  }

  return (
    <Grid.Column key={`item-${item.id}`} onClick={handleClick}>
      <div className='item__container'>
        <BookItem item={item} />
      </div>
    </Grid.Column>
  )
}

export default ResultItem
