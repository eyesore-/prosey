<!-- Created by Duncan on 12.28.2016 -->
<template>
  <div class="main-content">
    <navbar></navbar>
    <div>
    <ToolBar :word-count="count"></ToolBar>

    <div class="content-left">
      <span>{{ text }}</span>
    </div>

    <div class="content-right float-r">
      <div id="editor" @keyup="update" @input="update">
        <div class="docinfo">
          Connected to: <span id="connected">
          <span id="docname">None</span>
          <span id="users"></span>
          </span>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
  import Navbar from './navbar.vue'
  import ToolBar from './tool_bar.vue'
  import collab from '../editor/collab'

  export default {
    created() {
    },
    mounted() {
      collab.onDocumentReady()
    },
    computed: {
      someText() {
        return this.text
      }
    },
    data() {
      return {
        ws: null,
        input: '',
        channel: '',
        count: 0,
        text: ''
      }
    },
    components: {
      ToolBar,
      Navbar
    },
    methods: {
      update(e) {
        this.text = e.target.innerText
      }
    }
  }
</script>

<style>
  .main-content{
    width: 100vw;
  }
  .content-right{
    width: 70vw;
    height: 87vh;
  }
  .content-left{
    position: fixed;
    width: 30vw;
  }
  html, body{
    color: #333;
    font-family: 'Monaco', courier, monospace;
  }
  #editor {
    height: 100%
  }
  code {
    color: #f66;
  }
</style>
