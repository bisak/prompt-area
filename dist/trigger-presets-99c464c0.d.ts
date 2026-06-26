import { S as Segment, a as TriggerPosition, e as TriggerConfig, A as ActiveTrigger, T as TextSegment, C as ChipSegment } from './types-873e54ca.js';

/**
 * Pure logic engine for the PromptArea component.
 * No DOM dependencies - fully testable in Node.
 */

/**
 * Converts an array of segments to a plain text string.
 * Chips are represented as `{trigger}{displayText}` (e.g., "@Alice").
 */
declare function segmentsToPlainText(segments: Segment[]): string;
/**
 * Converts plain text into a single text segment.
 * Used for initial value conversion from plain strings.
 */
declare function plainTextToSegments(text: string): Segment[];
/**
 * Checks whether a trigger character at the given position in text
 * is valid according to the position rule.
 *
 * @param text - The full text content
 * @param charIndex - The index of the trigger character in the text
 * @param position - The position rule to validate against
 */
declare function isValidTriggerPosition(text: string, charIndex: number, position: TriggerPosition): boolean;
/**
 * Scans backwards from the cursor position to detect if the user is
 * currently typing a trigger word.
 *
 * Returns the active trigger info, or null if no trigger is active.
 *
 * @param text - The full plain text content
 * @param cursorPos - The cursor position (character offset from start)
 * @param triggers - Available trigger configurations
 */
declare function detectActiveTrigger(text: string, cursorPos: number, triggers: TriggerConfig[]): ActiveTrigger | null;
/**
 * Resolves an active trigger into a chip within the segments array.
 * Replaces the trigger text (trigger char + query) with a chip segment.
 *
 * @param segments - Current document segments
 * @param activeTrigger - The active trigger to resolve
 * @param chip - The chip data (value, displayText, optional data)
 * @returns New segments array with the chip inserted, and the new cursor position
 */
declare function resolveChip(segments: Segment[], activeTrigger: ActiveTrigger, chip: {
    value: string;
    displayText: string;
    data?: unknown;
    autoResolved?: boolean;
}): {
    segments: Segment[];
    cursorOffset: number;
};
/**
 * Scans text segments for trigger patterns and auto-resolves them into chips.
 * Only resolves triggers that have `resolveOnSpace: true`.
 *
 * Trigger patterns must appear at word boundaries: start of text, after
 * whitespace, or after a newline. This avoids false positives like email
 * addresses (user@example.com).
 */
declare function resolveTriggersInSegments(segments: Segment[], triggers: TriggerConfig[]): Segment[];
type MarkdownToken = {
    type: 'plain';
    text: string;
} | {
    type: 'bold';
    text: string;
} | {
    type: 'italic';
    text: string;
} | {
    type: 'bold-italic';
    text: string;
} | {
    type: 'url';
    text: string;
};
/**
 * Parses text for simple inline markdown: bold, italic, bold-italic, and URLs.
 * Does NOT handle block-level markdown (lists, headings, etc.).
 */
declare function parseInlineMarkdown(text: string): MarkdownToken[];
/**
 * Shallow equality check for two segment arrays.
 * Compares type, text, trigger, value, displayText, and autoResolved fields.
 * Avoids JSON.stringify overhead for the common case.
 */
declare function segmentsEqual(a: Segment[], b: Segment[]): boolean;
/**
 * Merges adjacent text segments into single text segments.
 * Also removes empty text segments.
 */
declare function mergeAdjacentTextSegments(segments: Segment[]): Segment[];

/**
 * Convenience helpers for creating and inspecting Segments.
 *
 * These reduce boilerplate when building AI chat UIs that work with the
 * PromptArea document model.
 *
 * @example
 * ```ts
 * import { text, chip, isSegmentsEmpty, segmentsToPlainText } from './segment-helpers'
 *
 * const greeting = [text('Hello '), chip({ trigger: '@', value: 'u1', displayText: 'Alice' })]
 * isSegmentsEmpty(greeting) // false
 * segmentsToPlainText(greeting) // "Hello @Alice"
 * ```
 */

/** Create a text segment. */
declare function text(value: string): TextSegment;
/** Create a chip segment. */
declare function chip(opts: Omit<ChipSegment, 'type'>): ChipSegment;
/** Returns `true` when the segment array is empty or contains only whitespace text. */
declare function isSegmentsEmpty(segments: Segment[]): boolean;
/** Returns `true` when the segment array contains at least one chip. */
declare function hasChips(segments: Segment[]): boolean;
/** Extracts all chip segments from a segment array. */
declare function getChips(segments: Segment[]): ChipSegment[];
/** Extracts chips matching a specific trigger character. */
declare function getChipsByTrigger(segments: Segment[], trigger: string): ChipSegment[];

/**
 * Pre-built trigger configuration factories for common AI chat patterns.
 *
 * Each factory returns a full `TriggerConfig` with sensible defaults.
 * Pass only what you need to override.
 *
 * @example
 * ```tsx
 * <PromptArea
 *   triggers={[
 *     mentionTrigger({ onSearch: searchUsers }),
 *     commandTrigger({ onSearch: searchCommands }),
 *     hashtagTrigger(),
 *   ]}
 * />
 * ```
 */

type TriggerPresetOptions = Omit<Partial<TriggerConfig>, 'char' | 'position' | 'mode'>;
type MentionTriggerOptions = TriggerPresetOptions & {
    /** Override the trigger character. Defaults to `'@'`. */
    char?: string;
};
/**
 * Creates a **mention** trigger (`@`).
 *
 * Defaults: `position: 'any'`, `mode: 'dropdown'`, `chipStyle: 'pill'`,
 * accessible label `"mention"`.
 */
declare function mentionTrigger(opts?: MentionTriggerOptions): TriggerConfig;
type CommandTriggerOptions = TriggerPresetOptions & {
    /** Override the trigger character. Defaults to `'/'`. */
    char?: string;
    /**
     * Where the command trigger is valid. Defaults to `'any'`, so commands fire
     * anywhere a `/` follows whitespace — not just at the start of a line.
     * Set to `'start'` to restrict the dropdown to the very start of the input
     * or immediately after a newline (the classic slash-command behavior).
     */
    position?: TriggerPosition;
};
/**
 * Creates a **command** trigger (`/`).
 *
 * Defaults: `position: 'any'`, `mode: 'dropdown'`, `chipStyle: 'inline'`,
 * accessible label `"command"`.
 *
 * By default commands work everywhere in the input. Pass `position: 'start'`
 * to limit them to the start of a line.
 */
declare function commandTrigger(opts?: CommandTriggerOptions): TriggerConfig;
type HashtagTriggerOptions = TriggerPresetOptions & {
    /** Override the trigger character. Defaults to `'#'`. */
    char?: string;
};
/**
 * Creates a **hashtag / tag** trigger (`#`).
 *
 * Defaults: `position: 'any'`, `mode: 'dropdown'`, `chipStyle: 'pill'`,
 * `resolveOnSpace: true`, accessible label `"tag"`.
 */
declare function hashtagTrigger(opts?: HashtagTriggerOptions): TriggerConfig;
type CallbackTriggerOptions = Omit<Partial<TriggerConfig>, 'mode'> & {
    /** The trigger character. Required. */
    char: string;
};
/**
 * Creates a **callback** trigger that fires `onActivate` instead of showing
 * a dropdown. Useful for opening file pickers, model selectors, etc.
 *
 * Defaults: `position: 'start'`, `mode: 'callback'`.
 */
declare function callbackTrigger(opts: CallbackTriggerOptions): TriggerConfig;

export { type CommandTriggerOptions as C, type HashtagTriggerOptions as H, type MarkdownToken as M, getChipsByTrigger as a, isValidTriggerPosition as b, chip as c, detectActiveTrigger as d, resolveTriggersInSegments as e, parseInlineMarkdown as f, getChips as g, hasChips as h, isSegmentsEmpty as i, segmentsEqual as j, mentionTrigger as k, commandTrigger as l, mergeAdjacentTextSegments as m, hashtagTrigger as n, callbackTrigger as o, plainTextToSegments as p, type MentionTriggerOptions as q, resolveChip as r, segmentsToPlainText as s, text as t, type CallbackTriggerOptions as u };
