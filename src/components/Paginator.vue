<template>
  <div class="paginator">
    <mu-button flat @click="prev" :disabled="current === 1">
      <mu-icon left value=":iconfont icon-left-long"></mu-icon>
      {{$t('app.PREV')}}
    </mu-button>
    <div class="page-container">
      <mu-text-field solo :value="current" @change="change" /> / <span>{{total}}</span>
    </div>
    <mu-button flat @click="next" :disabled="current === total">
      {{$t('app.NEXT')}}
      <mu-icon right value=":iconfont icon-right-long"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    total: Number,
    current: Number
  },
  methods: {
    change (v) {
      const num = +v
      if (num > 0 && num <= this.total) {
        this.$emit('change', num)
      }
    },
    prev () {
      if (this.current > 1) {
        this.$emit('change', this.current - 1)
      }
    },
    next () {
      if (this.current < this.total) {
        this.$emit('change', this.current + 1)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.paginator
  text-align center
  color #333
  .page-container
    display inline-block
    margin 0 10px
    span
      margin-left 10px
    .mu-input
      padding 0 3px
      border 1px solid #EAEAEA
      width 50px
      height 20px
      line-height 20px
      min-height auto
      text-align center
      font-size 14px
      margin-right 10px
      .mu-text-field-input
        text-align center
        height 100%

</style>
