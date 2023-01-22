import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const comp: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/markdown',
  meta: {
    orderNo: 30,
    icon: 'ion:layers-outline',
    title: t('routes.demo.comp.comp'),
  },

  children: [
    {
      path: 'markdown',
      component: getParentLayout('MarkdownDemo'),
      name: 'MarkdownDemo',
      meta: {
        title: t('routes.demo.editor.markdown'),
      },
      redirect: '/comp/editor/markdown/index',
      children: [
        {
          path: 'json',
          component: () => import('/@/views/demo/editor/json/index.vue'),
          name: 'JsonEditorDemo',
          meta: {
            title: t('routes.demo.editor.jsonEditor'),
          },
        },
        {
          path: 'index',
          name: 'MarkDownBasicDemo',
          component: () => import('/@/views/demo/editor/markdown/index.vue'),
          meta: {
            title: t('routes.demo.editor.tinymceBasic'),
          },
        },
        {
          path: 'editor',
          name: 'MarkDownFormDemo',
          component: () => import('/@/views/demo/editor/markdown/Editor.vue'),
          meta: {
            title: t('routes.demo.editor.tinymceForm'),
          },
        },
      ],
    },

    {
      path: 'tinymce',
      component: getParentLayout('TinymceDemo'),
      name: 'TinymceDemo',
      meta: {
        title: t('routes.demo.editor.tinymce'),
      },
      redirect: '/comp/editor/tinymce/index',
      children: [
        {
          path: 'index',
          name: 'TinymceBasicDemo',
          component: () => import('/@/views/demo/editor/tinymce/index.vue'),
          meta: {
            title: t('routes.demo.editor.tinymceBasic'),
          },
        },
        {
          path: 'editor',
          name: 'TinymceFormDemo',
          component: () => import('/@/views/demo/editor/tinymce/Editor.vue'),
          meta: {
            title: t('routes.demo.editor.tinymceForm'),
          },
        },
      ],
    },
  ],
};

export default comp;
