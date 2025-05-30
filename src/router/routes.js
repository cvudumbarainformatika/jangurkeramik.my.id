const routes = [
  {
    path: '/',
    component: () => import('layouts/TailwindLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'products/:id', component: () => import('pages/ProductDetailPage.vue') },

      { path: 'cart', component: () => import('pages/CartPage.vue') },

      { path: 'orders', component: () => import('pages/HistoryOrdersPage.vue') },
      { path: 'orders/:id', component: () => import('pages/HistoryOrderDetail.vue') },
      { path: 'orders/pembayaran/:id', component: () => import('pages/PembayaranPage.vue') },


      { path: 'promotions', component: () => import('pages/PromotionsPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: 'components', component: () => import('pages/ComponentsDemo.vue') },

      { path: 'history', component: () => import('pages/HistoryPage.vue') },
      { path: 'history/:id', component: () => import('pages/HistoryOrderDetail.vue') },

      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'favorites', component: () => import('pages/FavoritesPage.vue') },

      // auth
      { path: 'auth/social-callback', component: () => import('pages/AuthSocialCallbackPage.vue') },
      { path: 'no-auth', component: () => import('pages/NoAuthPage.vue') },
    ],
  },

  {
    path: '/classic',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'components', component: () => import('pages/ComponentsDemo.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
