export const mapboxRouter = '/map/mapbox';

export enum MapboxStyleIDEnum {
  // 街道
  STREETS_V12 = 'mapbox://styles/mapbox/streets-v12',
  // 户外
  OUTDOORS_V12 = 'mapbox://styles/mapbox/outdoors-v12',
  // light
  LIGHT_V11 = 'mapbox://styles/mapbox/light-v11',
  // dark
  DARK_V11 = 'mapbox://styles/mapbox/dark-v11',
  // 卫星
  SATELLITE_V9 = 'mapbox://styles/mapbox/satellite-v9',
  // 卫星街道
  SATELLITE_STREETS_V12 = 'mapbox://styles/mapbox/satellite-streets-v12',
  // 导航 (白天)
  NAVIGATION_DAY_V1 = 'mapbox://styles/mapbox/navigation-day-v1',
  // 导航 (夜晚)
  NAVIGATION_NIGHT_V1 = 'mapbox://styles/mapbox/navigation-night-v1',
}

export enum MapboxStyleTypeEnum {
  STREETS = 'streets',

  OUTDOORS = 'outdoors',

  LIGHT = 'light',

  DARK = 'dark',

  SATELLITE = 'satellite',

  SATELLITE_STREETS = 'satellite-streets',

  NAVIGATION_DAY = 'navigation-day',

  NAVIGATION_NIGHT = 'navigation-night',
}
