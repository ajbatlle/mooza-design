/**
 * Mooza action button. Use Primary for CTAs, Secondary for alternatives, Ghost for tertiary actions.
 * @startingPoint section="Core" subtitle="Action buttons — primary, secondary, ghost, warm variants" viewport="700x200"
 */
export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'ghost' | 'warm';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Expand to full container width */
  fullWidth?: boolean;
  /** Disables interaction and dims to 40% opacity */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  children: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
