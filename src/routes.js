import IndexPage from './pages/index.vue';

const routes = [
  {
    path: '/',
    component: IndexPage,
    keepAlive: true,
  },
  {
    path: '/detail/:id',
    asyncComponent: () => import('./pages/detail.vue'),
  },
  {
    path: '/company/:id',
    asyncComponent: () => import('./pages/company.vue'),
  },
];

export default routes;
