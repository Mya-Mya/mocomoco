import React, { useRef, useEffect } from "react";
import {
  EditorView,
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
} from "@codemirror/view";
import { EditorState } from "@codemirror/basic-setup";
import { indentWithTab } from "@codemirror/commands";
import { history, historyKeymap } from "@codemirror/history";
import { foldGutter, foldKeymap } from "@codemirror/fold";
import { indentOnInput } from "@codemirror/language";
import { lineNumbers, highlightActiveLineGutter } from "@codemirror/gutter";
import { bracketMatching } from "@codemirror/matchbrackets";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/closebrackets";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { rectangularSelection } from "@codemirror/rectangular-selection";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { html } from "@codemirror/lang-html";
import "./htmlEditorStyle.css";

/**
 * @param {object} p
 * @param {React.Ref} p.ref
 * @param {string} p.initialCode
 * @param {(string)=>void} p.onChange
 * @param {boolean} p.readOnly
 * @param {number} p.fontSize?
 *
 */
export default (p) => {
  const fontSize = p.fontSize || 18;
  const onCodeEditorChange = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      const newCode = editor.state.doc.toJSON().join("\n");
      p.onChange(newCode);
    }
  });
  const theme = EditorView.theme({
    "&": {
      fontSize: `${fontSize}px`,
    },
  });
  const editor = new EditorView({
    state: EditorState.create({
      doc: p.initialCode,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        //foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        defaultHighlightStyle.fallback,
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        //basic setup end
        keymap.of([indentWithTab]),
        html(),
        onCodeEditorChange,
        EditorState.readOnly.of(p.readOnly),
        theme,
      ],
    }),
    parent: p.ref.current,
  });

  return editor;
};
