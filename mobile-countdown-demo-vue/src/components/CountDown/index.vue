<!--
 * @Author: zhangpeiwen
 * @Date: 2022-12-08 14:53:12
 * @LastEditTime: 2022-12-08 18:11:42
 * @LastEditors: zhangpeiwen
 * @Description: 
 * @FilePath: \LearnProject\vue-mobile-test\src\components\CountDown\index.vue
-->
<template>
  <div class="count-down">
    <slot v-bind="{
      d:days,
      h:hours,
      m:mins,
      s:secs,
      hh:`00${hours}`.slice(-2),
      mm:`00${mins}`.slice(-2),
      ss:`00${secs}`.slice(-2)
    }"></slot>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  data() {
    return {
      timer: null,
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
    }
  },
  props: {
    time: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    duration() {
      const time = Math.round(+this.time)
      return time
    }
  },
  watch:{
    time:{
      handler(val) {
        this.time = val
        this.beginCountDown(val)
      },
      immediate:true
    }
  },
  methods: {
    beginCountDown(duration) {
      this.getTime(duration)
    },
    getTime(duration) {
      if (duration < 0) {
        this.$emit('end')
        return
      }
      const { d, hh, mm, ss } = this.formatTime(duration)
      this.days = d || 0
      this.hours = hh || 0
      this.mins = mm || 0
      this.secs = ss || 0
      this.timer = setTimeout(()=>{
        this.getTime(duration - 1)
      }, 1000)
    },
    formatTime(time) {
      this.timer && clearTimeout(this.timer)
      if (!time) {
        return {
          ss: 0,
        }
      }
      let t = time
      const ss = t % 60
      t = (t - ss) / 60
      if (t < 1) {
        return {
          ss,
        }
      }
      const mm = t % 60
      t = (t - mm) / 60
      if (t < 1) {
        return {
          mm,
          ss,
        }
      }
      const hh = t % 24
      t = (t - hh) / 24
      if (t < 1) {
        return {
          hh,
          mm,
          ss,
        }
      } else {
        return {
          d: t,
          hh,
          mm,
          ss,
        }
      }
    },
  },
}
</script>

<style>
.count-down {
  font-size: 20px;
  font-weight: 700;
}
</style>
