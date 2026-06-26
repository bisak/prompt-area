import * as react from 'react';

/**
 * ActionBar component types
 *
 * A horizontal toolbar with left and right slots, designed to sit
 * below a text input (e.g., PromptArea) and stay anchored via
 * normal document flow.
 */
/**
 * Props for the ActionBar component.
 */
type ActionBarProps = {
    /** Content rendered on the left side of the bar */
    left?: React.ReactNode;
    /** Content rendered on the right side of the bar */
    right?: React.ReactNode;
    /** Additional CSS class for the root element */
    className?: string;
    /** Additional CSS class for the left slot wrapper */
    leftClassName?: string;
    /** Additional CSS class for the right slot wrapper */
    rightClassName?: string;
    /** Whether the action bar is disabled (visually dims and disables pointer events) */
    disabled?: boolean;
    /** Accessible label for the toolbar */
    'aria-label'?: string;
    /** data-test-id for e2e testing */
    'data-test-id'?: string;
};

/**
 * ActionBar - A horizontal toolbar with left and right slots.
 *
 * Designed to sit below a text input (e.g., PromptArea) and stay
 * anchored via normal document flow. Place it as a sibling after
 * the input inside a shared wrapper.
 *
 * @example
 * ```tsx
 * <div className="rounded-lg border p-4">
 *   <PromptArea value={segments} onChange={setSegments} ... />
 *   <ActionBar
 *     left={
 *       <>
 *         <button><PlusCircle /></button>
 *         <button><AtSign /></button>
 *       </>
 *     }
 *     right={
 *       <>
 *         <button><Mic /></button>
 *         <button onClick={handleSubmit}><ArrowUp /></button>
 *       </>
 *     }
 *   />
 * </div>
 * ```
 */
declare function ActionBar({ left, right, className, leftClassName, rightClassName, disabled, 'aria-label': ariaLabel, 'data-test-id': dataTestId, ref, }: ActionBarProps & {
    ref?: React.Ref<HTMLDivElement>;
}): react.JSX.Element;

export { ActionBar, type ActionBarProps };
