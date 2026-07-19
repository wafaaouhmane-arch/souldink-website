/**
 * The Moroccan eight-pointed star (two overlapping squares) — Doulabot's
 * signature mark. Use sparingly: loading states, section dividers. Not a
 * repeated decoration.
 */
function StarMark({ size = 32, color = '#A6395F', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <g transform="translate(17,17)">
        <rect x="-12" y="-12" width="24" height="24" fill={color} />
        <rect
          x="-12"
          y="-12"
          width="24"
          height="24"
          fill={color}
          transform="rotate(45)"
        />
      </g>
    </svg>
  )
}

export default StarMark
