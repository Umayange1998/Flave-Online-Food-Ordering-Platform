import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import {food_list} from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

  const addToCart =  async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
        await axios.post(`${BASE_URL}/cart`, { itemId }, {headers:{token}});
    }
  };

  const removeFromCart =  async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
        await axios.delete(`${BASE_URL}/cart`, {data: {itemId}, headers:{token}} );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find(
          (product) => product._id === (item),
        );
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const fetchFoodList = async () => {
    try {
        const response = await axios.get(BASE_URL + "/food");
        setFoodList(response.data);
    } catch (error) {
        console.error("Error fetching food list:", error);
    }};

    const loadCartItems = async (token) => {
        const response = await axios.post(`${BASE_URL}/cart/get`, {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

  useEffect(() => {
    
    async function fetchData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      await loadCartItems(localStorage.getItem("token"));
    }
    }
    fetchData();
  }, []);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    BASE_URL,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
