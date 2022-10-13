import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartItem, populateState } from '../../app/features/cartItems/cartItemSlite'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import ShoppingCartItem from '../../components/ShoppingCartItem'
// import { CartItem } from './CartItem'
// import { CartOrderSummary } from './CartOrderSummary'
// import { cartData } from './_data'
import Navbar from '../../components/Navbar'
import OrderDetail from '../../components/OrderDetails'
export default function ShoppingCart(){
  const location = useLocation();
  let cartItems = useAppSelector((state: RootState)=> state.cartItems.cartItems)
  const dispatch = useAppDispatch()
  React.useEffect(()=>{
console.log('cartItems has changed')
return () => {
  console.log('Child unmounted');
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  
};
  },[cartItems])
  React.useEffect(()=>{
console.log('Location has changed')
if(cartItems.length!==0){
 dispatch(populateState(JSON.parse(localStorage.getItem('cartItems') || "")))
}
  },[location])
  React.useEffect(()=>{
    if(cartItems.length==0){
      cartItems  =  JSON.parse(localStorage.getItem('cartItems') || "")
     }
  },[])
  return(
  <Box
    
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Navbar />
    <Stack
    marginTop={'50px'}
      direction={{ base: 'column', lg: 'row' }}
      align={{ lg: 'flex-start' }}
      spacing={{ base: '8', md: '16' }}
    >
      <Stack spacing={{ base: '8', md: '10' }} flex="2">
        <Heading fontSize="2xl" fontWeight="extrabold">
         {cartItems.length>0 ? 'Shopping Cart '+ cartItems.length+ ' items' : 'Aún no haz agregado nada al carrito'}
        </Heading>

        <Stack spacing="6">
          {cartItems.map((item) => (
            <ShoppingCartItem key={item.id} {...item} />
          ))}
        </Stack>
      </Stack>

      <Flex direction="column" align="center" flex="1">
        <OrderDetail />
        <HStack mt="6" fontWeight="semibold">
          <p>or</p>
          <Link to='/' color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
        </HStack>
      </Flex>
    </Stack>
  </Box>
)
      }