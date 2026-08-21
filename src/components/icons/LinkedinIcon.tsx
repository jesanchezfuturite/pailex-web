export default function LinkedinIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M5.6 8.2h3.3v11H5.6v-11ZM7.25 6.7A1.9 1.9 0 1 1 7.26 2.9a1.9 1.9 0 0 1-.01 3.8ZM11.6 8.2h3.15v1.5h.05c.44-.83 1.5-1.7 3.1-1.7 3.3 0 3.9 2.17 3.9 5v6.2h-3.3v-5.5c0-1.3-.02-3-1.82-3-1.83 0-2.1 1.43-2.1 2.9v5.6H11.6v-11Z" />
    </svg>
  );
}
