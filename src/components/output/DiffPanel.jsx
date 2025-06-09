import React from 'react';
import { Box, HStack, VStack, Button, Text, Badge } from '@chakra-ui/react';
import ChangeItem from './ChangeItem';

const DiffPanel = ({ isVisible, suggestedFixes, onAcceptAll, onAcceptLine, onDismiss }) => {
    if (!isVisible || suggestedFixes.length === 0) return null;

    const changesCount = suggestedFixes[0]?.changes.length || 0;

    return (
        <Box 
            mb={4} 
            p={3} 
            bg="gray.50" 
            borderRadius="md" 
            border="1px solid" 
            borderColor="gray.200"
        >
            <HStack justify="space-between" mb={3}>
                <VStack align="start" spacing={1}>
                    <Text fontSize="sm" fontWeight="bold" color="blue.600">
                        Error Fix Suggestions Ready
                    </Text>
                    <Badge colorScheme="blue" size="sm">
                        {changesCount} changes proposed
                    </Badge>
                </VStack>
                
                <HStack spacing={2}>
                    <Button
                        size="sm"
                        colorScheme="green"
                        onClick={onAcceptAll}
                    >
                        Accept All
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onDismiss}
                    >
                        Dismiss
                    </Button>
                </HStack>
            </HStack>
            
            <VStack align="stretch" spacing={2}>
                {suggestedFixes[0]?.changes.map((change, index) => (
                    <ChangeItem
                        key={index}
                        change={change}
                        onAccept={() => onAcceptLine(change.lineNumber)}
                    />
                ))}
            </VStack>
        </Box>
    );
};

export default DiffPanel;