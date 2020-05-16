import React from 'react'
import './alerts.scss'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

export const Alerts = ({ alerts }) => {
  return (
    <div className='alerts__container'>
      {alerts.map(({ id, msg, alertType }) => {
        return (
          <Message
            key={id}
            style={{ margin: 0 }}
            success={alertType === 'success'}
            warning={alertType === 'error'}
          >
            <Message.Header style={{ textAlign: 'center' }}>{msg}</Message.Header>
          </Message>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alerts)
