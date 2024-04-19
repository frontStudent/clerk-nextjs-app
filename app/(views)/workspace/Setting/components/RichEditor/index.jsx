import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import { Dropdown } from 'antd'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor, Text, Element as SlateElement } from 'slate'
import { withHistory } from 'slate-history'

import { ToolButton, Icon, Toolbar } from './components'
import escapeHtml from 'escape-html'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
const items = [
  {
    label: '1st menu item',
    key: '1'
  },
  {
    label: '2nd menu item',
    key: '2'
  },
  {
    label: '3rd menu item',
    key: '3'
  }
]
const RichTextExample = ({ initialValue, onUpdate }) => {
  const renderElement = (props) => <Element {...props} />;
  const renderLeaf = (props) => <Leaf {...props} />;
  const [editor] = useState(() => withReact(createEditor()));

  useEffect(() => {
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    });

    // Removes empty node
    Transforms.removeNodes(editor, {
      at: [0],
    });
    Transforms.insertNodes(editor, initialValue);
  }, [JSON.stringify(initialValue)]);

  const handleChange = (val) => {
    //  onChangeParams({ richSourceData: val })
    onUpdate(val)
    // setHtml(val.map((item) => serialize(item)).join(''))
  };
  return (
    <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
        <MenuButton format="" icon="menu" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
      {/* <div>{JSON.stringify(initialValue)}</div> */}
    </Slate>
  );
};
export const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    if (node.italic) {
      string = `<em>${string}</em>`
    }
    if (node.code) {
      string = `<code>${string}</code>`
    }
    if (node.underline) {
      string = `<u>${string}</u>`
    }
    return string
  }

  const children = node?.children?.map((n) => serialize(n)).join('')

  switch (node.type) {
    case 'paragraph':
      return `<div style="text-align: ${node.align}">${children}</div>`
    case 'heading-one':
      return `<h1 style="text-align: ${node.align}">${children}</h1>`
    case 'heading-two':
      return `<h2 style="text-align: ${node.align}">${children}</h2>`
    case 'bulleted-list':
      return `<ul style="text-align: ${node.align}">${children}</ul>`
    case 'list-item':
      return `<li style="text-align: ${node.align}">${children}</li>`
    case 'numbered-list':
      return `<ol style="text-align: ${node.align}">${children}</ol>`
    default:
      return children
  }
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true
  })
  let newProperties
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format
    }
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format
    })
  )

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const MenuButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Dropdown
      menu={{
        items,
        onClick: (item) => console.log(item, 'change')
      }}
      trigger={['contextMenu']}
    >
      <ToolButton
        active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
        // onMouseDown={(event) => {
        //   event.preventDefault();
        //   toggleBlock(editor, format);
        // }}
      >
        <Icon>{icon}</Icon>
      </ToolButton>
    </Dropdown>
  )
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <ToolButton
      active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </ToolButton>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <ToolButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </ToolButton>
  )
}
export default RichTextExample