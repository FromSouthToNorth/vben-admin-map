import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const mapboxgl: AppRouteModule = {
  path: '/map',
  name: 'Map',
  component: LAYOUT,
  redirect: '/map/mapboxgl',
  meta: {
    orderNo: 10,
    icon: 'mdi:mapbox',
    title: t('routes.dashboard.mapboxgl'),
  },
  children: [
    {
      path: 'mapboxgl',
      name: 'MapboxGL',
      component: () => import('/@/views/map/mapboxgl/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.mapboxgl'),
      },
    },
  ],
};

export default mapboxgl;
