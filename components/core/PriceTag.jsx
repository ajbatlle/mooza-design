export function PriceTag({ price, variant = 'default' }) {
  const formatCLP = (n) => {
    if (typeof n === 'string') return n;
    return '$' + Number(n).toLocaleString('es-CL');
  };

  const label =
    variant === 'free' ? 'Gratis' :
    variant === 'from' ? `desde ${formatCLP(price)}` :
    formatCLP(price);

  const isFilled = variant === 'free';

  return (
    <span style={{
      fontFamily: 'var(--font-sans)',
      fontWeight: isFilled ? 'var(--weight-bold)' : 'var(--weight-semibold)',
      fontSize: '13px',
      letterSpacing: isFilled ? 'var(--tracking-wide)' : 0,
      borderRadius: 'var(--radius-full)',
      padding: isFilled ? '8px 18px' : '7px 14px',
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      background: isFilled ? 'var(--accent)' : 'transparent',
      color: isFilled ? 'var(--text-on-accent)' : 'var(--text-primary)',
      border: isFilled ? '2px solid var(--accent)' : '1.5px solid var(--border-default)',
      flexShrink: 0,
    }}>
      {label}
    </span>
  );
}
