import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaCode,
  FaHeading,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaUndo,
  FaUnderline,
  FaEraser,
  FaHighlighter,
  FaSave,
} from 'react-icons/fa';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group flex flex-col gap-2 px-3 pb-3 border-b border-clr-brd ">
      <div className="collabs">collaborators here</div>
      <div className="button-group flex justify-between align-middle">
        <div className="btn_grp">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            title="Bold text"
          >
            <FaBold />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
            title="Underline text"
          >
            <FaUnderline />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            title="Italicize text"
          >
            <FaItalic />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            title="Strikethrough text"
          >
            <FaStrikethrough />
          </button>
        </div>

        <div className="btn_grp">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
            title="Large heading"
          >
            <FaHeading />
            <sub>1</sub>
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
            title="Mid heading"
          >
            <FaHeading />
            <sub>2</sub>
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
            title="Small heading"
          >
            <FaHeading />
            <sub>3</sub>
          </button>
        </div>

        <div className="btn_grp">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            title="Bullet list"
          >
            <FaListUl />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            title="Numbered list"
          >
            <FaListOl />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
            title="Inline code"
          >
            <FaCode />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
            title="Block code"
          >
            <FaCode />
            <sub>b</sub>
          </button>

          <button
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            title="Remove inline mod"
          >
            <FaEraser />
          </button>

          <button
            onClick={() => editor.chain().focus().clearNodes().run()}
            title="Remove block mod"
          >
            <FaEraser />
            <sub>b</sub>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            title="Blockquote"
          >
            <FaQuoteLeft />
          </button>
        </div>

        <div className="btn_grp">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            title="Undo"
          >
            <FaUndo />
          </button>

          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            title="Redo"
          >
            <FaRedo />
          </button>
        </div>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
];

const content = '';

const Editor = () => {
  const update = () => {};
  return (
    <div className="center_sect">
      <div className="editor mt-8 max-w-[650px] mx-auto border border-clr-brd py-3 rounded-md bg-sub-warm">
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={content}
          onUpdate={update}
          slotAfter={<SaveBtn />}
        ></EditorProvider>
      </div>
    </div>
  );
};

const SaveBtn = () => {
  return (
    <button className="cta_btn ml-4 mt-5">
      <FaSave />
    </button>
  );
};

export default Editor;
