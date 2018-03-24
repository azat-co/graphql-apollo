import React, {Component} from 'react'
import { Grid } from 'react-bootstrap'

class Footer extends Component {
  render () {
    return (
      <footer className='footer'>
        <Grid>
          <nav className='pull-left'>
            <ul>
              <li>
                <a href='http://azat.co'>
                                &copy; {(new Date()).getFullYear()} Azat Mardan
                                </a>
              </li>
              <li>
                <a href='https://github.com/azat-co/graphql-apollo'>
                                    GitHub
                                </a>
              </li>
              <li>
                <a href='https://manning.com/books/react-quickly'>
                                    React Quickly
                                </a>
              </li>
              <li>
                <a href='#pablo'>
                                   Blog
                                </a>
              </li>
            </ul>
          </nav>
        </Grid>
      </footer>
    )
  }
}

export default Footer
