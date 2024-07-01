import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";

import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript')
  function onMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  function onSelect(language) {
    setLanguage(language);
    setValue(
      CODE_SNIPPETS[language]
    )
  }
  return (
    <Box>
      <HStack spacing={4}>
        <Box w='50%'>
          <LanguageSelector onSelect={onSelect} language={language} />
          <Editor
            
            onMount={onMount}
            theme="vs-dark"
            height="75vh"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onChange={(value) => {
              setValue(value)
            }} />
        </Box>
        <Output editorRef={editorRef} language={language}/>
      </HStack>

    </Box>
  )
}

export default CodeEditor