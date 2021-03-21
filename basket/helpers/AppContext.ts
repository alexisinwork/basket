import React, { Dispatch, SetStateAction } from 'react'

export interface AppContextProps {
  shopItems: { [key: string]: number }
  itemsNumber: number
  setItems: Dispatch<SetStateAction<{ [key: string]: number; }>>
  setNumber: Dispatch<SetStateAction<number>>
}

const AppContext = React.createContext(null)

export default AppContext