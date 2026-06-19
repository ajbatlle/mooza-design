export function Badge({ label = '', variant = 'category' }) {
  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-bold)',
    fontSize: '10px',
    letterSpacing: 'var(--tracking-widest)',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-full)',
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  };

  const variants = {
    category: {
      padding: '4px 10px',
      background: 'transparent',
      color: 'var(--accent)',
      border: '1.5px solid var(--accent)',
    },
    featured: {
      padding: '4px 10px',
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid var(--accent)',
    },
    free: {
      padding: '5px 14px',
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid var(--accent)',
      fontSize: '12px',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-wide)',
    },
    warm: {
      padding: '4px 10px',
      background: 'var(--accent-warm)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid var(--accent-warm)',
    },
    muted: {
      padding: '4px 10px',
      background: 'rgba(255,255,255,0.06)',
      color: 'var(--text-secondary)',
      border: '1.5px solid var(--border-subtle)',
    },
  };

  return (
    <span style={{ ...base, ...variants[variant] }}>
      {label}
    </span>
  );
}
