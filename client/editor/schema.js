import {Schema} from 'prosemirror-model'
import {addListNodes} from 'prosemirror-schema-list'
const {schema: base} = require('prosemirror-schema-basic')

exports.schema = new Schema({
  nodes: addListNodes(base.nodeSpec, 'paragraph block*', 'block'),
  marks: base.markSpec
})
