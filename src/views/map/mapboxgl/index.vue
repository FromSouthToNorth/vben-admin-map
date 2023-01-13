<template>
  <div ref="mapRef" :class="prefixCls" :style="{width, height}"></div>
</template>

<script lang="ts" setup>
  import 'mapbox-gl/dist/mapbox-gl.css';
  import mapbox from 'mapbox-gl/dist/mapbox-gl.js';
  import {
    computed,
    CSSProperties,
    onBeforeUnmount,
    onDeactivated,
    Ref,
    ref,
    unref,
    watch,
  } from 'vue';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMapBoxGLSetting } from '/@/hooks/setting/useMapBoxGLSetting';
  import { ThemeEnum } from '/@/enums/appEnum';
  import { MapBoxStyleIDEnum } from '/@/enums/mapBoxGlEnum';

  defineProps({
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'calc(100vh - 78px)',
    },
  });

  const { getMapBoxGLTheme } = useMapBoxGLSetting();

  const { prefixCls } = useDesign('map-box-gl');
  const mapRef = ref<ElRef>(null);
  const mapboxGlRef = ref(null) as Ref<Nullable<mapbox.Map>>;

  const styleId = computed(() => {
    const theme = unref(getMapBoxGLTheme);
    return theme == ThemeEnum.DARK ? MapBoxStyleIDEnum.DARK_V10 : MapBoxStyleIDEnum.STREETS_V12;
  });

  const accessToken =
    'pk.eyJ1IjoiaHlzZSIsImEiOiJja3c0ZDNxdTIwNHk1MnBtem5yZ2s4MDJmIn0.Bc8fEfsCPoB_ihTfnQ6zbg';

  function init() {
    mapbox.accessToken = accessToken;
    const mapEL = unref(mapRef) as HTMLElement;

    mapboxGlRef.value = new mapbox.Map({
      container: mapEL,
      style: styleId.value,
      center: [120.57229, 31.28505],
      zoom: 9,
    });
  }

  watch(
    () => styleId.value,
    (v) => {
      console.log(v);
      mapboxGlRef.value.setStyle(v);
    },
  );

  function destroy() {
    const mapInstance = unref(mapboxGlRef);
    if (!mapInstance) return;
    try {
      mapInstance?.destroy?.();
    } catch (error) {}
    mapboxGlRef.value = null;
  }
  onMountedOrActivated(init);

  onBeforeUnmount(destroy);
  onDeactivated(destroy);
</script>

<style lang="less" scoped></style>
