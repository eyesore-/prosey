<template>
  <div class="main-content">
    <navbar></navbar>
    <div class="content">

    <div class="content-left">
      <div class="word-count" v-if="count > 0">
        <div>{{ count }} words</div>
        <div>{{ time }} read</div>
      </div>
    </div>

    <div class="content-right">
      <div id="editor"></div>
    </div>

  </div>
  </div>
</template>

<script>
  import Navbar from './navbar.vue'
  import Toolbar from './tool_bar.vue'
  import {textStats, docSubscribe} from '../utils/utils.js'
  import sharedb from 'sharedb/lib/client'
  import richText from 'rich-text'
  import Quill from 'quill'
  import Chance from 'chance'

  export default {
    created() {
      let chance = new Chance()
      let c = this.$route.params.channel
      this.URI = c !== undefined && /^\w{5}$/.test(c) ? c : chance.word({length: 5})
      },
    mounted() {
      sharedb.types.register(richText.type)

      let socket = new WebSocket(`ws://${window.location.host}`)
      const connection = new sharedb.Connection(socket)
      // For testing reconnection
      window.disconnect = function() {
        connection.close();
      }
      window.connect = function(URI) {
        let socket = new WebSocket(`ws://${window.location.host}`);
        connection.bindToSocket(socket);
      }

      const doc = connection.get('docs', 'richtext');
      this.quill = new Quill('#editor', {
        placeholder: 'Filthy animals.',
        theme: 'bubble'
      })

      this.quill.on('text-change', () => {
        let text = this.quill.getText()
        let stats = textStats(text)
        this.time = stats.display
        this.count = stats.length
      })

      docSubscribe(this.quill, doc);
    },
    data() {
      return {
        ws: null,
        channel: '',
        count: 0,
        time: '',
        URI: '',
        quill: ''
      }
    },
    components: {
      Toolbar,
      Navbar
    },
    methods: {
      update(e) {
      }
    }
  }
</script>

<style>
  .main-content{
    width: 100vw;
  }
  .content{
    display: inline-flex;
    height: 87vh;
    width: 100vw;
  }
  .content-right{
    width: 80%;
  }
  .content-left{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .word-count{
    font-size: 0.95em;
    font-weight: 600;
    margin: 0.75em;
    opacity: 0.35;
  }
  html, body{
    color: #333;
    font-family: 'Monaco', courier, monospace;
  }
  #editor {
    height: 100%;
  }
  code {
    color: #f66;
  }
</style>
