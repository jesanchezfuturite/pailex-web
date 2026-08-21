export default function FacebookIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2C15.9 5.1 15 5 13.9 5c-2.3 0-3.9 1.4-3.9 4v2h-2.4v2.8h2.4V21h3.5Z" />
    </svg>
  );
}
