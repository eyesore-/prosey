<!-- Created by Duncan on 12.28.2016 -->
<template>
  <div class="main-content">
    <navbar></navbar>
    <div>
    <ToolBar :word-count="count"></ToolBar>
    <!-- area to add live data as text is being added -->
    <div class="content-left">
      <p>This area is for live data about text</p>
    </div>
    <!-- end live data area -->
    <!-- text field -->
    <div class="content-right float-r">
      <div id="editor">
        <div class="docinfo">
          Connected to: <span id="connected">
          <span id="docname">None</span>
          <span id="users"></span>
          </span>
        </div>
      </div>
      <!-- end editor -->
    </div>
    <!-- end text field -->
  </div>
  </div>
</template>

<script>
  import Navbar from './navbar.vue'
  import ToolBar from './tool_bar.vue'
  // import Methods from '../js/main_content.js'
  // import Utils from '../js/utils.js'
  import collab from '../editor/collab'

  export default {
    created() {
      // url assignment happens in collab.js now. Gotta use hashes :/
    },
    mounted() {
      collab.onDocumentReady()
    },
    data() {
      return {
        ws: null,
        input: '',
        channel: '',
        count: 0,
        channel: ''
      }
    },
    components: {
      ToolBar,
      Navbar
    },
    // Methods are located in js directory
    // methods: Methods
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
    margin: 0;
    color: #333;
    font-family: 'Monaco', courier, monospace;
  }
  #editor {
    height: 100%
  }
  textarea {
    border: none;
    resize: none;
    outline: none;
    font-size: 1em;
    padding: 20px;
  }
  code {
    color: #f66;
  }
</style>
