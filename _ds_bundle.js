/* @ds-bundle: {"format":3,"namespace":"MoozaDesignSystem_46d3b8","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CategoryChip","sourcePath":"components/core/CategoryChip.jsx"},{"name":"DateBlock","sourcePath":"components/core/DateBlock.jsx"},{"name":"EventCard","sourcePath":"components/core/EventCard.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"PriceTag","sourcePath":"components/core/PriceTag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"f0b5b3dd2fe3","components/core/Button.jsx":"ad3a107b2e3c","components/core/CategoryChip.jsx":"648c89f09f7c","components/core/DateBlock.jsx":"d928ee1af936","components/core/EventCard.jsx":"28cb3c6b2d0d","components/core/Input.jsx":"56a8b69aac38","components/core/PriceTag.jsx":"489e5aad417d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MoozaDesignSystem_46d3b8 = window.MoozaDesignSystem_46d3b8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  label = '',
  variant = 'category'
}) {
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
    lineHeight: 1
  };
  const variants = {
    category: {
      padding: '4px 10px',
      background: 'transparent',
      color: 'var(--accent)',
      border: '1.5px solid var(--accent)'
    },
    featured: {
      padding: '4px 10px',
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid var(--accent)'
    },
    free: {
      padding: '5px 14px',
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid var(--accent)',
      fontSize: '12px',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-wide)'
    },
    warm: {
      padding: '4px 10px',
      background: 'var(--accent-warm)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid var(--accent-warm)'
    },
    muted: {
      padding: '4px 10px',
      background: 'rgba(255,255,255,0.06)',
      color: 'var(--text-secondary)',
      border: '1.5px solid var(--border-subtle)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...base,
      ...variants[variant]
    }
  }, label);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  fullWidth = false,
  onClick
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const sizeMap = {
    sm: {
      padding: '6px 18px',
      fontSize: '11px',
      gap: '5px'
    },
    md: {
      padding: '11px 26px',
      fontSize: '13px',
      gap: '6px'
    },
    lg: {
      padding: '15px 34px',
      fontSize: '15px',
      gap: '7px'
    }
  };
  const variantMap = {
    primary: {
      background: hovered ? '#fdf060' : 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: `2px solid ${hovered ? '#fdf060' : 'var(--accent)'}`,
      boxShadow: hovered ? 'var(--glow-yellow-sm)' : 'none'
    },
    secondary: {
      background: hovered ? 'rgba(252,238,33,0.08)' : 'transparent',
      color: hovered ? '#fdf060' : 'var(--accent)',
      border: `2px solid ${hovered ? '#fdf060' : 'var(--accent)'}`
    },
    ghost: {
      background: hovered ? 'rgba(255,255,255,0.07)' : 'transparent',
      color: 'var(--text-primary)',
      border: '2px solid var(--border-default)'
    },
    warm: {
      background: hovered ? '#fdc85a' : 'var(--accent-warm)',
      color: 'var(--text-on-accent)',
      border: `2px solid ${hovered ? '#fdc85a' : 'var(--accent-warm)'}`
    }
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
    ...variantMap[variant]
  };
  return /*#__PURE__*/React.createElement("button", {
    style: base,
    onClick: !disabled ? onClick : undefined,
    disabled: disabled,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/CategoryChip.jsx
try { (() => {
function CategoryChip({
  label,
  active = false,
  onClick
}) {
  const [hovered, setHovered] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: '12px',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      padding: '8px 18px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      border: `1.5px solid ${active ? 'var(--accent)' : hovered ? 'var(--accent)' : 'var(--border-subtle)'}`,
      background: active ? 'var(--accent)' : hovered ? 'rgba(252,238,33,0.07)' : 'transparent',
      color: active ? 'var(--text-on-accent)' : hovered ? 'var(--accent)' : 'var(--text-secondary)',
      userSelect: 'none',
      outline: 'none',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, label);
}
Object.assign(__ds_scope, { CategoryChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CategoryChip.jsx", error: String((e && e.message) || e) }); }

// components/core/DateBlock.jsx
try { (() => {
function DateBlock({
  day = '20',
  dayName = 'SÁB',
  variant = 'default'
}) {
  const isHighlighted = variant === 'highlighted';
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-extrabold)',
      fontSize: '24px',
      lineHeight: 1,
      letterSpacing: 'var(--tracking-tight)'
    }
  }, day), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-bold)',
      fontSize: '9px',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      marginTop: '3px',
      opacity: isHighlighted ? 0.65 : 0.45
    }
  }, dayName));
}
Object.assign(__ds_scope, { DateBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DateBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function Input({
  placeholder = 'Buscar eventos...',
  value,
  onChange,
  icon,
  size = 'md'
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
    alignItems: 'center'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'var(--bg-surface-raised)',
      border: focused ? '2px solid var(--accent)' : '2px solid var(--border-subtle)',
      borderRadius: 'var(--radius-full)',
      padding: size === 'sm' ? '8px 16px' : '12px 20px',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      boxShadow: focused ? 'var(--glow-yellow-sm)' : 'none'
    }
  }, icon === 'search' && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, "search"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: size === 'sm' ? '13px' : '15px',
      color: 'var(--text-primary)',
      flex: 1,
      minWidth: 0
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/PriceTag.jsx
try { (() => {
function PriceTag({
  price,
  variant = 'default'
}) {
  const formatCLP = n => {
    if (typeof n === 'string') return n;
    return '$' + Number(n).toLocaleString('es-CL');
  };
  const label = variant === 'free' ? 'Gratis' : variant === 'from' ? `desde ${formatCLP(price)}` : formatCLP(price);
  const isFilled = variant === 'free';
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      flexShrink: 0
    }
  }, label);
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/core/EventCard.jsx
try { (() => {
function EventCard({
  day,
  dayName,
  category,
  title,
  venue,
  time,
  price,
  priceVariant,
  featured = false,
  onClick
}) {
  const [hovered, setHovered] = React.useState(false);
  const wrapper = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: featured ? '16px' : '14px 2px',
    borderRadius: featured ? 'var(--radius-lg)' : '0',
    background: featured ? hovered ? 'var(--bg-surface-highlight)' : 'var(--bg-surface-raised)' : 'transparent',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background 0.15s ease',
    borderBottom: !featured ? '1px solid var(--divider)' : 'none',
    userSelect: 'none'
  };
  const showPrice = priceVariant === 'free' || price !== undefined;
  return /*#__PURE__*/React.createElement("div", {
    style: wrapper,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: onClick
  }, /*#__PURE__*/React.createElement(__ds_scope.DateBlock, {
    day: day,
    dayName: dayName,
    variant: featured ? 'highlighted' : 'default'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, (featured || category) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      marginBottom: '6px'
    }
  }, featured && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    label: "DESTACADO",
    variant: "featured"
  }), category && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    label: category,
    variant: "category"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-bold)',
      fontSize: '17px',
      lineHeight: 'var(--leading-snug)',
      color: 'var(--text-primary)',
      marginBottom: '4px',
      letterSpacing: 'var(--tracking-tight)',
      textWrap: 'pretty'
    }
  }, title), (venue || time) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-regular)',
      fontSize: '13px',
      color: 'var(--text-secondary)',
      lineHeight: 1.4
    }
  }, [venue, time].filter(Boolean).join(' • '))), showPrice && /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    price: price,
    variant: priceVariant || 'default'
  }));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EventCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CategoryChip = __ds_scope.CategoryChip;

__ds_ns.DateBlock = __ds_scope.DateBlock;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.PriceTag = __ds_scope.PriceTag;

})();
