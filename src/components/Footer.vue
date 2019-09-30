<template>
  <div class="footer">
    <div class='main-container'>
      <h2>Learn more about RESET™?</h2>
      <mu-row gutter wrap class='menu'>
        <mu-col lg='2' md='6' span='12'>
          <a href="https://reset.build" target="_blank" rel="noopener">
          RESET™ Website
          </a>
        </mu-col>
        <mu-col lg='2' md='6' span='12'>
          <a href="https://reset.build/standard" target="_blank" rel="noopener">
          RESET™ Air
          </a>
        </mu-col>
        <mu-col lg='3' md='6' span='12'>
          <a href="https://reset.build/certification" target="_blank" rel="noopener">
          RESET™ Air Certification
          </a>
        </mu-col>
        <mu-col lg='3' md='6' span='12'>
          <a href="https://reset.build/standard#programs" target="_blank" rel="noopener">
          RESET™ Air - Core & Shell
          </a>
        </mu-col>
        <mu-col lg='2' md='6' span='12'>
          <a href="https://reset.build/projects" target="_blank" rel="noopener">
          RESET™ Projects
          </a>
        </mu-col>
      </mu-row>
    </div>
    <div class='copyright'>
      <div class='main-container'>
        RESET™ ©2019. All Rights Reserved.
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
  text-align center
  border-top 1px solid #eaeaea
  .copyright
    font-size 14px
    background #F2F3F8
    color #B7B7B7
    padding 12px 0
    font-family Roboto
h2
  font-size 24px
  margin 24px 0
ul
  margin 0
  display flex
  padding 0
.menu
  margin-bottom 24px
  .col
    margin-bottom 10px
  a
    color #858585
    font-size 14px
    &:hover
      text-decoration underline
</style>
