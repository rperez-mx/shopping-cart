import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  AspectRatio,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { add } from '../../app/features/cartItems/cartItemSlite';
import { Item } from '../../app/features/items/itemSlice';
import { useAppDispatch } from '../../app/hooks';

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

interface RatingProps {
  rate: number;
  count: number;
}

function Rating({ rate, count }: RatingProps) {
  return (
    <Box alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rate * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rate ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {count} review{count > 1 && 's'}
      </Box>
    </Box>
  );
}

function limit (title: string, limit: number) {  
  return title.substring(0, limit) + '...'
}
export default function ItemCard(props: Item) {
  const dispatch = useAppDispatch()
  return (
    <Flex>
      <Box w="full"
        bg={useColorModeValue('white', 'gray.800')}
        maxW={'calc(33vh)'}
        alignContent='center'
        alignItems={'center'}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">
        {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}
        <AspectRatio maxH={'calc(33vh)'} maxW={'calc(33vh)'} ratio={1}>
        <Image
        // maxW={'calc(25vh)'}
        // maxH={'calc(25vh)'}
          src={props.image}
          alt={`Picture of ${props.title}`}
          roundedTop="lg"
        />
</AspectRatio>
        <Box p="6">
          <Box alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              >
                <Tooltip
              label={props.title}
              bg="white"
              placement={'top'}
              color={'gray.800'}
              margin-bottom='250vh'
              fontSize={'1.2em'}>
              {limit(props.title,25)}
              </Tooltip>
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={'top'}
              color={'gray.800'}
              margin-bottom='250vh'
              fontSize={'1.2em'}>
              <chakra.a  display={'flex'}>
                <Icon onClick={()=>{ (dispatch(add(props)))}} as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center" direction={'row'}>
            <Rating rate={props.rating.rate} count={props.rating.count} />
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
                £
              </Box>
              {props.price}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}