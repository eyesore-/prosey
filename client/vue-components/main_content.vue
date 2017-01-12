<template>
  <div class="main-content">
    <navbar></navbar>
    <div>
    <ToolBar :word-count="count"></ToolBar>

    <div class="content-left">
    </div>

    <div class="content-right float-r">
      <div id="editor"></div>
    </div>

  </div>
  </div>
</template>

<script>
  import Navbar from './navbar.vue'
  import ToolBar from './tool_bar.vue'
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
        console.log('WS: Disconnected');
      };
      window.connect = function() {
        let socket = new WebSocket('ws://' + window.location.host);
        connection.bindToSocket(socket);
        console.log('WS: Connected');
      };

      const doc = connection.get('docs', 'richtext');

      doc.subscribe(function(err) {
        if (err) throw err;
        const quill = new Quill('#editor', {theme: 'bubble'});
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
        text: ''
      }
    },
    components: {
      ToolBar,
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
    height: 100%;
    border: 0.5em solid pink;
  }
  code {
    color: #f66;
  }
</style>
