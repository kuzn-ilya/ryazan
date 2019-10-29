const reRemoveExtraSpaces = /\s+/g;
const reRemoveMarkdown = /(\*\*|_|`)/g;

export const getShortDescription = (description: string | null | undefined): string => {
    const lines = (description || '').split('\n\n', 1);
    return lines[0].replace(reRemoveExtraSpaces, ' ').replace(reRemoveMarkdown, '');
};
