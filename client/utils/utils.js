module.exports = {
  textStats(text) {
    let words = text.split(/[ \n\,\.]+/).filter(i => i !== '')
    let length = words.length

    let time = length / 190 * 60
    let min = Math.floor(time / 60)
    let sec = Math.floor(time % 60)

    return {
      display: (min < 1) ? `${sec} sec` : `${min} min`,
      time: Math.floor(time),
      length: length
    }
  },
  docSubscribe( quill, doc ) {
    doc.subscribe(function(err) {
      if (err) throw err
      if (!doc.data) {
        doc.create([{insert: quill.getText()}], 'rich-text')
      }
      quill.setContents(doc.data)
      quill.on('text-change', function(delta, oldDelta, source) {
        if (source !== 'user') return
        doc.submitOp(delta, {source: quill})
      })
      doc.on('op', function(op, source) {
        if (source === quill) return
        quill.updateContents(op)
      })
    })
  }
}
