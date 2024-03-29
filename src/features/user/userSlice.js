import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from '../../utils/axios';
import { addUserToLocalStorage, getUserFromLocalStorage , removeUserFromLocalStorage} from "../../utils/localStorage";

const initialState = {
    isLoading: false,
    isSideBarOpen: false,
    user: getUserFromLocalStorage(),            
};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
      try {
        const resp = await customFetch.post('/auth/register', user);
        return resp.data;
        //console.log("result: " , resp);
        //console.log(`Login User :  ${JSON.stringify(user)}`);
      } catch (error) {
        //toast.error(error.response.data.msg);
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );

export const loginUser =  createAsyncThunk('user/loginUser',async(user,thunkAPI) => {
    //console.log(`Login User :  ${JSON.stringify(user)}`);
    try {
        const resp = await customFetch.post('/auth/login', user);
        return resp.data;
    }catch (error) { 
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
      toggleSidebar: (state) => {
        state.isSideBarOpen = !state.isSideBarOpen;
        //console.log("state : ", state.isSideBarOpen);
      },
      logoutUser: (state) => {
        state.user = null;
        state.isSideBarOpen = false;
        removeUserFromLocalStorage();
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello There ${user.name}`);
          })
          .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
    
            toast.success(`Welcome Back ${user.name}`);
          })
          .addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
    }
});

export const {toggleSidebar, logoutUser} =  userSlice.actions;
export default userSlice.reducer;

