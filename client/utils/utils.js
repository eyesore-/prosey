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
  }
}
