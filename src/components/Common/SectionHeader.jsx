import cn from '../../utils/cn';
import Reveal from './Reveal';

/** Editorial section header: index number + eyebrow on a rule, heading, optional aside. */
export default function SectionHeader({ index, eyebrow, title, lede, aside, tone = 'dark', className, size = 'lg' }) {
  const light = tone === 'light';
  return (
    <Reveal className={cn('grid gap-8 lg:grid-cols-12 lg:gap-10', className)}>
      <div className="lg:col-span-12">
        <div className={cn('flex items-center gap-4 border-t pt-4', light ? 'border-white/15' : 'border-line')}>
          {index && <span className={cn('tabular text-eyebrow font-medium', light ? 'text-accent' : 'text-accent-ink')}>{index}</span>}
          {eyebrow && <span className={cn('eyebrow', light && 'text-white/55')}>{eyebrow}</span>}
        </div>
      </div>
      <div className={cn(aside ? 'lg:col-span-7' : 'lg:col-span-9')}>
        <h2 className={cn(size === 'lg' ? 'display-lg' : 'display-md', light && 'text-white')}>{title}</h2>
        {lede && <p className={cn('lede mt-5 max-w-2xl', light && 'text-white/60')}>{lede}</p>}
      </div>
      {aside && <div className="flex items-end lg:col-span-5 lg:justify-end">{aside}</div>}
    </Reveal>
  );
}
