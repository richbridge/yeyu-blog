import type { BytemdPlugin, EditorProps } from 'bytemd'
import breaks from '@bytemd/plugin-breaks'
import gfm from '@bytemd/plugin-gfm'
import gfm_zhHans from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import highlightSsr from '@bytemd/plugin-highlight-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { Editor } from '@bytemd/react'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import { common } from 'lowlight'
import 'highlight.js/styles/tokyo-night-dark.css' // 选择一个主题
import 'bytemd/dist/index.css'

const plugins: BytemdPlugin[] = [
  gfm({ locale: gfm_zhHans }),
  highlightSsr({
    languages: {
      ...common,
    },
  }),
  breaks(),
  mediumZoom(),
]

const handleUploadImages: EditorProps['uploadImages'] = async (files) => {
  const file = files[0]

  if (file) {
    const formData = new FormData()
    formData.append('file', file)

    const res = await (
      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
    ).json()

    if (res.url) {
      return [{ url: res.url }]
    }

    return []
  }
  else {
    return []
  }
}

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
        uploadImages={handleUploadImages}
      />
    </div>
  )
}
