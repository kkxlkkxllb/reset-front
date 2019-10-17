<template>
  <div class="home">
    <div
      ref="basicMapbox"
      class="map-area"
    >
      <template v-if="map">
        <div
          v-for="(city,i) in cityList"
          :key='i'
          class="city-marker"
          :class="mapLoad ? 'show' : ''"
          :style="markerStyle(city[1])"
          :ref="`city-${i}`"
        >
         <span class="mp-dot" :style="`background: ${getColor(city[1])[0]}`"></span>
        </div>
      </template>
      <div class="desc-card">
        <div class="title">{{$t('AP.mapHint')}}</div>
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
          <mu-breadcrumbs-item key="home" to="/">{{$t('nav.home')}}</mu-breadcrumbs-item>
          <mu-breadcrumbs-item key="ap" :disabled="true">{{$t('nav.ap')}}</mu-breadcrumbs-item>
        </mu-breadcrumbs>
      </div>
    </div>
    <div class="content-container">
      <div class="city-filter">
        <div class="input-with-border-icon">
          <div class="icon"><i class="iconfont icon-Search" /></div>
          <input
            type='text'
            :value="searchKey"
            @blur="doSearch"
            @keyup.enter="doSearch"
            :placeholder="$t('AP.searchHint')" />
        </div>
        <div class="filter-advance">
          <mu-row gutter>
            <mu-col span="6">
              <div class="input-with-border-icon">
                <div class="label">{{$t('AP.country')}}</div>
                <mu-select
                  solo
                  @change="countryChanged"
                  v-model='currentCountry'
                  popover-class='custom-selector'>
                  <mu-option :key="-1" label="All Country" :value="-1"></mu-option>
                  <mu-option
                    v-for="(v,i) in Object.keys(cityDict)"
                    :key="i"
                    :label="v"
                    :value="v"></mu-option>
                </mu-select>
              </div>
            </mu-col>
            <mu-col span="6">
              <div class="input-with-border-icon">
                <div class="label">{{$t('AP.city')}}</div>
                <mu-select
                  solo
                  @change='cityChanged'
                  v-model='currentCity'
                  popover-class='custom-selector'>
                  <mu-option :key="-1" label="All Cities" :value="-1"></mu-option>
                  <mu-option
                    v-for="(v,i) in cityListForSelector"
                    :key="i"
                    :label="v"
                    :value="v"></mu-option>
                </mu-select>
              </div>
            </mu-col>
          </mu-row>
          <span class="clear-btn" @click="resetForm">{{$t('AP.clear')}}</span>
        </div>
      </div>
      <div class="ap-list">
        <div class="ap-number">
          {{$t('AP.currentNum')}}: {{totalCount}}
        </div>
        <mu-circular-progress
          v-show="showLoader"
          class="loader" :size="36"></mu-circular-progress>
        <div class="list-table" v-show="!showLoader">
          <table>
            <thead>
              <tr>
                <th class="ap-avatar"></th>
                <th class="text-left">{{$t('AP.name')}}</th>
                <th class="text-left">{{$t('AP.location')}}</th>
                <th>{{$t('AP.certification')}}</th>
                <th>{{$t('AP.projects')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ap in apList"
                :key="ap.id"
                class="ap-item"
                @click="navToApDetail(ap.id)">
                <td class="avatar-item">
                  <mu-avatar :size="48">
                    <img :src="ASSET_BASE + ap.avatar_url">
                  </mu-avatar>
                </td>
                <td class="text-left">
                  <div class="ap-name">{{ap.name}}</div>
                  <div class="ap-company">{{ap.company}}</div>
                </td>
                <td class="text-left">
                  {{ap.location}}
                </td>
                <td style="width: 120px">
                  <span class="certification-icon">
                    <i class="iconfont icon-RESETAIR" />
                  </span>
                </td>
                <td style="width: 120px">
                  {{ap.projects_count}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Paginator
          v-if="totalPage > 1"
          :total="totalPage"
          :current="currentPage"
          @change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { MAPBOX_TOKEN,
  MAPBOX_STYLE,
  ASSET_BASE,
  AP_MAP_COLOR_LIST,
  CITY_GEO_DATA } from '@/libs/constant'
import mapboxgl from 'mapbox-gl'
import Color from 'color'
import { $get } from '@/libs/api'
import { getBounds } from 'geolib'
import _ from 'lodash'
import Paginator from '../components/Paginator'
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeo = require('@mapbox/mapbox-sdk/services/geocoding')
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles')
mapboxgl.accessToken = MAPBOX_TOKEN
const geoService = mbxGeo({ accessToken: MAPBOX_TOKEN })
const PER_PAGE = 20

export default {
  name: 'aphome',
  data () {
    return {
      ASSET_BASE,
      map: null,
      mapLoad: false,
      showLoader: true,
      colorList: AP_MAP_COLOR_LIST,
      searchKey: '',
      currentCountry: -1,
      currentCity: -1,
      cityList: [],
      cityDict: {},
      apList: [],
      currentPage: 1,
      totalPage: 1,
      totalCount: 0
    }
  },
  components: {
    Paginator
  },
  mounted () {
    if (this.map) {
      return
    }
    this.map = new mapboxgl.Map({
      container: this.$refs.basicMapbox,
      style: MAPBOX_STYLE,
      center: [121.48, 31.22],
      zoom: 1.3,
      minZoom: 1,
      maxZoom: 18,
      scrollZoom: false
    }).on('load', () => {
      this.fetchLocationList(async cityList => {
        let i = 0
        for (let city of cityList) {
          await this.getCityCenter(city[0]).then(center => {
            console.log(city[0], center)
            new mapboxgl.Marker({
              element: this.$refs[`city-${i}`][0]
            })
            .setLngLat(center)
            .addTo(this.map)
          })
          i = i + 1
        }
      })
      this.fetchAPList()
      this.mapLoad = true
    })
    var nav = new mapboxgl.NavigationControl()
    this.map.addControl(nav, 'bottom-right')
  },
  watch: {
    currentPage: function (page) {
      this.fetchAPList({ page })
    }
  },
  computed: {
    cityListForSelector () {
      if (this.currentCountry !== -1) {
        return this.cityDict[this.currentCountry]
      }
      return _.flatten(Object.keys(this.cityDict).map(k => this.cityDict[k]))
    }
  },
  methods: {
    changePage (page) {
      this.currentPage = +page
    },
    resetForm () {
      this.searchKey = ''
      this.currentCountry = -1
      this.currentCity = -1
      this.fetchAPList()
    },
    countryChanged (value) {
      this.fetchAPList({country: value})
    },
    cityChanged (value) {
      this.fetchAPList({city: value})
    },
    doSearch (e) {
      this.searchKey = e.target.value
      this.fetchAPList({
        project_name: this.searchKey
      })
    },
    fetchAPList (option = {}) {
      this.$progress.start()
      this.showLoader = true
      // 只翻页
      if (option.page) {
        this.options = Object.assign(this.options, option)
      } else {
        this.options = Object.assign({size: PER_PAGE, page: 1}, option)
      }
      $get('/web/aps', this.options).then(res => {
        const { aps, total_page, total_count } = res.data
        this.apList = aps
        this.totalPage = total_page
        this.totalCount = total_count
        this.$progress.done()
        this.showLoader = false
      })
    },
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
    getCityCenter (name) {
      return new Promise((resolve, reject) => {
        if (CITY_GEO_DATA[name]) {
          resolve(CITY_GEO_DATA[name])
        } else {
          geoService.forwardGeocode({
            query: name,
            types: ['place'],
            limit: 1
          }).send()
          .then(response => {
            const match = response.body;
            if (match.features[0]) {
              resolve(match.features[0].center)
            } else {
              console.error(name, 'fail')
              reject()
            }
          })
        }
      })
    },
    navToApDetail (id) {
      this.$router.history.push('/ap/' + id)
    },
    fetchLocationList (done) {
      $get('/web/aps/locations').then(res => {
        if (res.data) {
          const cityDict = {}
          const cityData = {}
          for (let item of Object.keys(res.data)) {
            const itemArr = item.replace(/(\s|\"|\[|\])/g, '').split(',')
            if (itemArr[1] !== 'nil') {
              cityDict[itemArr[1]] = cityDict[itemArr[1]] || []
              if (itemArr[0] !== 'nil') {
                const primaryCity = itemArr[0].split('/')[0]
                if (cityDict[itemArr[1]].indexOf(primaryCity) === -1) {
                  cityDict[itemArr[1]].push(primaryCity)
                }
                cityData[primaryCity] = cityData[primaryCity] || 0
                cityData[primaryCity] += res.data[item]
              }
            }
          }
          this.cityList = Object.keys(cityData).map(e => [e, cityData[e]])
          this.cityDict = cityDict
          done(this.cityList)
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
$primaryColor = #648EFA
$activeColor = #22BBAE

.loader
  margin 50px 0
.home
  height 100%
  margin-top 80px
  background #fff
  padding-bottom 80px
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
  display none
  &.show
    display block
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
  margin 40px 0 15px 0
  box-shadow 0px 7px 14px 1px rgba(185,194,193,0.05),0px 3px 6px 0px rgba(93,115,110,0.07)
  border-radius 4px
.input-with-border-icon
  border 1px solid #EEF1F6
  height 31px
  line-height 31px
  display flex
  .icon
    width 50px
    text-align center
    color #858585
  .label
    width auto
    padding 0 12px
    color #858585
    flex 0 0 auto
    line-height 30px
  input
    width 100%
    flex 1 1 auto
    outline 0
    padding 6px 16px
    border none
    border-left 1px solid #EEF1F6
    &:focus
      box-shadow none
      border 1px solid $activeColor
.filter-advance
  margin-top 15px
  padding-right 100px
  position relative
  .mu-input
    min-height 0
    padding 0 0 0 16px
    width 100%
    flex 1 1 auto
    border-left 1px solid #EEF1F6
    font-size 14px
  .clear-btn
    position absolute
    bottom 5px
    right 0px
    display inline-block
    width 100px
    cursor pointer
    text-align center
    color $activeColor
.ap-list .ap-number
  text-align left
.ap-avatar
  width 50px
.ap-number
  color #B7B7B7
  font-size 12px
  margin 16px
.ap-item
  cursor pointer
  border-top 1px solid rgba(244,247,252,1)
  &:hover
    background #f5f5f5
  td
    padding 10px 0
    color #858585
    font-size 14px
  .avatar-item
    width 88px
  .ap-name
    font-size 16px
    font-weight 600
    color #333
  .ap-company
    font-size 13px
.list-table
  padding-bottom 16px
  table
    width 100%
    border-collapse collapse
    border-spacing 0
    th
      padding 16px 0
</style>
