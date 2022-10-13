import { CloseButton, Flex, Link, Select, SelectProps, Stack, useColorModeValue, Image, Box, Text } from '@chakra-ui/react'
import * as React from 'react'
import { deleteItem, updateQuantity } from '../../app/features/cartItems/cartItemSlite'
import { useAppDispatch } from '../../app/hooks'
import { PriceTag } from '../PriceTag'
// import { PriceTag } from './PriceTag'
// import { CartProductMeta } from './CartProductMeta'

type CartItemProps = {
  id: number,
  title: string,
  description: string,
  quantity: number,
  price: number,
  imageUrl: string,
  grand: number
}

const QuantitySelect = (props: SelectProps) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  )
}
function limit (title: string, limit: number) {  
  return title.substring(0, limit) + '...'
}

export default function ShoppingCartItem (props: CartItemProps) {
  const {
    id,
  title,
  description,
  quantity,
  price,
  imageUrl,
  grand
  } = props
  const dispatch = useAppDispatch()
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
       <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={imageUrl}
        alt={title}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{limit(title,25)}</Text>
          <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
          {limit(description,50)}
          </Text>
        </Stack>
        {/* {isGiftWrapping && (
          <HStack spacing="1" mt="3" color={mode('gray.600', 'gray.400')}>
            <Icon as={FiGift} boxSize="4" />
            <Link fontSize="sm" textDecoration="underline">
              Add gift wrapping
            </Link>
          </HStack>
        )} */}
        <PriceTag price={price} />
      </Box>
    </Stack>

      {/* Desktop */}
      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            dispatch(updateQuantity({id: id, quantity: Number(e.currentTarget.value) }))
          }}
        />
        <PriceTag price={grand} />
        <CloseButton aria-label={`Delete ${title} from cart`} 
        onClick={()=>{dispatch(deleteItem(id))}} 
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link onClick={()=>{dispatch(deleteItem(id))}}  fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            dispatch(updateQuantity({id: id, quantity: Number(e.currentTarget.value) }))
          }}
        />
        <PriceTag price={grand} />
      </Flex>
    </Flex>
  )
}