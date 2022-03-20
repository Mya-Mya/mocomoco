import React, { useRef, useEffect } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup, EditorState } from "@codemirror/basic-setup";
import { indentWithTab } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";

/**
 * @param {object} p
 * @param {React.Ref} p.ref
 * @param {string} p.initialCode
 * @param {(string)=>void} p.onChange
 * @param {boolean} p.readOnly
 *
 */
export default (p) => {
  const onCodeEditorChange = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      const newCode = editor.state.doc.toJSON().join("\n");
      p.onChange(newCode);
    }
  });
  const editor = new EditorView({
    state: EditorState.create({
      doc: p.initialCode,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        html(),
        onCodeEditorChange,
        EditorState.readOnly.of(p.readOnly),
      ],
    }),
    parent: p.ref.current,
  });

  return editor;
};
