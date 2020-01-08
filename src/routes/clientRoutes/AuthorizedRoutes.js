import AuthorizedLandingPage from "../../components/Authorized/LandingPage/AuthorizedLandingPage.js";

import CardEdit from "../../components/Authorized/CardEdit/CardEdit";
import UserSettingsPage from "../../components/Authorized/UserSettings/UserSettingsPage";
import BadPage from "../../components/Unauthorized/BadPage";


export default [
    {
        path: "/",
        component: AuthorizedLandingPage,
        exact: true,
    },
    {
        path: "/UserSettings",
        component: UserSettingsPage,
        exact: true,
    },
    {
        path: "/CardEdit",
        component: CardEdit,
        exact: true,
    },
    {
        path: "/bad",
        component: BadPage,
        exact: true,
    },

];
