<!--
 * @Author: zhangpeiwen
 * @Date: 2022-12-08 10:10:57
 * @LastEditTime: 2022-12-08 18:13:04
 * @LastEditors: zhangpeiwen
 * @Description: 
 * @FilePath: \LearnProject\vue-mobile-test\src\views\CountDownPage\index.vue
-->
<template>
  <div class="countdown">
    <div class="countdown-box-wrap">
      <div
        :class="[
          'time-animate-box',
          runningFlag ? 'animate-state-running' : 'animate-state-pause',
        ]"
        v-show="runningFlag"
      ></div>
      <div class="time-box">
        <CountDown :time="duration" v-slot="timeObj" @end="handleCountDownEnd">
          {{timeObj.d}}:{{timeObj.hh}}:{{timeObj.mm}}:{{timeObj.ss}}
        </CountDown>
      </div>
    </div>
    <div class="button-wrap">
      <button @click="handleChangeState" class="btn-state">
        {{ runningFlag ? '暂停计时' : '开始计时' }}
      </button>
    </div>
  </div>
</template>

<script>
import CountDown from '@/components/CountDown'
export default {
  name: 'CountDownPage',
  data() {
    return {
      runningFlag: true,
      duration: 10,
      endFlag:false
    }
  },
  components:{
    CountDown
  },
  methods: {
    handleChangeState() {
      if(!this.endFlag) {
        this.duration = 10
      }
      this.runningFlag = !this.runningFlag
    },
    handleCountDownEnd() {
      this.endFlag = true
      this.runningFlag = false
    }
  },
}
</script>

<style lang="less" scoped>
@keyframes boxscale {
  0% {
    opacity: 0.6;
  }
  60% {
    transform: scale(1.5);
    opacity: 0.1;
  }
  100% {
    opacity: 0.6;
  }
}
.countdown {
  width: 100vw;
  height: 100vh;
  background-color: seagreen;
  overflow: hidden;
  .countdown-box-wrap {
    margin: 200px auto;
    position: relative;
    width: 500px;
    height: 500px;
    .time-animate-box,
    .time-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .time-animate-box {
      width: 300px;
      height: 300px;
      border-radius: 150px;
      background-color: rgb(210, 255, 210);
      animation: boxscale 5s ease-in infinite;
      transform-origin: 450px 450px;
    }
    .time-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 300px;
      border-radius: 150px;
      background-color: rgb(210, 255, 210);
    }
    .animate-state-running {
      animation-play-state: running;
    }
    .animate-state-pause {
      animation-play-state: paused;
    }
  }
  .button-wrap {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .btn-state {
      padding: 20px;
      border-radius: 4px;
      background-color: rgb(210, 255, 210);
      font-size: 14px;
      letter-spacing: 2px;
    }
  }
}
</style>
