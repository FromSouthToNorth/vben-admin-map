import { computed } from 'vue';

import { useAppStore } from '/@/store/modules/app';

export function useMapBoxGLSetting() {
  const appStore = useAppStore();

  const getMapBoxGLTheme = computed(() => appStore.getMapBoxGLSetting.theme);

  return {
    getMapBoxGLTheme,
  };
}
