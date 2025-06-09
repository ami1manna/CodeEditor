import React from 'react';
import { Button } from '@chakra-ui/react';

const FixErrorButton = ({ isVisible, isLoading, onClick }) => {
    if (!isVisible) return null;

    return (
        <Button
            isLoading={isLoading}
            onClick={onClick}
            variant='outline'
            colorScheme='red'
            size="md"
            loadingText="Fixing..."
        >
            Fix Error
        </Button>
    );
};

export default FixErrorButton;