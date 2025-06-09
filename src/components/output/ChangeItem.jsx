import React from 'react';
import { Box, HStack, VStack, Button, Text } from '@chakra-ui/react';

const ChangeItem = ({ change, onAccept }) => {
    const getChangeColor = (changeType) => {
        switch (changeType) {
            case 'added': return 'green.600';
            case 'deleted': return 'red.600';
            case 'modified': return 'blue.600';
            default: return 'gray.600';
        }
    };

    const getChangeSymbol = (changeType) => {
        switch (changeType) {
            case 'added': return '+';
            case 'deleted': return '-';
            case 'modified': return '~';
            default: return '?';
        }
    };

    return (
        <Box 
            p={2} 
            bg="white" 
            borderRadius="sm" 
            border="1px solid" 
            borderColor="gray.300"
        >
            <HStack justify="space-between" align="start">
                <VStack align="start" spacing={1} flex={1}>
                    <HStack spacing={2}>
                        <Text fontSize="xs" color="gray.600">
                            Line {change.lineNumber}
                        </Text>
                        <Text 
                            fontSize="xs" 
                            fontWeight="bold"
                            color={getChangeColor(change.changeType)}
                        >
                            {change.changeType}
                        </Text>
                    </HStack>
                    
                    <Box fontSize="xs" fontFamily="mono" w="100%">
                        {change.changeType !== 'added' && (
                            <HStack spacing={1} mb={1}>
                                <Text color="red.600" fontWeight="bold">-</Text>
                                <Text 
                                    color="red.600" 
                                    textDecoration="line-through"
                                    wordBreak="break-all"
                                >
                                    {change.originalLine || '(empty line)'}
                                </Text>
                            </HStack>
                        )}
                        
                        {change.changeType !== 'deleted' && (
                            <HStack spacing={1}>
                                <Text color="green.600" fontWeight="bold">+</Text>
                                <Text 
                                    color="green.600"
                                    wordBreak="break-all"
                                >
                                    {change.fixedLine || '(empty line)'}
                                </Text>
                            </HStack>
                        )}
                    </Box>
                </VStack>
                
                <Button
                    size="xs"
                    colorScheme="blue"
                    onClick={onAccept}
                    flexShrink={0}
                >
                    Accept
                </Button>
            </HStack>
        </Box>
    );
};

export default ChangeItem;