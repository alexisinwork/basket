import Head from 'next/head'
import { useContext } from 'react'
import styled from 'styled-components'
import { Product, ProductType } from '../components/Product'
import SearchAppBar from '../components/SearchAppBar'
import AppContext, { AppContextProps } from '../helpers/AppContext'

interface HomeProps {
  products: Array<ProductType>;
}

const ProductWrapper = styled.div`
  width: 100%;
  display: flex;
  jsutify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 25px;
`

export default function Home({ products }: HomeProps) {
  return (
    <div>
      <SearchAppBar />
      <ProductWrapper>
        {products.map((product) =>
          <Product key={product.sku} product={product} />
        )}
      </ProductWrapper>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:9001/products')
  const json = await res.json()
  return { products: json }
}