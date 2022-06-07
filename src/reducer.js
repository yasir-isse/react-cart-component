const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [], loading: false };
  }

  if (action.type === 'REMOVE_ITEM') {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newCart };
  }

  // if (action.type === 'INCREASE') {
  //   const cartItem = state.cart.map((item) => {
  //     if (item.id === action.payload) {
  //       return { ...item, amount: item.amount + 1 };
  //     }
  //     return item;
  //   });
  //   return { ...state, cart: cartItem };
  // }
  if (action.type === 'CHANGE_AMOUNT') {
    const cartItems = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.type === 'INCREASE') {
            return { ...item, amount: item.amount + 1 };
          }
          if (action.payload.type === 'DECREASE') {
            return { ...item, amount: item.amount - 1 };
          }
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    return { ...state, cart: cartItems };
  }

  if (action.type === 'GET_TOTAL') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { amount, price } = cartItem;
        cartTotal.amount += amount;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }

  if (action.type === 'FETCH_DATA') {
    return { ...state, cart: action.payload, loading: false };
  }

  throw new Error('Action not found');
};

export default reducer;
