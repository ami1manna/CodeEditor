import { Box, Button, Text, useToast } from '@chakra-ui/react'
import { executeCode } from '../api';
import { useState } from 'react';


// eslint-disable-next-line react/prop-types
const Output = ({editorRef,language}) => {
    const toast = useToast();
    const [output,setOutput] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const [isError,setError] = useState(false);
    async function  runCode(){
// eslint-disable-next-line react/prop-types
        const sourceCode = editorRef.current.getValue();
        if(!sourceCode) return;
        try{
            setLoading(true);
            const {run:result} = await executeCode(sourceCode,language)
            setOutput(result.output)
            
            
        }
        catch(error){
            toast({
                title:'An error ocurred',
                description:error.message||'Unable to run code',
                status:'error',
                duration:6000,
            })
        }
        finally{
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
            height='75vh'
            p={2}
            border='1px solid'
            borderRadius={4}
            borderColor='#333'
        >
            {
                output?output:'Click "Run Code" to see the output here'
            }
        </Box>
    </Box>
  )
}

export default Output