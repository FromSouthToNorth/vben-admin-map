import { computed } from 'vue';

import { useAppStore } from '/@/store/modules/app';

export function useMapboxSetting() {
  const appStore = useAppStore();

  const getMapboxStyle = computed(() => appStore.getMapboxSetting.style);

  const getMapboxType = computed(() => appStore.getMapboxSetting.type);

  return {
    getMapboxType,
    getMapboxStyle,
  };
}
