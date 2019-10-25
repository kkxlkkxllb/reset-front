<template>
  <div class="ap-detail">
    <div class="nav-bar">
      <div class="content-container">
        <mu-breadcrumbs>
          <li class="mu-breadcrumbs-item">
            <a href="/">{{$t('nav.home')}}</a>
          </li>
          <mu-breadcrumbs-item key="home"></mu-breadcrumbs-item>
          <mu-breadcrumbs-item key="ap" to="/">{{$t('nav.ap')}}</mu-breadcrumbs-item>
          <mu-breadcrumbs-item key="apDetail" :disabled="true">{{$t('nav.apDetail')}}</mu-breadcrumbs-item>
        </mu-breadcrumbs>
      </div>
    </div>
    <div class="ap-detail--container">
      <div class="content-container flex-container">
        <div class="ap-detail--sider" v-if="apInfo">
          <div class="ap-avatar">
            <mu-avatar :size="212">
              <img :src="ASSET_BASE + apInfo.avatar_url">
            </mu-avatar>
          </div>
          <mu-button class="get-email-btn" color="primary" round @click="showEmail = true">{{$t('app.getEmail')}}</mu-button>
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
            <span>{{apInfo.location}}</span>
          </div>
          <div class="desc-panel">
            <label>{{$t('app.desc')}}</label>
            <div>-</div>
          </div>
          <div class="desc-panel">
            <label>LinkdIn</label>
            <div>-</div>
          </div>
          <div class="desc-panel">
            <label>{{$t('app.otherCity')}}</label>
            <div>-</div>
          </div>
          <h3>{{$t('app.project')}}</h3>
          <div class="project-card"
            v-for="project in apInfo.projects"
            :key="project.id">
            <div class="p-img">
              <img
                v-if="project.display_images[0]"
                :src="ASSET_BASE + project.display_images[0].url" />
            </div>
            <div class="p-desc">
              <div class="pid">{{project.recognize_id || '&nbsp;'}}</div>
              <div class="p-name1">{{project.native_name || project.name}}</div>
              <div class="p-name2">{{project.name}}</div>
              <div class="p-standard">{{project.standard_type_humanize}}</div>
            </div>
          </div>
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
  mounted () {
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
  background white
  .flex-container
    display flex
    min-height 700px
  .nav-bar
    background #F9F9F9
  .ap-detail--sider
    flex 0 0 288px
    max-width 288px
    background rgba(252,250,247,1)
    box-shadow 2px 2px 6px 0px rgba(83,51,8,0.04)
    .ap-avatar
      margin 32px 0
      line-height 1
      img
        box-shadow 0px 4px 10px 0px rgba(165,165,165,0.37)
    .ap-email
      margin-top 10px
    .get-email-btn
      box-shadow none
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
      margin-top 10px
      margin-bottom 30px
      font-size 16px
      span
        display inline-block
        vertical-align middle
        margin-left 5px
      i
        vertical-align middle
    .desc-panel
      margin-bottom 20px
      font-size 16px
      color #333
      label
        color #858585
        font-size 14px
    h3
      font-size 20px
      border-bottom 1px solid #F4F7FC
      padding-bottom 12px
    .project-card
      display flex
      padding 16px
      background #fff
      box-shadow 0px 4px 20px 0px rgba(102,99,99,0.05)
      border-radius 3px
      .p-img
        flex 0 1 212px
        min-height 117px
        img
          width 100%
          border-radius 3px
      .p-desc
        margin-left 16px
        color #858585
        font-size 12px
        position relative
        .p-name1
          font-size 16px
          color #4D4E4D
        .p-standard
          position absolute
          bottom 5px
</style>
