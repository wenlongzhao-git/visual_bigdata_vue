<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="go">点我跳转</button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: '欢迎来到菜鸟教程！'
      }
    },
    methods:{
      go(){
        this.$router.push('/HelloWorld')
      }
    }
  }
</script>
