import React, { useContext } from 'react'
import Link from 'next/link'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import AppContext from '../helpers/AppContext'
import styled from 'styled-components'
import { calculateNumber } from '../utils/productUtils'

export interface ProductType {
  description: string;
  name: string;
  price: number;
  sku: number;
}

export interface ProductProps {
  product: ProductType;
}

const StyledCard = styled(Card)`
  margin: 10px;
  flex-grow: 1;
  height: 170px;
`

export const Product = ({ product }: ProductProps) => {
  const { description, name, price, sku } = product
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

  return (
    <StyledCard>
      <CardContent>
        <div>
          <Badge badgeContent={`$ ${price}`} color="secondary">
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {name}
            </Typography>
          </Badge>
        </div>

        <Typography color="textSecondary" gutterBottom>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onAdd} size="small">Add to basket</Button>
        <Link href="/checkout">
          <a>Checkout</a>
        </Link>
      </CardActions>
    </StyledCard>
  )
}