import { useAppStore } from '/@/store/modules/app';
import { ProjectConfig } from '/#/config';

export function baseMapbox(value: any) {
  const appStore = useAppStore();
  const config = mapbox(value);
  appStore.setProjectConfig(config);
}

export function mapbox(value: any): DeepPartial<ProjectConfig> {
  const { style, type } = value;
  return {
    mapboxSetting: {
      style,
      type,
    },
  };
}
