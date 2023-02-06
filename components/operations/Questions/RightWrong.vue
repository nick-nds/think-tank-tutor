<script setup>
import { watchEffect } from 'vue'

const props = defineProps(['expression'])

watchEffect(() => {
  console.log("watch", props.expression)
})

</script>

<template>
    <div v-if="props.expression.status === true" class="circle green">
      <div class="tick"></div>
    </div>
    <div v-if="props.expression.status === false" class="circle red">
      <div class="cross"></div>
    </div>
</template>
<style>

:root {
  --green: #45db81;
  --w: 80px;
  --t: calc(var(--w) / 10);
  --dur: 1.5s;
}

.circle {
  position: relative;
  width: var(--w);
  height: var(--w);
  border-radius: var(--w);
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center;
  -webkit-animation: circle var(--dur) cubic-bezier(0.67, 0.67, 0.75, 1.1);
  animation: circle var(--dur) cubic-bezier(0.67, 0.67, 0.75, 1.1);
  -webkit-animation-delay: var(--delay);
  animation-delay: var(--delay);
  margin: 40px;
}

.circle::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transform-origin: center;
  -webkit-animation: circleInner var(--dur) ease-out;
  animation: circleInner var(--dur) ease-out;
  -webkit-animation-delay: var(--delay);
  animation-delay: var(--delay);
  box-shadow: 0 3px 8px -1px rgba(0, 0, 0, 0.25);
}

.green {
  background: rgba(54, 186, 60, 0.2);
  --delay: 0s;
}

.green::before {
  background: #36ba3c;
}

.red {
  background: rgba(237, 29, 37, 0.2);
  --delay: 1.5s;
}

.red::before {
  background: #ed1d25;
}

.tick {
  width: calc(var(--w) / 2);
  height: calc(var(--w) / 4);
  transform: rotate(-45deg) translate(5%, -2.5%);
}

.cross {
  width: calc(var(--w) / 2);
  height: calc(var(--w) / 2);
  transform: rotate(-45deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.tick::before,
.tick::after,
.cross::before,
.cross::after {
  content: "";
  position: absolute;
  background-color: white;
  border-radius: calc(var(--t) / 2);
}

.cross::before {
  height: 100%;
  width: var(--t);
  -webkit-animation: tickBefore var(--dur) ease-in;
  animation: tickBefore var(--dur) ease-in;
  -webkit-animation-delay: var(--delay);
  animation-delay: var(--delay);
}

.cross::after {
  height: var(--t);
  width: 100%;
  transform: rotate(180deg);
  -webkit-animation: tickAfter var(--dur) ease-in;
  animation: tickAfter var(--dur) ease-in;
  -webkit-animation-delay: var(--delay);
  animation-delay: var(--delay);
}

.tick::before {
  height: 100%;
  width: var(--t);
  -webkit-animation: tickBefore var(--dur) ease-in;
  animation: tickBefore var(--dur) ease-in;
  -webkit-animation-delay: var(--delay);
  animation-delay: var(--delay);
}

.tick::after {
  width: 100%;
  height: var(--t);
  bottom: 0;
  -webkit-animation: tickAfter var(--dur) ease-out;
  animation: tickAfter var(--dur) ease-out;
  -webkit-animation-delay: var(--delay);
  animation-delay: var(--delay);
}

@-webkit-keyframes circle {
  0% {
    transform: scale(0);
  }

  25% {
    transform: scale(1.2);
  }

  50%,
  100% {
    transform: scale(1);
  }
}

@keyframes circle {
  0% {
    transform: scale(0);
  }

  25% {
    transform: scale(1.2);
  }

  50%,
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes circleInner {

  0%,
  10% {
    transform: scale(0);
    opacity: 0.4;
  }

  40%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes circleInner {

  0%,
  10% {
    transform: scale(0);
    opacity: 0.4;
  }

  40%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@-webkit-keyframes tickBefore {

  0%,
  50% {
    height: 0%;
  }

  60%,
  100% {
    height: 100%;
  }
}

@keyframes tickBefore {

  0%,
  50% {
    height: 0%;
  }

  60%,
  100% {
    height: 100%;
  }
}

@-webkit-keyframes tickAfter {

  0%,
  60% {
    width: 0%;
  }

  75%,
  100% {
    width: 100%;
  }
}

@keyframes tickAfter {

  0%,
  60% {
    width: 0%;
  }

  75%,
  100% {
    width: 100%;
  }
}
</style>
