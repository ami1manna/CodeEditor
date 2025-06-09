// Utility functions for the Output components

export const calculateChanges = (original, fixed) => {
    const originalLines = original.split('\n');
    const fixedLines = fixed.split('\n');
    const changes = [];

    const maxLines = Math.max(originalLines.length, fixedLines.length);
    
    for (let i = 0; i < maxLines; i++) {
        const originalLine = originalLines[i] || '';
        const fixedLine = fixedLines[i] || '';
        
        if (originalLine !== fixedLine) {
            changes.push({
                lineNumber: i + 1,
                originalLine,
                fixedLine,
                changeType: originalLine === '' ? 'added' : 
                           fixedLine === '' ? 'deleted' : 'modified'
            });
        }
    }
    
    return changes;
};

export const addDiffStyles = () => {
    if (document.getElementById('diff-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'diff-styles';
    style.textContent = `
        .error-line-decoration {
            background-color: rgba(255, 107, 107, 0.2) !important;
            border-left: 3px solid #ff6b6b !important;
        }
        .error-line-glyph {
            background-color: #ff6b6b !important;
            width: 3px !important;
        }
        .diff-accept-button {
            position: absolute;
            right: 10px;
            z-index: 1000;
            opacity: 0.8;
        }
        .diff-accept-button:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
};

export const cleanAIResponse = (response) => {
    return response
        .replace(/```[\w]*\n?/g, '') // Remove code block markers
        .replace(/^\s*[\r\n]/gm, '\n') // Clean empty lines
        .trim();
};