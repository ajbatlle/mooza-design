export function Button({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  fullWidth = false,
  onClick,
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const sizeMap = {
    sm: { padding: '6px 18px',  fontSize: '11px', gap: '5px' },
    md: { padding: '11px 26px', fontSize: '13px', gap: '6px' },
    lg: { padding: '15px 34px', fontSize: '15px', gap: '7px' },
  };

  const variantMap = {
    primary: {
      background: hovered ? '#fdf060' : 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: `2px solid ${hovered ? '#fdf060' : 'var(--accent)'}`,
      boxShadow: hovered ? 'var(--glow-yellow-sm)' : 'none',
    },
    secondary: {
      background: hovered ? 'rgba(252,238,33,0.08)' : 'transparent',
      color: hovered ? '#fdf060' : 'var(--accent)',
      border: `2px solid ${hovered ? '#fdf060' : 'var(--accent)'}`,
    },
    ghost: {
      background: hovered ? 'rgba(255,255,255,0.07)' : 'transparent',
      color: 'var(--text-primary)',
      border: '2px solid var(--border-default)',
    },
    warm: {
      background: hovered ? '#fdc85a' : 'var(--accent-warm)',
      color: 'var(--text-on-accent)',
      border: `2px solid ${hovered ? '#fdc85a' : 'var(--accent-warm)'}`,
    },
  };

  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-bold)',
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-full)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
    transition: 'all 0.15s ease',
    outline: 'none',
    userSelect: 'none',
    textDecoration: 'none',
    lineHeight: 1,
    ...sizeMap[size],
    ...variantMap[variant],
  };

  return (
    <button
      style={base}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {children}
    </button>
  );
}
