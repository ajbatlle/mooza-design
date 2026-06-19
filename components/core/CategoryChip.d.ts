/**
 * Filter chip for event categories. Use in a horizontally-scrollable row above event listings.
 */
export interface CategoryChipProps {
  label: string;
  /** Active state renders yellow fill */
  active?: boolean;
  onClick?: () => void;
}
export declare function CategoryChip(props: CategoryChipProps): JSX.Element;
