import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export interface UserState {
  displayName: string;
  email: string;
  uid: string;
}

export interface ReduxState {
  loadingStatus: boolean;
  user: UserState | null;
  status:boolean
}

export const initialReduxState: ReduxState = {
  loadingStatus: false,
  user: null,
  status:false
};

export const userSlice = createSlice({
  name: 'userAuth',
  initialState: initialReduxState,
  reducers: {
    /* This is a reducer function that updates the `user` state in the Redux store. It takes in two
   arguments: `state` and `action`. The `state` argument represents the current state of the Redux
   store, and the `action` argument represents the action that was dispatched to trigger this
   reducer function. */
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    setStatus: (state) => {
      state.status = !state.status;
    },
    /* This is a reducer function that updates the `loadingStatus` state in the Redux store. It takes in
   two arguments: `state` and `action`. The `state` argument represents the current state of the
   Redux store, and the `action` argument represents the action that was dispatched to trigger this
   reducer function. The `action.payload` is a boolean value that indicates whether the loading
   status is true or false. This reducer function sets the `loadingStatus` state in the Redux store
   to the value of `action.payload`. */
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStatus} = userSlice.actions;

export default userSlice.reducer;



export const store =configureStore({
  reducer: {
    authUser: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;