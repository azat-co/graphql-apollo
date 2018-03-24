import DashboardView from 'views/dashboard/dashboard-view'
import OrdersView from 'views/orders/orders-view'
import ProductsView from 'views/products/products-view'
import NotificationsView from 'views/notifications/notifications-view'
import HelpView from 'views/help/help-view'

const appRoutes = [
    { path: '/dashboard', name: 'Dashboard', icon: 'pe-7s-graph', component: DashboardView },
    { path: '/orders', name: 'Order List', icon: 'pe-7s-cart', component: OrdersView },
    { path: '/products', name: 'Product List', icon: 'pe-7s-note2', component: ProductsView },
    { path: '/notifications', name: 'Notifications', icon: 'pe-7s-bell', component: NotificationsView },
    { help: true, path: '/help', name: 'Help', icon: 'pe-7s-rocket', component: HelpView },
    { redirect: true, path: '/', to: '/dashboard', name: 'Dashboard' }
]

export default appRoutes
