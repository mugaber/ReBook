import React from 'react'
import './style.scss'

import Favicon from '../../shared/favicon.ico'

import {
  Segment,
  Container,
  Grid,
  Header,
  List,
  Divider,
  Image,
  Icon
} from 'semantic-ui-react'

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={16}>
            <Header inverted as='h2' content='ReBook' />
            <h4>Made with ❤ by Mu Gaber, using Google books API</h4>
            <p>Currently you can search for books and save them in the library.</p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />

        <Image centered size='mini' src={Favicon} />

        <List horizontal inverted divided link size='small'>
          <List.Item
            as='a'
            target='_blank'
            href='https://github.com/MuGaber'
            className='footer__link github__link'
          >
            <Icon name='github' size='large' />
          </List.Item>

          <List.Item
            as='a'
            target='_blank'
            href='https://twitter.com/Mu_Gaber'
            className='footer__link twitter__link'
          >
            <Icon name='twitter' size='large' />
          </List.Item>

          <List.Item
            as='a'
            target='_blank'
            href='https://github.com/mugaber'
            className='footer__link linkedin__link'
          >
            <Icon name='linkedin' size='large' />
          </List.Item>
        </List>
      </Container>
    </Segment>
  )
}

export default Footer
