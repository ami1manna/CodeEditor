import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { executeCode } from '../api';
import { useState } from 'react';

const Output = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOutput] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState([]);

    async function runCode() {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        try {
            setLoading(true);
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
            setLoading(false);
        }
    }

    return (
        <Box w='50%'>
            <Text mb={2} fontSize='lg'>
                Output
            </Text>
            <Button
                isLoading={isLoading}
                onClick={runCode}
                variant='outline'
                colorScheme='green'
                mb={4}
            >
                Run Code
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
                    errorText.map((line,index)=>(<Text key={index}>{line}</Text>))
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
