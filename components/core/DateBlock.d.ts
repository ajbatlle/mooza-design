/**
 * Day number + abbreviated day name block. Always the leftmost element of an EventCard.
 */
export interface DateBlockProps {
  /** Day number as string, e.g. "20" */
  day: string;
  /** 3-letter Spanish day abbreviation, e.g. "SÁB", "MAR", "VIE" */
  dayName: string;
  /** highlighted renders yellow bg with dark text — use for DESTACADO events */
  variant?: 'default' | 'highlighted';
}
export declare function DateBlock(props: DateBlockProps): JSX.Element;
