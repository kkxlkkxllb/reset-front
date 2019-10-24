<template>
  <div id="app">
    <div class="header">
      <mu-appbar
        :z-depth='1'
        class="app-header main-container">
        <a class="logo" href='/#/' slot="left">
          <i class="iconfont icon-reset_logo_-" />
        </a>
        <mu-button
          v-for="(item, index) in navs"
          :key='index'
          class="menu-item"
          :class="{active: $route.name === item}"
          :href="`/${item}`"
          flat
          slot="left">
            {{$t('nav.' + item)}}
          </mu-button>
        <div class="language" slot="left">
          <a
            href='#'
            @click.prevent="changLang()">{{lang === 'zh' ? 'English' : '中文'}}</a>
        </div>
        <!-- <div class="search-container" slot="right">
          <mu-button v-show="!showSearchInput" icon class="icon" @click="showSearchInput = true">
            <i class="iconfont icon-Search" />
          </mu-button>
          <mu-text-field
            class="search-input"
            ref="searchInput"
            solo
            @blur="showSearchInput = false"
            placeholder="Search..."
            v-show="showSearchInput" />
        </div> -->
        <mu-button icon slot="right" class='mobile-menu' @click='toggleMobileMenu'>
          <mu-icon :value="mobileMenuExpand ? 'close' : 'menu'"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <div class="main-container"><router-view/></div>
    <FooterOld />
  </div>
</template>
<script>
import FooterOld from '@/components/FooterOld'

export default {
  name: 'App',
  data () {
    return {
      mobileMenuExpand: false,
      showSearchInput: false,
      navs: [
        'standard',
        'certification',
        'network',
        'blogs',
        'about_us'
      ]
    }
  },
  components: {
    FooterOld
  },
  computed: {
    lang () {
      return this.$store.getters.lang
    }
  },
  watch: {
    lang: function (newV) {
      this.$i18n.locale = newV
    },
    showSearchInput: function (newV) {
      if (newV) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus()
        })
      }
    }
  },
  methods: {
    changLang () {
      const lang = this.lang === 'zh' ? 'en' : 'zh'
      this.$store.dispatch('changeLanguage', lang)
    },
    toggleMobileMenu () {
      this.mobileMenuExpand = !this.mobileMenuExpand
    }
  }
}
</script>
<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic')
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Pontano+Sans')
@import url('//at.alicdn.com/t/font_1297427_q7py7lpsujo.css')

$regularWidth = 960px
$mobileWidth = 640px
$primaryColor = #22BBAE

#app
  font-family "Open Sans",Helvetica,Arial,sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  .mu-button
    text-transform initial
    min-width 120px
  .mu-button.menu-item, .mu-button.icon
    min-width auto
  .mobile-menu
    min-width auto
  .content-container
    width $regularWidth
    margin 0 auto
  .mapboxgl-ctrl-attrib-inner, .mapboxgl-ctrl-logo
    display none !important
.mu-primary-color
  background $primaryColor !important
.text-left
  text-align left
.mu-tooltip.bill-popup
  background white
  color #333
  font-size 12px
  &:after
    position absolute
    bottom -20px
    left 50%
    content ''
    margin-left -10px
    width 0
    height 0
    border-width 10px
    border-style solid
    border-color #fff transparent transparent transparent
.mu-popover
  box-shadow 0 2px 8px rgba(0,0,0,.15)
  border-radius 0 0 6px 6px !important
  .mu-list
    .mu-item-title
      font-weight normal
      font-size 14px
      line-height 22px
      color rgba(0,0,0,.65)
.mu-select-content
  padding-left 16px
.custom-selector
  margin-top 35px
  .mu-option.is-selected .mu-item
    color $primaryColor
  .mu-option.is-focused
    background #f1fcfa
  .mu-option
    .hover
      .mu-item-title
        color $primaryColor
      background #f1fcfa
  .mu-item
    padding-top 8px
    padding-bottom 8px
.header
  background white
  position fixed
  top 0
  left 0
  width 100%
  z-index 99
  height 80px
  box-shadow 0 0 5px lightgrey
  .app-header
    position relative
    box-shadow none
    background transparent
    height 100%
    width $regularWidth
    margin 0 auto
    padding 0 15px
    .logo
      color #000
      margin-right 10px
      i
        font-size 60px
    .mobile-menu
      display none
      @media screen and (max-width: $regularWidth)
        display block
    .menu-item
      border-radius 0
      font-size 16px
      button
        font-size 16px
        padding-left 18px
        padding-right 18px
      &:hover,&.active
        background $primaryColor
        color white
      @media screen and (max-width: $regularWidth)
        display none
    &.expand
      .menu-item
        display block
    .mu-appbar-title
      font-size 24px
  .mobile-menu-list
    background #fff
    display none
    &.show
      @media screen and (max-width: $regularWidth)
        display block
  @media screen and (max-width: $regularWidth)
    .app-header
      padding-left 15px
      padding-right 15px
  .language
    padding 0 15px
    a
      color #455769
      &:hover
        text-decoration underline
.main-container
  margin-top 80px
.nav-bar .mu-breadcrumbs-item
  color #333333
.search-container
  margin-left 5px
  position absolute
  right 0
  .search-input
    width: 200px
    padding 5px 10px
    border-radius 5px
    background-color #EEF0F3
.certification-icon
  display inline-block
  background #4F9EF1
  color white
  width 32px
  height 32px
  line-height 32px
  text-align center
  border-radius 50%
</style>
