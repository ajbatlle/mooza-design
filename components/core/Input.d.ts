/**
 * Text input field. Pill-shaped with yellow focus ring. Use for event search, location filter, and form fields.
 */
export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 'search' adds magnifier icon prefix */
  icon?: 'search';
  size?: 'sm' | 'md';
}
export declare function Input(props: InputProps): JSX.Element;
