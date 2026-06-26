import * as react from 'react';

/**
 * StatusBar component types
 *
 * A horizontal bar with left and right slots, designed to sit
 * above or below a text input (e.g., PromptArea) to display
 * contextual information such as branch name, model selector, etc.
 */
/**
 * Props for the StatusBar component.
 */
type StatusBarProps = {
    /** Content rendered on the left side of the bar */
    left?: React.ReactNode;
    /** Content rendered on the right side of the bar */
    right?: React.ReactNode;
    /** Additional CSS class for the root element */
    className?: string;
    /** Whether the status bar is disabled (visually dims and disables pointer events) */
    disabled?: boolean;
    /** Accessible label for the status bar */
    'aria-label'?: string;
    /** data-test-id for e2e testing */
    'data-test-id'?: string;
};

/**
 * StatusBar - A horizontal bar with left and right slots.
 *
 * Designed to sit above or below a text input (e.g., PromptArea) to
 * display contextual information. Place it as a sibling before or
 * after the input inside a shared wrapper.
 *
 * @example
 * ```tsx
 * <div className="rounded-lg border">
 *   <StatusBar
 *     left={<span>prompt-area</span>}
 *     right={<span>Default</span>}
 *   />
 *   <PromptArea value={segments} onChange={setSegments} ... />
 * </div>
 * ```
 */
declare function StatusBar({ left, right, className, disabled, 'aria-label': ariaLabel, 'data-test-id': dataTestId, ref, }: StatusBarProps & {
    ref?: React.Ref<HTMLDivElement>;
}): react.JSX.Element;

export { StatusBar as S, type StatusBarProps as a };
