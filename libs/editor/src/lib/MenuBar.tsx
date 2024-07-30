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
  FaEdit,
} from 'react-icons/fa';
import { useCurrentEditor } from '@tiptap/react';
import { CollaboInt, DocumentInt } from '@collab-write/firebase';
import Collabo from './Collabo';
import { CiEdit } from 'react-icons/ci';
import { useGlobalContext } from './context.api';
import { useEffect } from 'react';

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const { isUser, doc } = useGlobalContext();

  useEffect(() => {
    if (doc && editor) {
      if (doc.content !== editor.getHTML()) {
        editor.commands.clearContent();
        editor.commands.insertContent(doc.content);
      }
    }
  }, [doc]);

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group z-10">
      {isUser && <Collabo />}
      <div className="button-group flex justify-between align-middle">
        <div className="btn_grp ">
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

export default MenuBar;
