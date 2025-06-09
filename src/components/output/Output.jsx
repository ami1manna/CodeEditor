import React, { useState } from 'react';
import { Box, Text, HStack, useToast } from '@chakra-ui/react';
import { executeCode } from '../../api';
import { GoogleGenerativeAI } from "@google/generative-ai";
import RunCodeButton from './RunCodeButton';
import FixErrorButton from './FixErrorButton';
import DiffPanel from './DiffPanel';
import OutputDisplay from './OutputDisplay';
import { addDiffStyles, calculateChanges } from './utils';

const Output = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOutput] = useState([]);
    const [isLoading, setLoading] = useState({
        run: false,
        ai: false
    });
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState([]);
    const [hasRunCode, setHasRunCode] = useState(false);
    const [suggestedFixes, setSuggestedFixes] = useState([]);
    const [isShowingDiff, setIsShowingDiff] = useState(false);

    const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const generationConfig = {
        temperature: 0.7,
        topP: 1,
        topK: 0,
        maxOutputTokens: 2048,
        responseMimeType: "text/plain",
    };

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) {
            toast({
                title: 'No code to run',
                description: 'Please enter some code to run.',
                status: 'warning',
                duration: 4000,
            });
            return;
        }

        try {
            setLoading(prevLoading => ({ ...prevLoading, run: true }));
            setHasRunCode(true);

            const { run: result } = await executeCode(sourceCode, language);

            if (result.stderr) {
                setIsError(true);
                setErrorText(result.stderr.split('\n'));
                setOutput([]);
            } else {
                setIsError(false);
                setErrorText([]);
                setIsShowingDiff(false);
                setSuggestedFixes([]);
                const outputLines = result.output.split("\n");
                setOutput(outputLines);
            }
        } catch (error) {
            toast({
                title: 'An error occurred',
                description: error.message || 'Unable to run code',
                status: 'error',
                duration: 6000,
            });
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, run: false }));
        }
    };

    const fixError = async () => {
        try {
            setLoading(prevLoading => ({ ...prevLoading, ai: true }));

            const sourceCode = editorRef.current.getValue();
            if (!sourceCode) {
                toast({
                    title: 'No code to fix',
                    description: 'Please enter some code to fix.',
                    status: 'warning',
                    duration: 4000,
                });
                return;
            }

            const fixPrompt = `
Fix the following code errors. Provide the corrected code with line-by-line changes highlighted:

ERROR OUTPUT:
${errorText.join('\n')}

ORIGINAL CODE:
${sourceCode}

Requirements:
1. Fix all syntax and runtime errors
2. Maintain the original code structure as much as possible
3. Only return the corrected code without explanations
4. Language: ${language}
5. Use proper indentation
`;

            const chatSession = model.startChat({
                generationConfig,
                history: [],
            });

            const result = await chatSession.sendMessage(fixPrompt);
            const fixedCode = result.response.text();
            
            const cleanedCode = fixedCode
                .replace(/```[\w]*\n?/g, '')
                .replace(/^\s*[\r\n]/gm, '\n')
                .trim();

            showCodeDiff(sourceCode, cleanedCode);
            
        } catch (error) {
           
            toast({
                title: 'Error Fixing Failed',
                description: error.message || 'Failed to fix code errors',
                status: 'error',
                duration: 6000,
            });
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, ai: false }));
        }
    };

    const showCodeDiff = (originalCode, fixedCode) => {
        if (!editorRef.current) return;

        setSuggestedFixes([{
            original: originalCode,
            fixed: fixedCode,
            changes: calculateChanges(originalCode, fixedCode)
        }]);

        const editor = editorRef.current;
        const changes = calculateChanges(originalCode, fixedCode);
        const decorations = changes.map(change => ({
            range: new window.monaco.Range(change.lineNumber, 1, change.lineNumber, change.originalLine.length + 1),
            options: {
                isWholeLine: true,
                className: 'error-line-decoration',
                glyphMarginClassName: 'error-line-glyph',
                minimap: {
                    color: '#ff6b6b',
                    position: 1
                },
                overviewRuler: {
                    color: '#ff6b6b',
                    position: 1
                }
            }
        }));

        editor.deltaDecorations([], decorations);
        addDiffStyles();
        setIsShowingDiff(true);
        
        toast({
            title: 'Error Fix Suggestions Ready',
            description: 'Review the highlighted changes and accept fixes line by line or all at once.',
            status: 'info',
            duration: 5000,
        });
    };

    const acceptAllFixes = () => {
        if (suggestedFixes.length === 0) return;
        
        const fixedCode = suggestedFixes[0].fixed;
        editorRef.current.setValue(fixedCode);
        
        editorRef.current.deltaDecorations(editorRef.current.getModel().getAllDecorations().map(d => d.id), []);
        
        setIsShowingDiff(false);
        setSuggestedFixes([]);
        setIsError(false);
        setErrorText([]);
        
        toast({
            title: 'Fixes Applied',
            description: 'All error fixes have been applied to your code.',
            status: 'success',
            duration: 3000,
        });
    };

    const acceptLineFix = (lineNumber) => {
        const change = suggestedFixes[0]?.changes.find(c => c.lineNumber === lineNumber);
        if (!change) return;

        const editor = editorRef.current;
        const model = editor.getModel();
        
        editor.executeEdits('fix-line', [{
            range: new window.monaco.Range(lineNumber, 1, lineNumber, change.originalLine.length + 1),
            text: change.fixedLine + (lineNumber < model.getLineCount() ? '\n' : ''),
        }]);

        const currentDecorations = model.getAllDecorations();
        const decorationsToRemove = currentDecorations
            .filter(d => d.range.startLineNumber === lineNumber)
            .map(d => d.id);
        
        editor.deltaDecorations(decorationsToRemove, []);

        setSuggestedFixes(prev => [{
            ...prev[0],
            changes: prev[0].changes.filter(c => c.lineNumber !== lineNumber)
        }]);

        const remainingChanges = suggestedFixes[0].changes.filter(c => c.lineNumber !== lineNumber);
        if (remainingChanges.length === 0) {
            setIsShowingDiff(false);
            setSuggestedFixes([]);
            setIsError(false);
            setErrorText([]);
        }

        toast({
            title: 'Line Fix Applied',
            description: `Fixed line ${lineNumber}`,
            status: 'success',
            duration: 2000,
        });
    };

    const dismissFixes = () => {
        if (editorRef.current) {
            editorRef.current.deltaDecorations(
                editorRef.current.getModel().getAllDecorations().map(d => d.id), 
                []
            );
        }
        
        setIsShowingDiff(false);
        setSuggestedFixes([]);
        
        toast({
            title: 'Fixes Dismissed',
            description: 'Error fix suggestions have been dismissed.',
            status: 'info',
            duration: 2000,
        });
    };

    return (
        <Box w='100%'>
            <Text mb={2} fontSize='lg'>
                Output
            </Text>
            
            <HStack spacing={3} mb={4} flexWrap="wrap">
                <RunCodeButton 
                    isLoading={isLoading.run}
                    onClick={runCode}
                />
                
                <FixErrorButton
                    isVisible={hasRunCode && isError && !isShowingDiff}
                    isLoading={isLoading.ai}
                    onClick={fixError}
                />
            </HStack>

            <DiffPanel
                isVisible={isShowingDiff}
                suggestedFixes={suggestedFixes}
                onAcceptAll={acceptAllFixes}
                onAcceptLine={acceptLineFix}
                onDismiss={dismissFixes}
            />
            
            <OutputDisplay
                output={output}
                errorText={errorText}
                isError={isError}
            />
        </Box>
    );
};

export default Output;