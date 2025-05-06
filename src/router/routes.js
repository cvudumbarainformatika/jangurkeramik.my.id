const routes = [
  {
    path: '/',
    component: () => import('layouts/TailwindLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'categories', component: () => import('pages/CategoriesPage.vue') },
      { path: 'promotions', component: () => import('pages/PromotionsPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') },
      { path: 'components', component: () => import('pages/ComponentsDemo.vue') }
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
