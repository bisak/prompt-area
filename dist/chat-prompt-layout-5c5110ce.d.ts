import * as react from 'react';

/**
 * ChatPromptLayout component types
 *
 * A full-height chat layout with a scrollable messages area and
 * a bottom-anchored prompt slot. Includes contextual scroll
 * navigation buttons.
 */
/**
 * Props for the ChatPromptLayout component.
 */
type ChatPromptLayoutProps = {
    /** Chat messages rendered in the scrollable area */
    children: React.ReactNode;
    /** Prompt area rendered at the bottom of the layout (slot) */
    prompt: React.ReactNode;
    /** Additional CSS class for the root container */
    className?: string;
    /** Accessible label for the layout region */
    'aria-label'?: string;
    /** data-test-id for e2e testing */
    'data-test-id'?: string;
};

/**
 * ChatPromptLayout - A full-height chat layout with scrollable messages
 * and a bottom-anchored prompt slot.
 *
 * Pass chat messages as `children` and the prompt area via the `prompt`
 * prop. Contextual scroll buttons appear when the user scrolls away
 * from the top or bottom of the messages area.
 *
 * @example
 * ```tsx
 * <ChatPromptLayout
 *   className="h-[600px]"
 *   prompt={
 *     <div className="border-t p-4">
 *       <PromptArea ... />
 *       <ActionBar ... />
 *     </div>
 *   }
 * >
 *   {messages.map(msg => <ChatBubble key={msg.id} {...msg} />)}
 * </ChatPromptLayout>
 * ```
 */
declare function ChatPromptLayout({ children, prompt, className, 'aria-label': ariaLabel, 'data-test-id': dataTestId, ref, }: ChatPromptLayoutProps & {
    ref?: React.Ref<HTMLDivElement>;
}): react.JSX.Element;

export { ChatPromptLayout as C, type ChatPromptLayoutProps as a };
