import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Menu,
} from '@chakra-ui/react';
import { Link as Link2 }  from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { MdLogout, MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useTransform } from 'framer-motion';
import { UserState } from '../../app/features/User/userSlice';
export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const userState = useAppSelector((state: RootState)=> state.userState)

  return (
    <Box >
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Shopifai
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {!userState.isLogged && 
          <Link to='/login' >
          <Button
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}>
            Iniciar Sesi&oacute;n
          </Button>
          </Link> }
         {userState.isLogged &&
         <>
                <Avatar
                  size={'sm'}
                  src={
                      userState.user.userPhoto
                  }
                />
       </>}
          <Link to='/shopping-cart' >
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}>
            <MdShoppingCart/>
          </Button>
          </Link> 
          {userState.isLogged && 
          <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'black'}
          bg={'whiteAlpha.100'}
          _hover={{
            bg: 'whiteAlpha.300',
          }}>
          <MdLogout/>
        </Button>
          }
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
      <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      <Stack spacing={4} onClick={ onToggle}>
      <Flex
        py={2}
        as={Link}
        to='#'
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          Men&uacute;
        </Text>
        
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        
      </Flex>

        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          <Link to='/' key={11} >
               Home
              </Link>
          <Link to='/shopping-cart' key={12} >
               Shopping Cart
              </Link>
          {userState.isLogged &&
          <Link to='/logout' key={13} >
          Logout
         </Link>
          }
        </Stack>
    </Stack>
    </Stack>
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const userState = useAppSelector((state: RootState)=> state.userState)
  return (
    <Stack direction={'row'} spacing={4}>
        <Box key={'home'}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                to='/'
               >
                Home
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
    </Stack>
  );
};
const MobileNav = (userState: UserState) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} {...userState}/>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, to }: NavItem, userState: UserState) => {
  const { isOpen, onToggle } = useDisclosure();
  
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        to={to ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
          children.map((child)=>{
            if(child.to=='/logout'){
              return (
                <Link2 onClick={()=>{alert('Estas por cerrar sesion')}} key={child.label} >
                {child.label} asas
              </Link2>
              )
            } else {
              return (
                <Link to='/shopping-cart' key={child.label} >
               fdsgsdf
              </Link>
              )
            }
          })
           }
        </Stack>
      </Collapse>
    </Stack>
  );
};
interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  to?: string;
}
const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Shopping Cart',
    to: '/shopping-cart',
  },
  {
    label: 'Cerrar Sesión',
    to: '/logout'
  }
];

