import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const intitalState = {
  loading: false,
  cart: cartItems,
  amount: 0,
  total: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intitalState);

  const fetchData = async () => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await fetch(url);
      const cartData = await response.json();
      await dispatch({ type: 'FETCH_DATA', payload: cartData });
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.cart, state.amount]);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // const increase = (id) => {
  //   dispatch({ type: 'INCREASE', payload: id });
  // };
  // const decrease = (id) => {
  //   dispatch({ type: 'DECREASE', payload: id });
  // };

  const changeAmount = (id, type) => {
    dispatch({ type: 'CHANGE_AMOUNT', payload: { id, type } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        // increase,
        // decrease,
        changeAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
