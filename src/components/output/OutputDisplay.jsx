import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const OutputDisplay = ({ output, errorText, isError }) => {
    return (
        <Box
            overflowY="auto"
            height='75vh'
            p={2}
            border='1px solid'
            borderRadius={4}
            borderColor={isError ? 'red.500' : '#333'}
            color={isError ? 'red.400' : ''}
            bg={isError ? 'red.50' : 'gray.900'}
        >
            {isError ? (
                <Box>
                    <Text fontSize="sm" fontWeight="bold" mb={2} color="red.600">
                        Error Output:
                    </Text>
                    {console.log(errorText)}
                    {errorText.map((line, index) => (
                        <Text 
                            key={index} 
                            fontFamily="mono" 
                            fontSize="sm"
                            whiteSpace="pre-wrap"
                        >
                            {line}
                        </Text>
                    ))}
                </Box>
            ) : (
                <Box>
                    {output.length > 0 ? (
                        <Box>
                            <Text fontSize="sm" fontWeight="bold" mb={2} color="green.400">
                                Program Output:
                            </Text>
                            {output.map((line, index) => (
                                <Text 
                                    key={index} 
                                    fontFamily="mono" 
                                    fontSize="sm"
                                    whiteSpace="pre-wrap"
                                    color="gray.100"
                                >
                                    {line}
                                </Text>
                            ))}
                        </Box>
                    ) : (
                        <Text color="gray.400" fontSize="sm">
                            Click "Run Code" to see the output here
                        </Text>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default OutputDisplay;