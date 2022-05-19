import { configureStore, } from '@reduxjs/toolkit';
import passengerReducer from "./ducks/passengerducks";
import flightReducer from "./ducks/flightducks";
import uiReducer from "./ducks/uiducks";
import airportReducer from "./ducks/airportducks";
//import rootReducer from './ducks'


export const store = configureStore({
  reducer: {
      //rootReducer: rootReducer,
      passengers: passengerReducer,
      flights: flightReducer,
      ui : uiReducer,
      airports : airportReducer
   },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch