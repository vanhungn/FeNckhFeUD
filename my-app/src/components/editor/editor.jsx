// editor.jsx
import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import { EditorjsTools } from "../tools/tools";
import classNames from "classnames/bind";
import style from "./editor.module.scss"
import { useLocation, useParams } from "react-router-dom";
const cx = classNames.bind(style)

const Editor = ({ style: customStyle, data, onChange, readOnly, resetEditor, setResetEditor }) => {
  const editorRef = useRef(null);
  const holderRef = useRef(null);
  const indentLevels = useRef(new Map());
  const { _id } = useParams()
  const path = useLocation()

  const active = () => {
    if (editorRef.current) return;
    const editor = new EditorJS({
      holder: holderRef.current,
      tools: EditorjsTools,
      data,
      readOnly: readOnly,
      async onChange() {
        if (editorRef.current && !readOnly) {
          const output = await editorRef.current.save();
          onChange(output);
        }
      },
    });
    editorRef.current = editor;
    return () => {
      if (editorRef.current?.destroy) {
        try {
          editorRef.current.destroy();
        } catch (e) { }
        editorRef.current = null;
      }
    };
  }

  useEffect(() => {
    if (path.pathname === "/admin/news/create") {
      active()
    }
    else if (path.pathname === `/admin/news/update/${_id}`) {
      if (data) {
        active()
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      active()
    }
  }, [data])

  const resetEditorData = async (newData) => {
    if (editorRef.current) {
      await editorRef.current.destroy();
      editorRef.current = null;
    }
    const editor = new EditorJS({
      holder: holderRef.current,
      tools: EditorjsTools,
      data: newData,
      readOnly,
      async onChange() {
        if (!readOnly) {
          const output = await editorRef.current.save();
          onChange(output);
        }
      },
    });

    editorRef.current = editor;
  };

  useEffect(() => {
    if (!resetEditor) {
      resetEditorData(data);
      setResetEditor(true);
    }
  }, [resetEditor]);

  useEffect(() => {
    if (editorRef.current?.readOnly) {
      editorRef.current.readOnly.toggle(readOnly);
    }
  }, [readOnly]);

  useEffect(() => {
    const handleTabCapture = (e) => {
      if (e.key !== 'Tab' && e.key !== 'Shift') return;
      if (!holderRef.current?.contains(e.target)) return;

      const currentBlock = e.target.closest('.ce-block');
      if (!currentBlock) return;

      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const blocks = holderRef.current.querySelectorAll('.ce-block');
        const blockIndex = Array.from(blocks).indexOf(currentBlock);

        let currentIndent = indentLevels.current.get(blockIndex) || 0;

        if (e.shiftKey) {
          currentIndent = Math.max(0, currentIndent - 1);
        } else {
          currentIndent = Math.min(10, currentIndent + 1);
        }

        indentLevels.current.set(blockIndex, currentIndent);

        const blockContent = currentBlock.querySelector('.ce-block__content');
        if (blockContent) {
          blockContent.style.paddingLeft = `${currentIndent * 40}px`;
          blockContent.style.transition = 'padding-left 0.15s ease';
          blockContent.style.borderLeft = currentIndent > 0
            ? `3px solid rgba(66, 133, 244, ${0.2 + currentIndent * 0.08})`
            : 'none';
        }

        console.log(`📝 Block ${blockIndex}: Level ${currentIndent}`);
        return false;
      }
    };

    window.addEventListener('keydown', handleTabCapture, true);
    return () => {
      window.removeEventListener('keydown', handleTabCapture, true);
    };
  }, []);

  return (
    <>
      <div
        ref={holderRef}
        style={{ ...customStyle }}
        className={cx('editor', { 'editor--readonly': readOnly })}
      />

      {/* Style chung cho cả readOnly và edit mode */}
      <style>{`
        /* Chuyển delimiter thành gạch ngang như HR (áp dụng cho mọi mode) */
        .ce-delimiter {
          line-height: 1.6em !important;
          width: 100% !important;
          text-align: center !important;
          margin: 30px 0 !important;
          position: relative !important;
        }
        
        .ce-delimiter::before {
          display: block !important;
          content: "" !important;
          border-top: 2px solid #e5e7eb !important;
          width: 100% !important;
          position: absolute !important;
          top: 50% !important;
          left: 0 !important;
          transform: translateY(-50%) !important;
        }
        
        .ce-delimiter::after {
          content: "" !important;
          display: none !important;
        }
        
        /* Ẩn text "* * *" */
        .ce-delimiter {
          color: transparent !important;
          font-size: 0 !important;
        }
          .embed-tool__caption.cdx-input:empty {
  display: none !important;
}
      `}</style>

      {/* Style động chỉ cho readOnly mode */}
      {readOnly && (
        <style>{`
          /* Ẩn caption của ảnh khi readOnly */
          .editor--readonly .image-tool__caption {
            display: none !important;
          }
/* Ẩn caption của VIDEO khi readOnly và caption rỗng */



          /* Ẩn toolbar */
          .editor--readonly .ce-toolbar {
            display: none !important;
          }
          
          /* Không cho edit */
          .editor--readonly .ce-block {
            pointer-events: none;
          }
          
          /* Cho phép click vào links và images */
          .editor--readonly .ce-block a,
          .editor--readonly .ce-block img {
            pointer-events: auto;
            cursor: pointer;
          }
          
          /* Style đẹp hơn cho images */
          .editor--readonly .image-tool__image img {
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
        `}</style>
      )}
    </>
  );
};

export default memo(Editor);