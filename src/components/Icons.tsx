type IconProps = { className?: string };

const base = "h-5 w-5";

export const SearchIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
);

export const HeartIcon = ({ className = base, filled = false }: IconProps & { filled?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5c0 5.15-7 9.5-7 9.5Z" strokeLinejoin="round" />
  </svg>
);

export const BagIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
  </svg>
);

export const UserIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="12" cy="9" r="3.4" />
    <path d="M5 20c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" strokeLinecap="round" />
  </svg>
);

export const MenuIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
);

export const StarIcon = ({ className = "h-4 w-4", filled = true }: IconProps & { filled?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="m12 3.6 2.6 5.3 5.9.8-4.3 4.1 1.1 5.8L12 16.9l-5.3 2.7 1.1-5.8L3.5 9.7l5.9-.8L12 3.6Z" strokeLinejoin="round" />
  </svg>
);

export const ChevronIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WhatsAppIcon = ({ className = "h-6 w-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.8-.2a12 12 0 0 1-4-2.6 11 11 0 0 1-2.2-3.3c-.3-.8-.2-1.5.1-2 .2-.4.5-.6.8-.9.2-.2.4-.2.6-.2h.5c.2 0 .4 0 .6.4l.8 1.8c.1.2 0 .4-.1.6l-.4.5c-.2.2-.3.3-.1.6.5.9 1.1 1.6 2 2.2.4.3.7.4 1 .1l.6-.6c.2-.2.4-.2.6-.1l1.7.8c.3.2.4.3.4.5s0 .8-.1 1Z" />
  </svg>
);

export const PhoneIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 4h3l2 4-2 1.5a10 10 0 0 0 4.5 4.5L14 12l4 2v3a2 2 0 0 1-2.2 2A13 13 0 0 1 4 6.2A2 2 0 0 1 5 4Z" strokeLinejoin="round" />
  </svg>
);

export const MailIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

export const PinIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 21s6.5-6.2 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 14.8 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="10.2" r="2.4" />
  </svg>
);

export const ArrowUpIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="m5 13 4 4 10-11" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TrashIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EditIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 19h3l9.5-9.5-3-3L5 16v3Z" strokeLinejoin="round" />
    <path d="m15.5 4.5 3 3" strokeLinecap="round" />
  </svg>
);

export const PlusIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

export const EyeIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);

export const MotifIcon = ({ className = "h-4 w-8" }: IconProps) => (
  <svg className={className} viewBox="0 0 64 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <path d="M0 8h20M44 8h20" strokeLinecap="round" />
    <path d="M32 2c3 3 5 4.5 5 6s-2 3-5 6c-3-3-5-4.5-5-6s2-3 5-6Z" />
    <circle cx="24" cy="8" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="40" cy="8" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);
