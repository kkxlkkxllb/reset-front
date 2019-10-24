<template>
  <div class="footer">
    <div class='content-container'>
      <mu-row gutter wrap class='menu'>
        <mu-col lg='3' md='6' span='12' class="logo-img">
          <img src="/img/icons/logo-white.png" />
        </mu-col>
        <mu-col lg='3' md='6' span='12'>
          <h2>RESET<sup>®</sup>{{$t('footer.what')}}</h2>
          <a href="/">{{$t('nav.home')}}</a>
          <a href="https://reset.build/standard" rel="noopener">
          RESET<sup>®</sup> Air
          </a>
          <a href="https://reset.build/standard#programs" rel="noopener">
          RESET<sup>®</sup> Air - {{$t('footer.cs')}}
          </a>
          <a href="https://reset.build/standard#programs" rel="noopener">
          RESET<sup>®</sup> Air - {{$t('footer.ci')}}
          </a>
          <a href="https://reset.build/certification" rel="noopener">
          {{$t('footer.cert')}}
          </a>
        </mu-col>
        <mu-col lg='3' md='6' span='12'>
          <h2>{{$t('footer.how')}}</h2>
          <a href="https://reset.build/certification#process" rel="noopener">
          {{$t('footer.process')}}
          </a>
          <a href="https://reset.build/certification#pricing" rel="noopener">
          {{$t('footer.pricing')}}
          </a>
          <h2 class="mt-10">{{$t('footer.network')}}</h2>
          <a href="https://reset.build/projects">
            RESET<sup>®</sup> {{$t('footer.projects')}}
          </a>
          <a href="https://reset.build/ap">
            RESET<sup>®</sup> AP
          </a>
        </mu-col>
        <mu-col lg='3' md='6' span='12'>
          <h2>{{$t('footer.about')}}</h2>
          <a href="https://reset.build/about_us" rel="noopener">
            {{$t('footer.aboutUs')}}
          </a>
          <a href="https://reset.build/contact">
            {{$t('footer.contactUs')}}
          </a>
          <a href="https://reset.build/resources">
            {{$t('footer.resource')}}
          </a>
          <a href="https://reset.build/blogs">
            {{$t('footer.news')}}
          </a>
        </mu-col>
      </mu-row>
      <div class='copyright'>
        {{$t('app.copyright')}} GIGA Ltd. 2008-2019
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterOld',
  props: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.footer
  background #455769
  text-align left
  color #fff
  .content-container
    padding 40px
  .copyright
    font-size 14px
    text-align center
    color #ddd
    padding 8px 0
    text-align right
    font-family Roboto
    margin-right 50px
  .logo-img
    img
      width 150px
  h2
    opacity 0.5
    font-weight 500
    font-size 16px
    margin 0 0 2px 0
    &.mt-10
      margin-top 24px
.menu
  margin-bottom 24px
  .col
    margin-bottom 10px
  a
    color #fff
    font-size 14px
    display block
    &:hover
      text-decoration underline
.has-icon
  position relative
  padding-left 30px
  margin-bottom 10px
  .iconfont
    position absolute
    left 0
    top 0
</style>
