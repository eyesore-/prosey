import {blockQuoteRule, orderedListRule, bulletListRule, codeBlockRule, headingRule, inputRules, allInputRules} from 'prosemirror-inputrules'
import {keymap} from 'prosemirror-keymap'
import {history} from 'prosemirror-history'
import {baseKeymap} from 'prosemirror-commands'
import {Plugin} from 'prosemirror-state'
import {dropCursor} from 'prosemirror-dropcursor'
import {buildMenuItems, buildKeymap} from 'prosemirror-example-setup'
exports.buildMenuItems = buildMenuItems
exports.buildKeymap = buildKeymap

function TesisSetup(options) {
  let plugins = [
    inputRules({rules: allInputRules.concat(buildInputRules(options.schema))}),
    keymap(buildKeymap(options.schema, options.mapKeys)),
    keymap(baseKeymap),
    dropCursor()
  ]
  if (options.history !== false) plugins.push(history())

  return plugins.concat(new Plugin({
    props: {
      attributes: {class: 'Tesis-style'},
      menuContent: buildMenuItems(options.schema).fullMenu,
      floatingMenu: true
    }
  }))
}
exports.TesisSetup = TesisSetup

function buildInputRules(schema) {
  let result = []
  let type
  if (type = schema.nodes.blockquote) result.push(blockQuoteRule(type))
  if (type = schema.nodes.ordered_list) result.push(orderedListRule(type))
  if (type = schema.nodes.bullet_list) result.push(bulletListRule(type))
  if (type = schema.nodes.code_block) result.push(codeBlockRule(type))
  if (type = schema.nodes.heading) result.push(headingRule(type, 6))
  return result
}
exports.buildInputRules = buildInputRules
