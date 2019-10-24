<template>
  <div class='city-point'>
    <mu-tooltip
      placement="top"
      tooltip-class="bill-popup"
      :content="`${city.name}, ${city.count} ${$t('AP.people')}`">
      <div class="city-marker" :style="markerStyle(city.count)" ref='dot'>
        <span class="mp-dot" :style="`background: ${getColor(city.count)[0]}`"></span>
      </div>
    </mu-tooltip>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import {
  AP_MAP_COLOR_LIST } from '@/libs/constant'
import Color from 'color'

export default {
  name: 'CityPoint',
  props: ['map', 'city'],
  /* map: mapbox instance  */
  mounted () {
    new mapboxgl.Marker({
      element: this.$refs.dot
    })
      .setLngLat(this.city.center)
      .addTo(this.map)
  },
  methods: {
    getColor (num) {
      let targetColor = AP_MAP_COLOR_LIST[0]
      for (let color of AP_MAP_COLOR_LIST) {
        if (num < color[1]) {
          targetColor = color
          break
        }
      }
      return targetColor
    },
    markerStyle (num) {
      const colorObj = this.getColor(num)
      const bgColor = Color(colorObj[0]).alpha(0.7)
      return `width: ${colorObj[2]}px;
        height: ${colorObj[2]}px;
        background: ${bgColor};
        border: 1px solid ${colorObj[0]}`
    }
  }
}
</script>
<style lang='stylus' scoped>
$primaryColor = #648EFA

.city-marker
  border-radius 50%
  position absolute
  .mp-dot
    display inline-block
    width 6px
    height 6px
    border-radius 50%
    position absolute
    left 50%
    margin-left -3px
    top 50%
    margin-top -3px
</style>
