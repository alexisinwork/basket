import React, { useContext } from 'react'
import Link from 'next/link'
import AppContext from '../helpers/AppContext'
import { calculateNumber } from '../utils/productUtils'
import { ProductProps } from './Product'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export const CheckoutProduct = ({ product }: ProductProps) => {
  
  const { name, price } = product
  const { shopItems, itemsNumber, setItems, setNumber } = useContext(AppContext)
  
  const onAdd = () => {
    const currentProduct = shopItems[product.sku]
    const number = calculateNumber(currentProduct)
    // We won't add if there is already 10 current items
    if (number !== currentProduct) {
      setNumber(itemsNumber + 1)
    }
    
    const newItems = {
      ...shopItems,
      [product.sku]: number
    }
    
    setItems(newItems)
  }
  
  const onRemove = () => {
    const currentProduct = shopItems[product.sku]
    
    if (currentProduct !== 0) {
      setNumber(itemsNumber-1)
    }
    
    const newItems = {
      ...shopItems,
      [product.sku]: currentProduct > 1 ? currentProduct-1 : 0
    }
    
    setItems(newItems)
  }
  
  if (!shopItems[product.sku]) return null

  return (<div>
    <div>
      {name} ({shopItems[product.sku]}) {price}
    </div>

    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={onAdd}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={onRemove}
      >
        <RemoveIcon />
      </IconButton>
    </div>
  </div>)
}