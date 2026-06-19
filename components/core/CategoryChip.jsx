export function CategoryChip({ label, active = false, onClick }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-semibold)',
        fontSize: '12px',
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
        padding: '8px 18px',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        border: `1.5px solid ${active ? 'var(--accent)' : (hovered ? 'var(--accent)' : 'var(--border-subtle)')}`,
        background: active ? 'var(--accent)' : (hovered ? 'rgba(252,238,33,0.07)' : 'transparent'),
        color: active ? 'var(--text-on-accent)' : (hovered ? 'var(--accent)' : 'var(--text-secondary)'),
        userSelect: 'none',
        outline: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}
