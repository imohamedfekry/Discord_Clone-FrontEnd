import { useEffect } from 'react';

interface KeyboardShortcut {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
    callback: (event: KeyboardEvent) => void;
    description?: string;
}

/**
 * Custom hook for handling keyboard shortcuts and navigation
 * @param shortcuts - Array of keyboard shortcut configurations
 * @param enabled - Whether the shortcuts should be active (default: true)
 */
export const useKeyboardNavigation = (shortcuts: KeyboardShortcut[], enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            shortcuts.forEach(({ key, ctrl, shift, alt, meta, callback }) => {
                const keyMatches = event.key.toLowerCase() === key.toLowerCase();
                const ctrlMatches = ctrl === undefined || event.ctrlKey === ctrl;
                const shiftMatches = shift === undefined || event.shiftKey === shift;
                const altMatches = alt === undefined || event.altKey === alt;
                const metaMatches = meta === undefined || event.metaKey === meta;

                if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
                    event.preventDefault();
                    callback(event);
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts, enabled]);
    useEffect(() => {
        // Create live region for announcements if it doesn't exist
        if (!document.getElementById('sr-announcer')) {
            const announcer = document.createElement('div');
            announcer.id = 'sr-announcer';
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
            document.body.appendChild(announcer);
        }
    }, []);

    const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
        const announcer = document.getElementById('sr-announcer');
        if (announcer) {
            announcer.setAttribute('aria-live', priority);
            announcer.textContent = message;
            // Clear after announcement
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    };

    return { announce };
};

export default useKeyboardNavigation;
