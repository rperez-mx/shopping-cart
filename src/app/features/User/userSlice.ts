import { createAction, createAsyncThunk, createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { doc, getDoc, getFirestore, addDoc, collection, query, where, getDocs} from 'firebase/firestore'
import { app } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { checkUserUid } from "../../../utils/Users/checkUserUid";

// Define our Firestore config
const db = getFirestore(app)
//Define User Interface
export interface User {
  uid: string,
  displayName: string | null,
  name?: string | null,
  lastName?: string | null,
  email: string | null,
  emailVerified: boolean,
  userPhoto: string | null
}

// Define state interface
export interface UserState {
  user: User,
  isLogged: boolean,
  status: string
}

// Define initial state
const initialState : UserState = {
  user: {} as User,
  isLogged: false,
  status: 'empty'
}
// Define register user async thunk
export const addUser = createAsyncThunk(
  'users/add',
  async (user : User) =>{
    let returnUser: User = {} as User
    let isUserSignedUp : boolean | undefined = await checkUserUid(user.uid)
    if(!isUserSignedUp){
      try {
        const docRef = await addDoc(collection(db, "users"), {
          uid: user.uid,
          displayName: user.displayName,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          emailVerified: user.emailVerified,
          userPhoto: user.userPhoto
        });
        console.log("Document written with ID: ", docRef.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          returnUser = docSnap.data() as User
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
  
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      return returnUser
    } else {
      let returnUser : User = {} as User
      const request = query(collection(db, "users"), where("uid", "==", user.uid))
      const response = await getDocs(request)
      if(response.size==1){
        response.forEach((user)=>{
          returnUser = user.data() as User
        })
      }
      return returnUser
    }
  }
)
export const UserSlice = createSlice({
  name:'UserSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLogged = true
      state.status = 'fulfilled'
    },
    clearUser: (state) => {
      state.isLogged = false
      state.user = {} as User
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state)=>{
      state.status = 'loading'
    }),
    builder.addCase(addUser.fulfilled, (state, action)=>{
      state.user = action.payload
      state.isLogged = true
      state.status = 'fulfilled'
    })
  }
})
export const { setUser, clearUser } = UserSlice.actions
export default UserSlice.reducer