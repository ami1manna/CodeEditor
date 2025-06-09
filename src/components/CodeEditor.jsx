import { Box, HStack, useBreakpointValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output/Output.jsx";
import { CODE_SNIPPETS } from "../constants";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isEditorReady, setIsEditorReady] = useState(false);

  function onMount(editor, monaco) {
    editorRef.current = editor;
    
    // Make monaco available globally for the Output component
    window.monaco = monaco;
    
    // Configure editor for better diff experience
    editor.updateOptions({
      lineNumbers: 'on',
      glyphMargin: true,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      renderLineHighlight: 'all',
    });

    // Add custom theme for error highlighting
    monaco.editor.defineTheme('errorTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.lineHighlightBackground': '#1e1e1e',
        'editorLineNumber.foreground': '#858585',
        'editorGutter.background': '#1e1e1e',
      }
    });

    editor.focus();
    setIsEditorReady(true);
  }

  function onSelect(selectedLanguage) {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
  }

  // Handle editor value changes
  const handleEditorChange = (newValue) => {
    setValue(newValue);
  };

  // Effect to update editor when language changes
  useEffect(() => {
    if (editorRef.current && isEditorReady) {
      // Clear any existing decorations when language changes
      const model = editorRef.current.getModel();
      if (model) {
        editorRef.current.deltaDecorations(
          model.getAllDecorations().map(d => d.id), 
          []
        );
      }
    }
  }, [language, isEditorReady]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={4}>
      <HStack spacing={4} flexWrap="wrap" align="start">
        <Box w={isMobile ? "100%" : "48%"} mb={isMobile ? 4 : 0}>
          <LanguageSelector onSelect={onSelect} language={language} />
          
          <Box 
            border="1px solid #333" 
            borderRadius="md" 
            overflow="hidden"
            position="relative"
          >
            <Editor
              onMount={onMount}
              theme="vs-dark"
              height={isMobile ? "50vh" : "75vh"}
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              value={value}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderWhitespace: 'selection',
                glyphMargin: true,
                lineDecorationsWidth: 20,
                lineNumbers: 'on',
                folding: true,
                renderLineHighlight: 'all',
                cursorBlinking: 'blink',
                cursorSmoothCaretAnimation: true,
                smoothScrolling: true,
              }}
            />
          </Box>
        </Box>
        
        <Box w={isMobile ? "100%" : "48%"}>
          {isEditorReady && (
            <Output editorRef={editorRef} language={language} />
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;