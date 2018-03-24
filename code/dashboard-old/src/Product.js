import React from 'react'
import {Link} from 'react-router-dom'

export default class Product extends React.Component {
  render () {
    return (
      <Link
        className='btn'
        to={`/products/${this.props.product.id}`}>
        <div className='image'
          style={{backgroundImage: `url(${this.props.product.imageUrl})`}}
        />
        <div className=''>
          {this.props.product.description}
        </div>
      </Link>
    )
  }
}
