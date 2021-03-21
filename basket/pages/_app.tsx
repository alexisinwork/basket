import { AppProps } from 'next/app'
import { useState } from 'react'
import AppContext from '../helpers/AppContext'

export default function App({ Component, pageProps }: AppProps) {
  const [shopItems, setItems] = useState({})
  const [itemsNumber, setNumber] = useState(0)

  return (
    <div>
      <AppContext.Provider value={{ shopItems, itemsNumber, setItems, setNumber }}> 
        <Component {...pageProps} />
      </AppContext.Provider>
    </div>
  )
}