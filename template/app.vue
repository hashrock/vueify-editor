<style>
  .red {
    color: #f00;
  }
  li{
  	color: blue;
  }
</style>

<template>
  <h1 class="red">{{msg}}</h1>
  <p>{{msg}}</p>
  <ul>
  	<li v-for="item in items">{{item}} です</li>
  </ul>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        msg: 'Hello world!',
        items: ["first", "second", "third"]
      }
    }
  }
</script>
