import IndexPage from './pages/index.vue';

const routes = [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/detail/:id',
    asyncComponent: () => import('./pages/detail.vue'),
  },
  {
    path: '/company/:id',
    asyncComponent: () => import('./pages/company.vue'),
  },
  {
    path: '/map',
    asyncComponent: () => import('./pages/map.vue'),
  },
];

export default routes;
