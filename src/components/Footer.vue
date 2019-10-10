<template>
  <div class="footer">
    <div class='content-container'>
      <mu-row gutter wrap class='menu'>
        <mu-col lg='3' md='6' span='12'>
          <h2>What is RESET™?</h2>
          <a href="/">Home</a>
          <a href="https://reset.build/standard" rel="noopener">
          RESET™ Air
          </a>
          <a href="https://reset.build/standard#programs" rel="noopener">
          RESET™ Air - Core & Shell
          </a>
          <a href="https://reset.build/standard#programs" rel="noopener">
          RESET™ Air - Commercial Interiors
          </a>
          <a href="https://reset.build/certification" rel="noopener">
          Certification
          </a>
        </mu-col>
        <mu-col lg='3' md='6' span='12'>
          <h2>How to apply?</h2>
          <a href="https://reset.build/certification#process" rel="noopener">
          Process
          </a>
          <a href="https://reset.build/certification#pricing" rel="noopener">
          Pricing
          </a>
          <h3>Network</h3>
          <a href="https://reset.build/projects">
            RESET™ Projects
          </a>
          <a href="https://reset.build/ap">
            RESET™ AP
          </a>
        </mu-col>
        <mu-col lg='2' md='6' span='12'>
          <h2>About</h2>
          <a href="https://reset.build/about_us" rel="noopener">
          About Us
          </a>
          <a href="https://reset.build/contact">
            Contact Us
          </a>
          <a href="https://reset.build/resources">
            Resources
          </a>
          <a href="https://reset.build/blogs">
            Events & News
          </a>
        </mu-col>
        <mu-col lg='4' md='6' span='12'>
          <h2>Contact Us</h2>
          <div class="has-icon">
            <i class="iconfont icon-mail" />
            <a href="mailto:info@reset.build">
              info@reset.build
            </a>
          </div>
          <div class="has-icon">
            <i class="iconfont icon-tel" />
            +86 (21) 5298 6096  +86 (21) 5265 3616
          </div>
          <div class="has-icon">
            <i class="iconfont icon-location" />
            GIGA 循绿
            <br />
            1F-B,102 Lixi Lu, Changning District
            <br />
            Shanghai 20050
            <br />
            People’s Republic of China
          </div>
        </mu-col>
      </mu-row>
    </div>
    <div class='copyright'>
      <div class='content-container'>
        Copyright GIGA Ltd. 2008-2019
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.footer
  background #292929
  text-align left
  color #fff
  .copyright
    font-size 12px
    background #F2F3F8
    text-align center
    color #fff
    padding 8px 0
    background #000
    font-family Roboto
  h2
    color #fff
    font-size 16px
    margin 32px 0 12px 0
  h3
    color #BCBCBC
    font-size 16px
    margin 16px 0 12px 0
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
