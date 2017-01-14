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
  import {textStats} from '../utils/utils.js'
  import sharedb from 'sharedb/lib/client'
  import richText from 'rich-text'
  import Quill from 'quill'

  export default {
    created() {
    },
    mounted() {
      sharedb.types.register(richText.type);

      const socket = new WebSocket('ws://' + window.location.host);
      const connection = new sharedb.Connection(socket);

      // For testing reconnection
      window.disconnect = function() {
        connection.close();
      };
      window.connect = function() {
        let socket = new WebSocket('ws://' + window.location.host);
        connection.bindToSocket(socket);
      };

      const doc = connection.get('docs', 'richtext');
      const quill = new Quill('#editor', {
        placeholder: 'Filthy animals.',
        theme: 'bubble'
      });

      quill.on('text-change', () => {
        let text = quill.getText()
        let stats = textStats(text)
        this.time = stats.display
        this.count = stats.length
      })

      doc.subscribe(function(err) {
        if (err) throw err;
        if (!doc.data) {
          doc.create([{insert: quill.getText()}], 'rich-text')
        }
        quill.setContents(doc.data);
        quill.on('text-change', function(delta, oldDelta, source) {
          if (source !== 'user') return;
          doc.submitOp(delta, {source: quill});
        });
        doc.on('op', function(op, source) {
          if (source === quill) return;
          quill.updateContents(op);
        });
      });
    },
    data() {
      return {
        ws: null,
        input: '',
        channel: '',
        count: 0,
        time: ''
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
