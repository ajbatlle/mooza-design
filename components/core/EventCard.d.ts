/**
 * Core Mooza event listing row. Composes DateBlock + Badge + content + PriceTag. Use featured=true for DESTACADO events.
 * @startingPoint section="Core" subtitle="Cultural event listing — standard and featured (DESTACADO) variants" viewport="700x200"
 */
export interface EventCardProps {
  /** Day number, e.g. "20" */
  day: string;
  /** Spanish day abbreviation, e.g. "SÁB" */
  dayName: string;
  /** Category label, e.g. "MÚSICA" or "DESTACADO • TEATRO" */
  category?: string;
  /** Event name in sentence case */
  title: string;
  /** Venue name */
  venue?: string;
  /** Time in 24h format, e.g. "22:00" */
  time?: string;
  /** Price value — number or pre-formatted string */
  price?: number | string;
  /** Price pill variant */
  priceVariant?: 'default' | 'free' | 'from';
  /** Renders with highlighted card background and yellow DateBlock */
  featured?: boolean;
  /** Click handler — enables pointer cursor */
  onClick?: () => void;
}
export declare function EventCard(props: EventCardProps): JSX.Element;
