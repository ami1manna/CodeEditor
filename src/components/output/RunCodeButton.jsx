import React from 'react';
import { Button } from '@chakra-ui/react';

const RunCodeButton = ({ isLoading, onClick }) => {
    return (
        <Button
            isLoading={isLoading}
            onClick={onClick}
            variant='outline'
            colorScheme='green'
            loadingText="Running..."
        >
            Run Code
        </Button>
    );
};

export default RunCodeButton;