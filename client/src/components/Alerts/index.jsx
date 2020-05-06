import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

export const Alerts = ({ alerts }) => {
  return (
    <>
      {alerts.map(({ id, msg, alertType }) => {
        return (
          <Message key={id} positive={alertType === 'success'} style={{ margin: 0 }}>
            <Message.Header style={{ textAlign: 'center' }}>{msg}</Message.Header>
          </Message>
        )
      })}
    </>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alerts)
