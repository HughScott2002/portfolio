import command from '../config.json' assert {type: 'json'};

(() => {
  const style = document.createElement('style')
  const head = document.head
  const outputColor = `.output {color: var(--input-text)}`
  const prompt = `.shell-prompt, .prompt-corner {color: var(--prompt-default)}`
  const banner = `pre {color: var(--banner)}`
  const link = `a {color: var(--link)}`
  const linkHighlight = `a:hover {background: var(--link-highlight-bg)}`
  const linkTextHighlight = `a:hover {color: var(--link-highlight-text)}`
  const commandHighlight = `.command {color: var(--command-text)}`
  const keys = `.keys {color: var(--banner)}`

  head.appendChild(style)


  if (!style.sheet) return

  if (!command.colors.border.visible) {
    style.sheet.insertRule("#bars {display: none}")    
    style.sheet.insertRule("main {border: none}")
  } else {
    style.sheet.insertRule(`main {border-color: var(--border)}`)
    style.sheet.insertRule(`#bars {border-bottom-color: var(--border)}`)
    style.sheet.insertRule(`#bar-1 {color: var(--titlebar-text)}`)
    style.sheet.insertRule(`.window-title {color: var(--titlebar-text)}`)
  }

  style.sheet.insertRule(outputColor)
  style.sheet.insertRule(prompt)
  style.sheet.insertRule(banner)
  style.sheet.insertRule(link)
  style.sheet.insertRule(linkHighlight)
  style.sheet.insertRule(linkTextHighlight)
  style.sheet.insertRule(commandHighlight)
  style.sheet.insertRule(keys)
})()
