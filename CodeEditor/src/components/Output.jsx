import React, { useState } from 'react';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { executeCode } from '../api'; // Assuming executeCode function is correctly implemented
import { GoogleGenerativeAI } from "@google/generative-ai";

const Output = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOutput] = useState([]);
    const [isLoading, setLoading] = useState({
        run: false,
        ai: false
    });
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState([]);
    const [prompt, setPrompt] = useState(''); // State to hold AI prompt

    const apiKey = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY; // Accessing environment variable

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const ai = async () => {
        try {
            setLoading(prevLoading => ({ ...prevLoading, ai: true }));

            const sourceCode = editorRef.current.getValue();
            if (!sourceCode) {
                toast({
                    title: 'No code to process',
                    description: 'Please enter some code to enhance or correct.',
                    status: 'warning',
                    duration: 4000,
                });
                return;
            }

            // Construct prompt based on error state
            let currentPrompt = '';
            if (!isError) {
                currentPrompt = `* Focus on Making Time Complexity Less by effective utilization of Loops and Enhance and Optimise and Clean the code: \n${sourceCode} *Note : 1 . Give me only code No need to Explain so that i can directly copy paste it *2 . the code should secprated by \n escape sequence *3.language is ${language}  `;
            } else {
                currentPrompt = `Fix the error:\n${errorText.join('\n')}\nCode is:\n${sourceCode} *Note : 1 . Give me only code No need to Explain so that i can directly copy paste it *2. the code should secprated by \n escape sequence *3 language is ${language} `;
            }

            const chatSession = model.startChat({
                generationConfig,
                history: [],
            });

            const result = await chatSession.sendMessage(currentPrompt); // Use current prompt as input
            const responseText = result.response.text();

            // Check if response indicates an error
            if (responseText.includes('Error')) {
                setIsError(true);
                setErrorText([responseText]);
                setOutput([]);
            } else {
                setIsError(false);
                setErrorText([]);
                setOutput(responseText.split('\n').slice(1, -1));
                console.log(responseText.split('\n').slice(1, -1));
            }
        } catch (error) {
            console.error('Error in AI enhancement:', error);
            toast({
                title: 'AI Enhancement Error',
                description: error.message || 'Failed to enhance text',
                status: 'error',
                duration: 6000,
            });
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, ai: false }));
        }
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

            const { run: result } = await executeCode(sourceCode, language);

            if (result.stderr) {
                setIsError(true);
                setErrorText(result.stderr.split('\n'));
                setOutput([]);
            } else {
                setIsError(false);
                setErrorText([]);
                // Split output by newline preserving spaces
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

    return (
        <Box w='100%'>
            <Text mb={2} fontSize='lg'>
                Output
            </Text>
            <Button
                isLoading={isLoading.run}
                onClick={runCode}
                variant='outline'
                colorScheme='green'
                mb={4}
            >
                Run Code
            </Button>
            <Button
                isLoading={isLoading.ai}
                onClick={ai}
                variant='outline'
                colorScheme='blue'
                mb={4}
                ml={5}
            >
                {isError ? 'Solve Error' : 'Enhance the Code'}
            </Button>
            <Box
                overflowY="auto"
                height='75vh'
                p={2}
                border='1px solid'
                borderRadius={4}
                borderColor={isError ? 'red.500' : '#333'}
                color={isError ? 'red.400' : ''}
            >
                {isError ? (
                    errorText.map((line, index) => (<Text key={index}>{line}</Text>))
                ) : (
                    output.length > 0 ? (
                        output.map((line, index) => (<Text key={index}>{line}</Text>))
                    ) : (
                        <Text>Click "Run Code" to see the output here</Text>
                    )
                )}
            </Box>
        </Box>
    );
};

export default Output;
