<template>
  <div class="left-side">

    <div class="tool-render">
      <div class="count">
        <p>count: {{wordCount}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  // import Methods from '../js/tool_bar.js'
  // import Utils from '../js/utils.js'

  export default{
    created() {},
    props: ['wordCount'],
      // Methods are located in js directory
      // methods: Methods
    }
</script>

<style>
  .left-side{
    width: 30vw;
  }
  .tool-render{
    position: fixed;
    display: table-cell;
    z-index: 10;
    top: 15vh;
    background-color: rgb(54, 54, 54);
    display: table-cell;
    margin: 0;
    width: 30vw;
    height: 100vh;
  }
  .count{
    position: fixed;
    height: 8em;
    background-color: rgb(24, 24, 24);
    width: 30vw;
    color: rgb(255, 255, 255);
    bottom: 0;
    text-align: center;
    vertical-align: middle;
  }
  .count span{
    font-size: 18px;
  }
  .count p{
    margin-top: 3em;
  }
  .tool-render, .count{
    left: -29.9vw;
    z-index: 2;
    -webkit-transition: left 0.5s ease-in-out;
    -moz-transition: left 0.5s ease-in-out;
    -o-transition: left 0.5s ease-in-out;
    -ms-transition: left 0.5s ease-in-out;
    transition: left 0.5s ease-in-out;
  }
  .horizontal-ul{
    display: table-row;
  }
  .horizontal-ul li{
    display: table-cell;
    margin: 0;
    text-align: center;
    vertical-align: middle;
  }
  .horizontal-ul li:hover{
    background-color: rgb(54, 54, 54);
    cursor: pointer;
  }
  .left-side:hover .tool-render{
    left: 0;
  }
  .left-side:hover .count{
    left: 0;
  }
</style>
