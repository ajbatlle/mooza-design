/**
 * Event price pill. Outlined for paid events, yellow-filled for free events.
 */
export interface PriceTagProps {
  /** Price value — number (e.g. 6000) or pre-formatted string (e.g. "$6.000") */
  price?: number | string;
  /** default = outlined price, free = yellow "Gratis" pill, from = prefixes "desde" */
  variant?: 'default' | 'free' | 'from';
}
export declare function PriceTag(props: PriceTagProps): JSX.Element;
