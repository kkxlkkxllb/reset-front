<template>
  <div class="ap-detail">
    <div class="nav-bar">
      <div class="content-container">
        <mu-breadcrumbs>
          <mu-breadcrumbs-item key="home" to="/">{{$t('nav.home')}}</mu-breadcrumbs-item>
          <mu-breadcrumbs-item key="ap" to="/ap">{{$t('nav.ap')}}</mu-breadcrumbs-item>
          <mu-breadcrumbs-item key="apDetail" :disabled="true">{{$t('nav.apDetail')}}</mu-breadcrumbs-item>
        </mu-breadcrumbs>
      </div>
    </div>
    <div class="ap-detail--container content-container">
      <div class="ap-detail--sider">
        <div class="ap-avatar"> </div>
        <mu-button color="primary" round>Get the email</mu-button>
      </div>
      <div class="ap-detail--content">
        <h2>Christine Bruckner</h2>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'apdetail',
  data () {
    return {

    }
  },
  components: {
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style lang='stylus' scoped>
.ap-detail--container
  display flex
  min-height 700px
  .nav-bar
    background #F9F9F9
  .ap-detail--sider
    flex 0 1 288px
    width 288px
    background rgba(252,250,247,1)
    box-shadow 2px 2px 6px 0px rgba(83,51,8,0.04)
  .ap-detail--content
    flex 1 1 auto
</style>