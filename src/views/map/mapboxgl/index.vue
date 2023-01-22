<template>
  <div ref="mapRef" :class="prefixCls" :style="{ width, height }"></div>
</template>

<script lang="ts" setup>
  import 'mapbox-gl/dist/mapbox-gl.css';
  import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
  import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
  import { computed, onBeforeUnmount, onDeactivated, Ref, ref, unref, watch } from 'vue';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMapboxSetting } from '/@/hooks/setting/useMapboxSetting';
  import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
  import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js';
  import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
  import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.min.js';
  // import lingShuiJson from '../data/lingshui.json';
  import test from '../data/test.json';

  console.log('../data/test.json: ', test);

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
  const mapboxGlRef = ref(null) as Ref<Nullable<mapboxgl.Map>>;
  const drawLayers = ref<Array<any>>([]);

  const styleId = computed(() => {
    return unref(getMapboxStyle);
  });

  const accessToken =
    'pk.eyJ1IjoiaHlzZSIsImEiOiJja3c0ZDNxdTIwNHk1MnBtem5yZ2s4MDJmIn0.Bc8fEfsCPoB_ihTfnQ6zbg';

  function init() {
    mapboxgl.accessToken = accessToken;
    const mapEL = unref(mapRef) as HTMLElement;
    if (!mapEL) return;
    mapboxGlRef.value = new mapboxgl.Map({
      container: mapEL,
      style: styleId.value,
      center: [106.93026, 30.33385],
      zoom: 12,
    });

    mapboxGlRef.value.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
      }),
    );

    // Add zoom and rotation controls to the map.
    mapboxGlRef.value.addControl(new mapboxgl.NavigationControl());
    const draw = new MapboxDraw();
    mapboxGlRef.value.addControl(draw, 'top-left');
    mapboxglOnLoad();
    mapboxglOnStyleLoad();
  }

  function getMapInstance() {
    const mapInstance = unref(mapboxGlRef);
    return mapInstance;
  }

  function mapboxglOnLoad() {
    const mapInstance = getMapInstance();
    if (!mapInstance) return;
    const array = unref(drawLayers);
    mapInstance.on('draw.create', (e) => {
      const { features } = e;
      array.push(features[0]);
      console.log('draw.create - drawLayers: ', array);
    });
    mapInstance.on('draw.update', (e) => {
      const { features } = e;
      const index = array.findIndex((e: typeof features[0]) => {
        return e.id === features[0].id;
      });
      if (index !== -1) {
        drawLayers[index] = features[0];
      }
      console.log('draw.update - drawLayers: ', array);
    });
    mapInstance.on('draw.delete', (e) => {
      const { features } = e;
      const indexs: Array<any> = [];
      for (const layer of features) {
        const index = array.findIndex((e: typeof layer[0]) => {
          return e.id === layer.id;
        });
        indexs.push(index);
      }
      for (const index of indexs) {
        if (index !== -1) {
          array.splice(index, 1);
        }
      }
      console.log('draw.delete - drawLayers: ', array);
    });
  }

  function mapboxglOnStyleLoad() {
    const mapInstance = getMapInstance();
    if (!mapInstance) return;
    mapInstance.on('style.load', () => {
      mapInstance.addSource('lingShui', {
        type: 'geojson',
        data: test,
      });

      mapInstance.addLayer({
        id: 'park-boundary',
        type: 'fill',
        source: 'lingShui',
        paint: {
          'fill-color': '#f5222d',
          'fill-opacity': 0.1,
        },
        filter: ['==', '$type', 'Polygon'],
      });

      mapInstance.addLayer({
        id: 'park-volcanoes',
        type: 'circle',
        source: 'lingShui',
        paint: {
          'circle-radius': 6,
          'circle-color': '#B42222',
        },
        filter: ['==', '$type', 'Point'],
      });

      mapInstance.addLayer({
        id: 'route',
        type: 'line',
        source: 'lingShui',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#f5222d',
          'line-width': 1,
        },
      });
    });
  }

  watch(
    () => styleId.value,
    (v) => {
      mapboxGlRef.value.setStyle(v);
      mapboxglOnLoad();
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
