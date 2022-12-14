<template>
  <div class="count-down">
    <slot
      v-bind="{
        d: days,
        h: hours,
        m: mins,
        s: secs,
        hh: `00${hours}`.slice(-2),
        mm: `00${mins}`.slice(-2),
        ss: `00${secs}`.slice(-2),
      }"
    ></slot>
  </div>
</template>

<script>
export default {
  name: "CountDown",
  data() {
    return {
      timer: null,
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
      duration: 0, // 记录倒计时时间
      endTime:null
    };
  },
  props: {
    time: {
      type: [Number, String],
      default: 0,
    },
  },
  // computed: {
  //   duration() {
  //     const time = Math.round(+this.time)
  //     return time
  //   }
  // },
  watch: {
    time: {
      handler(val) {
        this.setDuration(val)
        this.reset();
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.pause();
  },
  methods: {
    start() {
      if (this.counting) {
        return;
      }
      this.counting = true;
      this.endTime = Date.now() + this.duration;
      this.getTime(this.duration);
    },
    pause() {
      this.counting = false;
      this.timer && clearTimeout(this.timer);
    },
    reset() {
      this.duration = Math.round(+this.time);
      this.start();
    },
    setDuration(duration) {
      this.duration = duration;
      console.log(this.duration,'set');
      if (duration < 0) {
        this.pause();
        this.$emit("end");
      }
    },
    getDuration() {
      console.log(this.endTime - Date.now(),'diff');
      return Math.max(this.endTime - Date.now(), 0);
    },
    getTime(duration) {
      if (duration < 0) {
        this.$emit("end");
        return;
      }
      const { d, hh, mm, ss } = this.formatTime(duration);
      this.days = d || 0;
      this.hours = hh || 0;
      this.mins = mm || 0;
      this.secs = ss || 0;
      this.setDuration(this.getDuration())
      this.timer = setTimeout(() => {
        this.getTime(duration - 1);
      }, 1000);
    },
    formatTime(time) {
      this.timer && clearTimeout(this.timer);
      if (!time) {
        return {
          ss: 0,
        };
      }
      let t = time;
      const ss = t % 60;
      t = (t - ss) / 60;
      if (t < 1) {
        return {
          ss,
        };
      }
      const mm = t % 60;
      t = (t - mm) / 60;
      if (t < 1) {
        return {
          mm,
          ss,
        };
      }
      const hh = t % 24;
      t = (t - hh) / 24;
      if (t < 1) {
        return {
          hh,
          mm,
          ss,
        };
      } else {
        return {
          d: t,
          hh,
          mm,
          ss,
        };
      }
    },
  },
};
</script>

<style>
.count-down {
  font-size: 20px;
  font-weight: 700;
}
</style>
