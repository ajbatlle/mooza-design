import { DateBlock } from './DateBlock.jsx';
import { Badge } from './Badge.jsx';
import { PriceTag } from './PriceTag.jsx';

export function EventCard({
  day,
  dayName,
  category,
  title,
  venue,
  time,
  price,
  priceVariant,
  featured = false,
  onClick,
}) {
  const [hovered, setHovered] = React.useState(false);

  const wrapper = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: featured ? '16px' : '14px 2px',
    borderRadius: featured ? 'var(--radius-lg)' : '0',
    background: featured
      ? (hovered ? 'var(--bg-surface-highlight)' : 'var(--bg-surface-raised)')
      : 'transparent',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background 0.15s ease',
    borderBottom: !featured ? '1px solid var(--divider)' : 'none',
    userSelect: 'none',
  };

  const showPrice = priceVariant === 'free' || price !== undefined;

  return (
    <div
      style={wrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <DateBlock
        day={day}
        dayName={dayName}
        variant={featured ? 'highlighted' : 'default'}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        {(featured || category) && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
            {featured && <Badge label="DESTACADO" variant="featured" />}
            {category && <Badge label={category} variant="category" />}
          </div>
        )}
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 'var(--weight-bold)',
          fontSize: '17px',
          lineHeight: 'var(--leading-snug)',
          color: 'var(--text-primary)',
          marginBottom: '4px',
          letterSpacing: 'var(--tracking-tight)',
          textWrap: 'pretty',
        }}>
          {title}
        </div>
        {(venue || time) && (
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 'var(--weight-regular)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
          }}>
            {[venue, time].filter(Boolean).join(' • ')}
          </div>
        )}
      </div>

      {showPrice && (
        <PriceTag price={price} variant={priceVariant || 'default'} />
      )}
    </div>
  );
}
