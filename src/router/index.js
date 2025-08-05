import { createRouter, createWebHashHistory } from 'vue-router';
import DayView from '../components/DayView.vue';
import AdminPanel from '../components/AdminPanel.vue';

const routes = [
  ...Array.from({ length: 14 }, (_, i) => ({
    path: `/day/${i + 1}`,
    name: `Day${i + 1}`,
    component: DayView,
    props: { dayNumber: i + 1 }
  })),
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
