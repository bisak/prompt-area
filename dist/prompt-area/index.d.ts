import * as react from 'react';
import { d as PromptAreaProps, b as PromptAreaHandle, S as Segment, f as TriggerConfig, C as ChipSegment, A as ActiveTrigger, i as TriggerSuggestion } from '../types-BFUUkyja.js';
export { a as ChipStyle, P as PromptAreaFile, c as PromptAreaImage, T as TextSegment, e as TriggerActivateContext, g as TriggerMode, h as TriggerPosition } from '../types-BFUUkyja.js';
export { CallbackTriggerOptions, CommandTriggerOptions, HashtagTriggerOptions, MarkdownToken, MentionTriggerOptions, callbackTrigger, chip, commandTrigger, detectActiveTrigger, getChips, getChipsByTrigger, hasChips, hashtagTrigger, isSegmentsEmpty, isValidTriggerPosition, mentionTrigger, mergeAdjacentTextSegments, parseInlineMarkdown, plainTextToSegments, resolveChip, resolveTriggersInSegments, segmentsEqual, segmentsToPlainText, text } from '../helpers/index.js';

/**
 * PromptArea - A lightweight rich text input with trigger support.
 *
 * Uses contentEditable to support inline chips (immutable pills) for
 * mentions, commands, and other triggered tokens. Each trigger character
 * can be configured to show a dropdown or fire a callback.
 *
 * @example
 * ```tsx
 * const [segments, setSegments] = useState<Segment[]>([])
 *
 * <PromptArea
 *   value={segments}
 *   onChange={setSegments}
 *   triggers={[
 *     { char: '@', position: 'any', mode: 'dropdown', onSearch: searchUsers },
 *     { char: '/', position: 'start', mode: 'dropdown', onSearch: searchCommands },
 *     { char: '#', position: 'any', mode: 'dropdown', onSearch: searchTags },
 *   ]}
 *   placeholder="Type a message..."
 *   onSubmit={handleSubmit}
 *   autoGrow
 * />
 * ```
 */
declare function PromptArea({ value, onChange, triggers, placeholder, className, disabled, markdown, normalizeBullets, onSubmit, onEscape, onChipClick, onChipAdd, onChipDelete, onLinkClick, onPaste, onUndo, onRedo, minHeight, maxHeight, autoFocus, autoGrow, 'aria-label': ariaLabel, 'data-test-id': dataTestId, images, imagePosition, onImagePaste, onImageRemove, onImageClick, files, filePosition, onFileRemove, onFileClick, onKeyDown, onBlur, onRawPaste, submitOnEnter, spellCheck, maxLength, 'aria-describedby': ariaDescribedBy, ref, }: PromptAreaProps & {
    ref?: React.Ref<PromptAreaHandle>;
}): react.JSX.Element;

type UsePromptAreaOptions = {
    value: Segment[];
    onChange: (segments: Segment[]) => void;
    triggers?: TriggerConfig[];
    onSubmit?: (segments: Segment[]) => void;
    onEscape?: () => void;
    onChipClick?: (chip: ChipSegment) => void;
    onChipAdd?: (chip: ChipSegment) => void;
    onChipDelete?: (chip: ChipSegment) => void;
    onLinkClick?: (url: string) => void;
    onPaste?: (data: {
        segments: Segment[];
        source: 'internal' | 'external';
    }) => void;
    onRawPaste?: (e: React.ClipboardEvent<HTMLDivElement>) => void;
    onUndo?: (segments: Segment[]) => void;
    onRedo?: (segments: Segment[]) => void;
    onImagePaste?: (file: File) => void;
    markdown?: boolean;
    normalizeBullets?: boolean;
    submitOnEnter?: boolean;
    maxLength?: number;
};
type UsePromptAreaReturn = {
    editorRef: React.RefObject<HTMLDivElement | null>;
    activeTrigger: ActiveTrigger | null;
    suggestions: TriggerSuggestion[];
    suggestionsLoading: boolean;
    suggestionsError: string | null;
    selectedSuggestionIndex: number;
    handleInput: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    selectSuggestion: (suggestion: TriggerSuggestion) => void;
    dismissTrigger: () => void;
    handle: PromptAreaHandle;
    triggerRect: DOMRect | null;
    eventHandlers: {
        onPaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;
        onCopy: (e: React.ClipboardEvent<HTMLDivElement>) => void;
        onCut: (e: React.ClipboardEvent<HTMLDivElement>) => void;
        onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
        onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
        onCompositionStart: () => void;
        onCompositionEnd: () => void;
        onBlur: () => void;
    };
};
declare function usePromptArea({ value, onChange, triggers, onSubmit, onEscape, onChipClick, onChipAdd, onChipDelete, onLinkClick, onPaste, onRawPaste, onUndo, onRedo, onImagePaste, markdown: markdownEnabled, normalizeBullets, submitOnEnter, maxLength, }: UsePromptAreaOptions): UsePromptAreaReturn;

/**
 * Convenience hook that wires up all the boilerplate state for a PromptArea.
 *
 * Instead of manually managing `useState<Segment[]>`, `useRef<PromptAreaHandle>`,
 * and computing derived values, call `usePromptAreaState()` once and spread
 * `bind` into your `<PromptArea>`.
 *
 * @example
 * ```tsx
 * function ChatInput() {
 *   const { bind, plainText, isEmpty, chips, clear, focus } = usePromptAreaState()
 *
 *   return (
 *     <PromptArea
 *       {...bind}
 *       onSubmit={() => {
 *         sendMessage(plainText)
 *         clear()
 *       }}
 *     />
 *   )
 * }
 * ```
 */

type UsePromptAreaStateOptions = {
    /** Initial segment value. Defaults to `[]`. */
    initialValue?: Segment[];
};
type PromptAreaBind = {
    /** Ref to attach to PromptArea — gives access to imperative methods. */
    ref: React.RefObject<PromptAreaHandle | null>;
    /** Current segment array — pass as `value` prop. */
    value: Segment[];
    /** Setter — pass as `onChange` prop. */
    onChange: (segments: Segment[]) => void;
};
type PromptAreaState = {
    /** Props to spread directly onto `<PromptArea {...bind} />`. Contains ref, value, and onChange. */
    bind: PromptAreaBind;
    /** Derived plain text representation of the current value. */
    plainText: string;
    /** `true` when the value is empty or whitespace-only. */
    isEmpty: boolean;
    /** `true` when the value contains at least one chip. */
    hasChips: boolean;
    /** All chip segments in the current value. */
    chips: ChipSegment[];
    /** Clear all content (both state and the editor DOM). */
    clear: () => void;
    /** Focus the editor. */
    focus: () => void;
    /** Blur the editor. */
    blur: () => void;
    /** Insert a chip at the current cursor position. */
    insertChip: (chip: Omit<ChipSegment, 'type'>) => void;
};
declare function usePromptAreaState(options?: UsePromptAreaStateOptions): PromptAreaState;

export { ActiveTrigger, ChipSegment, PromptArea, type PromptAreaBind, PromptAreaHandle, PromptAreaProps, type PromptAreaState, Segment, TriggerConfig, TriggerSuggestion, type UsePromptAreaStateOptions, usePromptArea, usePromptAreaState };
