import { useAppStore } from '/@/store/modules/app';

export function setMapboxStyle(mapStyle: string) {
  const appStore = useAppStore();
  appStore.setMapboxStyle(mapStyle);
}
