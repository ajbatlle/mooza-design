export function Input({
  placeholder = 'Buscar eventos...',
  value,
  onChange,
  icon,
  size = 'md',
}) {
  const [focused, setFocused] = React.useState(false);

  const iconStyle = {
    fontFamily: "'Material Symbols Outlined'",
    fontSize: size === 'sm' ? '18px' : '20px',
    lineHeight: 1,
    fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20",
    color: focused ? 'var(--accent)' : 'var(--text-muted)',
    flexShrink: 0,
    transition: 'color 0.15s ease',
    userSelect: 'none',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    textTransform: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'var(--bg-surface-raised)',
      border: focused
        ? '2px solid var(--accent)'
        : '2px solid var(--border-subtle)',
      borderRadius: 'var(--radius-full)',
      padding: size === 'sm' ? '8px 16px' : '12px 20px',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      boxShadow: focused ? 'var(--glow-yellow-sm)' : 'none',
    }}>
      {icon === 'search' && (
        <span style={iconStyle}>search</span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: 'var(--font-sans)',
          fontWeight: 'var(--weight-medium)',
          fontSize: size === 'sm' ? '13px' : '15px',
          color: 'var(--text-primary)',
          flex: 1,
          minWidth: 0,
        }}
      />
    </div>
  );
}
