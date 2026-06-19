/**
 * Category and status label pills. Use for event categories (MÚSICA, TEATRO), DESTACADO featured tags, and Gratis free indicators.
 */
export interface BadgeProps {
  /** Display text */
  label: string;
  /** Visual style — category (yellow outline), featured (yellow fill), free (yellow fill, larger), warm (orange fill), muted (subtle) */
  variant?: 'category' | 'featured' | 'free' | 'warm' | 'muted';
}
export declare function Badge(props: BadgeProps): JSX.Element;
