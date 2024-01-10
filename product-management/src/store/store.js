import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './Login/Login.slice'
import productReducer from "./Product/Product.slice"

const store = configureStore({
  reducer: {
    login: loginReducer,
    product:productReducer,
  }
})
export default store