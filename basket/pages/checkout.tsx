import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import AppContext from '../helpers/AppContext'
import { calculateNumber } from '../utils/productUtils'
import { ProductType } from '../components/Product'
import SearchAppBar from '../components/SearchAppBar'
import { CheckoutProduct } from '../components/CheckoutProduct'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

interface CheckoutProps {
  products: Array<ProductType>;
}

const StyledButton = styled(Button)`
  margin: 10px 0;
`

export default function Checkout({ products }: CheckoutProps) {
  const [promoCode, setPromoCode] = useState()
  const [promoValue, setPromoValue] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const { shopItems, setItems, setNumber } = useContext(AppContext)

  const onValueChange = (event) => {
    setPromoValue(event.target.value)
  }

  const getTotalPrice = () => {
    const arr = Object.keys(shopItems)
      .map(sku => products.find(pr => pr.sku === +sku).price * shopItems[sku])
    
      if (arr.length > 0) {
        return arr.reduce((acc, price) => acc = acc + price)
      }
    
      return 0
  }

  const checkPromo = async () => {
    try {
      const res = await fetch('http://localhost:9001/promocode', {
        method: 'POST',
        body: JSON.stringify({ "promoCode": promoValue })
      })
      const json = await res.json()
      if (!json.errors) {
        setPromoCode(json)
      }
    } catch (err) {
      alert(err.message)
    } 
  }

  const checkout = async () => {
    const basketBE = []
    Object.keys(shopItems).map(sku => basketBE.push({ sku: sku, quantity: 5 }))
    const res = await fetch('http://localhost:9001/checkout', {
      method: 'POST',
      body: JSON.stringify({
        basket: basketBE,
        cardNumber: '5598208090357951'
      })
    })
    const json = await res.json()
    alert(json.msg)
    setItems([])
    setNumber(0)
    setPromoCode({})
    setPromoValue('')
  }

  useEffect(() => {
    shopItems && setTotalPrice(getTotalPrice())
  }, [shopItems])

  return (<div>
    <SearchAppBar />

    <Link href="/">
      <StyledButton variant="contained">
        <a>Continue shopping</a>
      </StyledButton>
    </Link>

    {products.map((product) =>
      <CheckoutProduct key={product.sku} product={product} />
    )}

    <div>
      Promo: <input value={promoValue} onChange={onValueChange} />
      <Button onClick={checkPromo}>
        Apply
      </Button>
    </div>

    <div>
      Total: `${promoCode ? (totalPrice * (1-promoCode.amount/100)).toFixed(2) : totalPrice.toFixed(2)}`
    </div>

    <div onClick={checkout}>Checkout</div>
  </div>)
}

Checkout.getInitialProps = async () => {
  const res = await fetch('http://localhost:9001/products')
  const json = await res.json()
  return { products: json }
}