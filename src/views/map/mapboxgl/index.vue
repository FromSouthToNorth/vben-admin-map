<template>
  <div ref="mapRef" :class="prefixCls" :style="{ width, height }"></div>
</template>

<script lang="ts" setup>
  import 'mapbox-gl/dist/mapbox-gl.css';
  import * as mapbox from 'mapbox-gl/dist/mapbox-gl.js';
  import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
  import { computed, onBeforeUnmount, onDeactivated, Ref, ref, unref, watch } from 'vue';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMapboxSetting } from '/@/hooks/setting/useMapboxSetting';

  defineProps({
    width: {
      type: String,
      default: '100wh',
    },
    height: {
      type: String,
      default: 'calc(100vh - 78px)',
    },
  });

  const { getMapboxStyle } = useMapboxSetting();

  const { prefixCls } = useDesign('map-box-gl');
  const mapRef = ref<ElRef>(null);
  const mapboxGlRef = ref(null) as Ref<Nullable<mapbox.Map>>;

  const styleId = computed(() => {
    return unref(getMapboxStyle);
  });

  const accessToken =
    'pk.eyJ1IjoiaHlzZSIsImEiOiJja3c0ZDNxdTIwNHk1MnBtem5yZ2s4MDJmIn0.Bc8fEfsCPoB_ihTfnQ6zbg';

  function init() {
    mapbox.accessToken = accessToken;
    const mapEL = unref(mapRef) as HTMLElement;

    mapboxGlRef.value = new mapbox.Map({
      container: mapEL,
      style: styleId.value,
      center: [104.0633, 30.6597],
      zoom: 9,
    });

    // Add zoom and rotation controls to the map.
    mapboxGlRef.value.addControl(new mapbox.NavigationControl());
  }

  watch(
    () => styleId.value,
    (v) => {
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
