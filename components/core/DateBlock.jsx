export function DateBlock({ day = '20', dayName = 'SÁB', variant = 'default' }) {
  const isHighlighted = variant === 'highlighted';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '54px',
      minWidth: '54px',
      height: '58px',
      borderRadius: 'var(--radius-md)',
      background: isHighlighted ? 'var(--accent)' : 'var(--bg-base)',
      color: isHighlighted ? 'var(--text-on-accent)' : 'var(--text-primary)',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-extrabold)',
        fontSize: '24px',
        lineHeight: 1,
        letterSpacing: 'var(--tracking-tight)',
      }}>
        {day}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-bold)',
        fontSize: '9px',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
        marginTop: '3px',
        opacity: isHighlighted ? 0.65 : 0.45,
      }}>
        {dayName}
      </span>
    </div>
  );
}
