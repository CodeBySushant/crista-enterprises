import { Link } from 'react-router-dom';
import logo from '../../assets/brand/crista-logo.png';
import logoLight from '../../assets/brand/crista-logo-light.png';
import cn from '../../utils/cn';

/** Brand lock-up from the supplied Crista logo. `tone="light"` for dark backgrounds. */
export default function Logo({ tone = 'dark', className, linked = true, onClick }) {
  const img = (
    <img
      src={tone === 'light' ? logoLight : logo}
      alt="Crista Enterprises"
      width="640"
      height="160"
      className={cn('h-9 w-auto select-none sm:h-10', className)}
      draggable="false"
    />
  );
  if (!linked) return img;
  return (
    <Link to="/" aria-label="Crista Enterprises — home" className="inline-flex shrink-0 items-center" onClick={onClick}>
      {img}
    </Link>
  );
}
