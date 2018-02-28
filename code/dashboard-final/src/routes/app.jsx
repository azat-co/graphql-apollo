import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import OrderList from 'views/OrderList/OrderList';
import ProductList from 'views/ProductList/ProductList';
import Notifications from 'views/Notifications/Notifications';
import Help from 'views/Help/Help';

const appRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/users", name: "Customer List", icon: "pe-7s-user", component: UserProfile },
    { path: "/orders", name: "Customer List", icon: "pe-7s-cart", component: OrderList },
    { path: "/products", name: "Product List", icon: "pe-7s-note2", component: ProductList },
    { path: "/notifications", name: "Notifications", icon: "pe-7s-bell", component: Notifications },
    { help: true, path: "/help", name: "Help", icon: "pe-7s-rocket", component: Help },
    { redirect: true, path:"/", to:"/dashboard", name: "Dashboard" }
];

export default appRoutes;
