import { Link } from 'react-router-dom';
import cn from '../../utils/cn';

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium transition-[background-color,color,border-color,box-shadow] duration-200 ease-brand disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-ink text-white hover:bg-[#2a2d31]',
  accent: 'bg-accent text-ink hover:bg-[#45d27c]',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white',
  light: 'bg-white text-ink hover:bg-paper',
  'outline-light': 'border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink',
  link: 'text-ink hover:text-accent-ink px-0 py-0 h-auto',
};

const sizes = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-7 text-[15px]',
};

/**
 * Polymorphic button: renders <Link> for `to`, <a> for `href`, otherwise <button>.
 * Pass `arrow` for a trailing animated arrow icon element.
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className, children, icon: Icon, iconLeft: IconLeft, type = 'button', ...rest }) {
  const cls = cn(base, variants[variant], variant !== 'link' && sizes[size], 'rounded-sm', className);
  const content = (
    <>
      {IconLeft && <IconLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && (
        <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 ease-brand group-hover/btn:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
      )}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  return <button type={type} className={cls} {...rest}>{content}</button>;
}
