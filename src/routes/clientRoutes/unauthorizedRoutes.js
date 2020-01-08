
import UnauthorizedLandingPage from "../../components/Unauthorized/UnauthorizedLandingPage";
import Login from "../../components/Unauthorized/Login.js";
import AccountVerification from "../../components/Unauthorized/AccountVerification.js";
import TwoFactorAuth from "../../components/Unauthorized/TwoFactorAuth/TwoFactorAuth.js";

import BadPage from "../../components/Unauthorized/BadPage";

import ShopDisplay from "../../components/Unauthorized/ShopDisplay/ShopDisplay.js";
import ShopItemDisplay from "../../components/Unauthorized/ShopItemDisplay/ShopItemDisplay.js";
//import DesignIt from "../../components/Unauthorized/DesignIt/DesignIt.js";
import Test from "../../components/Unauthorized/Test.js";
import ShoppingCart from "../../components/Unauthorized/ShoppingCart/ShoppingCart.js";



export default [
    {
        path: "/",
        component: UnauthorizedLandingPage,
        exact: true,
    },
    {
      path:"/test",
      component: Test,
      exact: true,
    },
    {
      path:"/login",
      component: Login,
      exact: true,
    },

    {
      path:"/verification",
      component: AccountVerification,
      exact: true,
    },
    {
      path:"/twofa",
      component: TwoFactorAuth,
      exact: true,
    },
    {
      path:"/ShopDisplay",
      component: ShopDisplay,
      exact: false,
    },
    {
      path:"/ShopItem",
      component: ShopItemDisplay,
      exact: false,
    },
/*
    {
      path:"/DesignIt",
      component: DesignIt,
      exact: false,
    },
*/
    {
      path:"/ShoppingCart",
      component: ShoppingCart,
      exact: false,
    },
    {
        path: "/bad",
        component: BadPage,
        exact: true,
    }


];
