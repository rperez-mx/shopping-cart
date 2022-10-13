import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { populateState } from '../../app/features/cartItems/cartItemSlite'
import { Item } from '../../app/features/items/itemSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import ItemCard from '../../components/ItemCard'
import Navbar from '../../components/Navbar'

export default function Home() {
  const items = useAppSelector((state: RootState) => state.items)
  const location = useLocation();
  let cartItems = useAppSelector((state: RootState)=> state.cartItems.cartItems)
  const dispatch = useAppDispatch()
  React.useEffect(()=>{
    console.log('Location has changed')
    if(cartItems.length!==0){
     dispatch(populateState(JSON.parse(localStorage.getItem('cartItems') || "")))
    }
      },[location])
  return (
    <Box  p={50} alignContent={'center'} >
      <Navbar />
      <SimpleGrid alignItems="center" justifyContent="center" columns={{base:1,sm:1, md: 2, lg:3, xl:4}} spacing={25}>
        {items.items.map((item: Item, key: number)=>{
          return <ItemCard key={key} {...item} />
        })}
      </SimpleGrid>
    </Box>
  )
}
