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
      <div class="ap-detail--sider" v-if="apInfo">
        <div class="ap-avatar">
          <mu-avatar :size="212">
            <img :src="ASSET_BASE + apInfo.avatar_url">
          </mu-avatar>
        </div>
        <mu-button color="primary" round @click="showEmail = true">Get the email</mu-button>
        <div class="ap-email" v-show="showEmail">{{apInfo.email}}</div>
        <div class="ap-certification">
          <span class="certification-icon">
            <i class="iconfont icon-RESETAIR" />
          </span>
        </div>
      </div>
      <div class="ap-detail--content" v-if="apInfo">
        <h2>{{apInfo.name}}</h2>
        <div class="ap-company">{{apInfo.company}}</div>
        <div class="ap-location">
          <i class="iconfont icon-location" />
          {{apInfo.location}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { $get } from '@/libs/api'
import { ASSET_BASE } from '@/libs/constant'

export default {
  name: 'apdetail',
  data () {
    return {
      ASSET_BASE,
      apInfo: null,
      showEmail: false
    }
  },
  components: {
  },
  computed: {

  },
  mounted() {
    const apid = this.$route.params.id
    $get(`/web/aps/${apid}`).then(res => {
      console.log(res.data)
      this.apInfo = res.data
    })
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
    .ap-avatar
      margin 32px 0
      line-height 1
    .ap-email
      margin-top 10px
    .ap-certification
      margin-top 10px
  .ap-detail--content
    flex 1 1 auto
    padding 32px
    text-align left
    h2
      margin 0
      font-size 24px
    .ap-company
      font-size 16px
    .ap-location
      color #858585
      font-size 16px
      i
        vertical-align middle
</style>