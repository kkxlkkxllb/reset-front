<template>
  <div class="home">
    <div
      ref="basicMapbox"
      class="map-area"
    >
      <template v-if="map">
        <div
          v-for="(loc,i) in cityList"
          :key='i'
          class="city-marker"
          :style="markerStyle(loc[1])"
          :ref="`city-${loc[0]}`"
        >
         <span class="mp-dot" :style="`background: ${getColor(loc[1])[0]}`"></span>
        </div>
      </template>
      <div class="desc-card">
        <div class="title">Presence of RESET Air Accredited Professionals Globally</div>
        <div class="color-list">
          <mu-row>
            <mu-col v-for="(color, i) in colorList" :key='i'>
              <div class="color-item" :style="'border-color:' + color[0]">
                <span>{{color[1]}}</span>
              </div>
            </mu-col>
          </mu-row>
        </div>
      </div>
    </div>
    <div class="nav-bar">
      <div class="content-container">
        <mu-breadcrumbs>
          <mu-breadcrumbs-item key="home" to="/">Home</mu-breadcrumbs-item>
          <mu-breadcrumbs-item key="ap" :disabled="true">The RESET Air Accredited Professionals</mu-breadcrumbs-item>
        </mu-breadcrumbs>
      </div>
    </div>
    <div class="content-container">
      <div class="city-filter">
        <div class="search-input-by-name">
          <div class="icon"><i class="iconfont icon-Search" /></div>
          <input type='text' placeholder="Search by project name" />
        </div>
        <mu-select solo v-model='currentCity' popover-class='city-selector'>
          <mu-option :key="-1" label="All Cities" :value="-1"></mu-option>
          <mu-option
            v-for="(city,index) in cityList"
            :key="index"
            :label="city[0]"
            :value="index"></mu-option>
        </mu-select>
      </div>
      <div class="ap-list">ss</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// https://api.mapbox.com/styles/v1/before201/ck0vv346u08sg1cozfg8wzvb9.html?fresh=true&title=true&access_token=pk.eyJ1IjoiYmVmb3JlMjAxIiwiYSI6ImNqc3Zrcmt4ZTA4MjA0NHByeGJzc3RlcmcifQ.WJvTbm3U9W9WG1Jp2d573A#1.28/27.6/9.2
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '@/libs/constant'
import mapboxgl from 'mapbox-gl'
import Color from 'color'
import { $get } from '@/libs/api'
import { getBounds } from 'geolib'
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeo = require('@mapbox/mapbox-sdk/services/geocoding')
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles')
mapboxgl.accessToken = MAPBOX_TOKEN
const geoService = mbxGeo({ accessToken: MAPBOX_TOKEN });

export default {
  name: 'home',
  data () {
    return {
      map: null,
      colorList: [
        ['#FCFFF1', 5, 15],
        ['#D9F4F8', 10, 30],
        ['#8FCED2', 15, 45],
        ['#4DAAFE', 20, 60],
        ['#4D71FE', 25, 85],
        ['#5A58F8', 40, 100]
      ],
      currentCity: -1,
      cityList: [
        ['Shanghai', 20],
        ['Bangalore', 2],
        ['Singapore', 2],
        ['New Delhi', 20]
      ]
    }
  },
  components: {
  },
  async mounted () {
    if (this.map) {
      return
    }
    // this.$progress.start()
    this.map = new mapboxgl.Map({
      container: this.$refs.basicMapbox,
      style: MAPBOX_STYLE,
      center: [121.48, 31.22],
      zoom: 1.3,
      minZoom: 1,
      maxZoom: 18,
      scrollZoom: false
    }).on('load', () => {
      // this.fetchLocationList()
    })
    var nav = new mapboxgl.NavigationControl()
    this.map.addControl(nav, 'bottom-right')
    for (let city of this.cityList) {
      await this.addCityMarker(city[0])
    }
  },
  methods: {
    getColor (num) {
      let targetColor = this.colorList[0]
      for (let color of this.colorList) {
        if (num < color[1]) {
          targetColor = color
          break
        }
      }
      return targetColor
    },
    markerStyle (num) {
      const colorObj = this.getColor(num)
      const bgColor = Color(colorObj[0]).alpha(0.8)
      return `width: ${colorObj[2]}px;
        height: ${colorObj[2]}px;
        background: ${bgColor};
        border: 1px solid ${colorObj[0]}`
    },
    addCityMarker (name) {
      return new Promise((resolve, reject) => {
        this.getCityCenter(name, (center) => {
          console.log(this.$refs[`city-${name}`], center)
          new mapboxgl.Marker({
            element: this.$refs[`city-${name}`][0]
          })
            .setLngLat(center)
            .addTo(this.map)
          resolve()
        }, reject)
      })
    },
    getCityCenter (name, done, fail) {
      geoService.forwardGeocode({
        query: name,
        types: ['place'],
        limit: 1
      }).send()
      .then(response => {
        const match = response.body;
        if (match.features[0]) {
          done(match.features[0].center)
        } else {
          fail()
        }
      })
    },
    fetchLocationList () {
      $get('locations').then(resp => {
        resp.data.forEach(e => {
          e.center = [parseFloat(e.lng || 0), parseFloat(e.lat || 0)]
        })
        /* @location obj
         - address
         - city
         - country
         - data_source
         - description
         - id
         - image
         - indicators
         - is_reset
         - last_updated_at
         - lat
         - lng
         - monitor_count
         - name
         - time_zone
        */
        this.locations = resp.data
        this.$progress.done()
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
$primaryColor = #648EFA

.home
  height 100%
  margin-top 80px
  background #fff
  .content-container
    width 960px
    margin 0 auto
.map-area
  height 612px
  position relative
.mapboxgl-ctrl-logo
  display none !important
.desc-card
  z-index 9
  width 426px
  position absolute
  bottom 20px
  left 50%
  margin-left -213px
  background #fff
  box-shadow 0px 3px 10px 0px rgba(72,112,155,0.02)
  border-radius 4px
  padding 12px
  text-align center
  .title
    font-size 14px
    font-weight 600
  .color-list
    width 192px
    margin 0 auto
    margin-top 8px
    position relative
    &:before
      content '1'
      position absolute
      bottom 0
      left -4px
      color #858585

  .color-item
    border-top 8px solid transparent
    color #858585
    font-size 12px
    position relative
    text-align right
    span
      margin-right -6px
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
.nav-bar
  background #F9F9F9
.city-filter
  padding 16px
  margin 40px 0
  box-shadow 0px 7px 14px 1px rgba(185,194,193,0.05),0px 3px 6px 0px rgba(93,115,110,0.07)
  border-radius 4px
.search-input-by-name
  border 1px solid #EEF1F6
  height 31px
  line-height 31px
  display flex
  .icon
    width 50px
    text-align center
  input
    width 100%
    flex 1 1 auto
    outline 0
    padding 6px 16px
    border none
    border-left 1px solid #EEF1F6
    &:focus
      box-shadow none
// .location-filter
//   position absolute
//   right 10px
//   top 10px
//   background white
//   z-index 10
//   padding 8px 16px
//   box-shadow 0px 3px 16px 0px rgba(201,208,227,0.25)
//   border-radius 2px
//   opacity 0.97
//   color #333
//   font-size 14px
//   .is-solo
//     margin-left 8px
//     width 142px
//     border 1px solid rgba(244,247,252,1)
//     padding 0
//     min-height auto
</style>
