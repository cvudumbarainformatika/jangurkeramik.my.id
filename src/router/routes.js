const routes = [
  {
    path: '/',
    component: () => import('layouts/TailwindLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'products/:id', component: () => import('pages/ProductDetailPage.vue') },
      { path: 'categories', component: () => import('pages/CategoriesPage.vue') },
      { path: 'promotions', component: () => import('pages/PromotionsPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: 'components', component: () => import('pages/ComponentsDemo.vue') },
      { path: 'cart', component: () => import('pages/CartPage.vue') },
      { path: 'history', component: () => import('pages/HistoryPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'favorites', component: () => import('pages/FavoritesPage.vue') },

      // auth
      { path: 'auth/social-callback', component: () => import('pages/AuthSocialCallbackPage.vue') },
      // { path: 'auth', component: () => import('pages/AuthPage.vue') }
    ]
  },
  
  {
    path: '/classic',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'components', component: () => import('pages/ComponentsDemo.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
