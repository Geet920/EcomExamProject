import { publicRequest } from "../requestMethod";
import {
  loginSuccess,
  loginStart,
  loginFailure,
  updateUser,
} from "./userRedux";
import { createWishlist, addToWishlist, updateWishlist } from "./wishRedux";
import { addOrder, updateOrder } from "./orderRedux";

// USER
export const register = async (dispatch, user) => {
  try {
    const signupResponse = await publicRequest.post("auth/register", user);
   
 
    
    dispatch(loginSuccess(signupResponse.data));
    
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const signinResponse = await publicRequest.post("auth/login", user);
    
    dispatch(loginSuccess(signinResponse.data));
    
  } catch (error) {
    dispatch(loginFailure());
    console.error(error);
  }
};
export const updateUserInfo = async (id, user, dispatch) => {
  try {
    const response = await publicRequest.patch(`users/${id}`, user);
    dispatch(updateUser(response.data));
  } catch (error) {
    console.error(error);
  }
};

// WISHLIST
export const updateWishlistProducts = async (id, item, dispatch) => {
  try {
    const response = await publicRequest.patch(`wishlist/${id}`, item);
    dispatch(updateWishlist(response.data));
  } catch (error) {
    console.error(error);
  }
};

// ORDERS

export const getOrders = async (userID, dispatch) => {
  try {
    const response = await publicRequest.get(`orders/${userID}`);
    dispatch(addOrder(response.data));
  } catch (error) {
    console.error(error);
  }
};
export const updateOrderStatus = async (id, item, dispatch) => {
  try {
    const response = await publicRequest.patch(`orders/${id}`, item);
    dispatch(updateOrder(response.data));
  } catch (error) {
    console.error(error);
  }
};
