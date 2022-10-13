import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc'
import  { app }  from '../../app/firebase/config'
import { addUser, User } from '../../app/features/User/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const auth = getAuth(app);
  const userState = useAppSelector((state: RootState)=>state.userState)
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  useEffect(()=>{
    if(userState.isLogged){
      localStorage.setItem('user', JSON.stringify(userState.user))
      localStorage.setItem('isLogged', String(userState.isLogged))
      navigate('/', {replace:true})
    }
    console.log('userState changed')
  },[userState])
  const [phoneNumber, setPhoneNumber] = useState('0')
  const [showOTP, setShowOTP] = useState(false)
  // const appVerifier = window.recaptchaVerifier;
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(user)
      let uuser = {} as User
      uuser.uid = user.uid
      uuser.displayName = user.displayName
      uuser.name = user.displayName?.split(' ')[0]
      uuser.lastName = user.displayName?.split(' ')[1]
      uuser.email = user.email
      uuser.emailVerified = user.emailVerified
      uuser.userPhoto = user.photoURL
      dispatch(addUser(uuser))

      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  const signIn = () =>{
    setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithGoogle();
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
 }

  const signUp = () =>{
    setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signUpWithGoogle();
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
 }
 const signOut = (auth: Auth) =>{
  auth.signOut().then(() => {
    // Sign-out successful.
    console.log('Gone cx')
  }).catch((error) => {
    // An error happened.
  });
 }
 
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>¡Holaaa!</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            por favor inicia sesi&oacute;n en tu <Link color={'blue.400'}>cuenta</Link>  de Google ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            
          <Button onClick={()=>{signUp()}} w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
          <Center>
            <Text>Iniciar sesi&oacute;n con Google</Text>
          </Center>
        </Button>
          {/* <Divider />
          <Text fontSize={'lg'} color={'gray.600'}>
            ¿No tienes cuenta? <Link color={'blue.400'}>Crea una</Link>
          </Text>
          <Button onClick={()=>{signUp()}} w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
          <Center>
            <Text>Reg&iacute;strate con Google</Text>
          </Center>
        </Button> */}
          </Stack>
        </Box>
      </Stack>
      <div id="recaptcha-container"></div>
    </Flex>
  );
}