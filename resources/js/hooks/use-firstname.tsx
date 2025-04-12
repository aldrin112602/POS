import { useCallback } from 'react';

export function useFirstname() {
    return useCallback((fullName: string): string => {
        const names = fullName.trim().split(' ');
        if (names.length === 0) return '';
        if (names.length === 1) return fullName;
        return names[0];
    }, []);
}
