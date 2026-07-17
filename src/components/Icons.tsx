import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function StarIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}><path d="m12 2.5 2.5 6.2 6.7.5-5.1 4.4 1.6 6.5L12 16.6 6.3 20l1.6-6.4-5.1-4.4 6.7-.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}
export function ArrowIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
export function BookIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}><path d="M4 5.5c3.5-.9 6.2-.2 8 1.4v12c-1.8-1.6-4.5-2.3-8-1.4v-12Zm16 0c-3.5-.9-6.2-.2-8 1.4v12c1.8-1.6 4.5-2.3 8-1.4v-12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}
export function MailIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}><path d="M3.5 6.5h17v11h-17v-11Z" stroke="currentColor" strokeWidth="1.5"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}
export function ExternalIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}><path d="M13 5h6v6M19 5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 13v5H6V7h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
export function MenuIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
}
