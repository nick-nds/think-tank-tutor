<script setup>
import { inject } from 'vue'

const actions = inject('actions')

const start = () => {
  actions.value.currentQuestion = 0
}

</script>
<template>
  <div class="flex justify-center items-center h-full overflow-y-auto">
    <div id="start-div" @click="start()" class="flex justify-center mb-40 mr-40 items-center rounded-full bg-sky-900 w-60 h-60 text-blue-900 dark:text-white text-4xl bg-blue-200 dark:bg-gray-900">
      <p>Start</p>
    </div>
  </div>
</template>
<style>
#start-div {
    cursor: pointer;
    -webkit-box-shadow:0 0 50px blue; 
    -moz-box-shadow: 0 0 50px blue; 
    box-shadow:0 0 50px blue;
    transform: translate(-50%, -50%);
    -webkit-animation-name: inner-center-div;
    -webkit-animation-duration: 4s; 
    -webkit-animation-iteration-count: infinite; 
    animation-name: inner-center-div;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    border: 2px solid rgb(107, 180, 243);
}

#start-div div {
    font-size: 60px;
    display: inline-block;
    color: rgb(174, 215, 241);
    width: 300px;
    height: 300px;
    border-radius: 50%;
}

@-webkit-keyframes inner-center-div {
    0% {transform: scale(1.0);}
    50% {transform: scale(1.1);}
    100% {transform: scale(1.0);}
}

@keyframes inner-center-div {
    0% {transform: scale(1.0);}
    50% {transform: scale(1.1);}
    100% {transform: scale(1.0);}
}

#start-div div p {
    margin-top: 25%;
    font-family: 'Lobster', cursive;
}
</style>
