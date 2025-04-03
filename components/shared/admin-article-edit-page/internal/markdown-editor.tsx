import { useState } from 'react'
import breaks from '@bytemd/plugin-breaks'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import gfm_zhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
import { BytemdPlugin } from 'bytemd'
import highlightSsr from '@bytemd/plugin-highlight-ssr'
import { common } from 'lowlight'
import 'highlight.js/styles/tokyo-night-dark.css' // 选择一个主题
import 'bytemd/dist/index.css'
import { Editor } from '@bytemd/react'

const plugins: BytemdPlugin[] = [
  gfm({ locale: gfm_zhHans }),
  highlightSsr({
    languages: {
      ...common,
    },
  }),
  breaks(),
]

export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string
  onChange: () => void
}) {
  return (
    <div id="content-editor">
      <Editor
        value={value}
        onChange={onChange}
        locale={zh_Hans}
        plugins={plugins}
      />
    </div>
  )
}
