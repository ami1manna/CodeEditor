import { Box, HStack, useBreakpointValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { CODE_SNIPPETS } from "../constants";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  function onMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  function onSelect(selectedLanguage) {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
  }

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={4}>
      <HStack spacing={4} flexWrap="wrap">
        <Box w={isMobile ? "100%" : "48%"} mb={isMobile ? 4 : 0}>
          <LanguageSelector onSelect={onSelect} language={language} />
          <Editor
            onMount={onMount}
            theme="vs-dark"
            height={isMobile ? "50vh" : "75vh"}
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <Box w={isMobile ? "100%" : "48%"}>
          <Output editorRef={editorRef} language={language} />
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
