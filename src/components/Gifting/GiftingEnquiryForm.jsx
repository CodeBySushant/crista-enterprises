import { useId, useState } from 'react';
import { ArrowRight, Check, Loader2, X } from 'lucide-react';
import Button from '../Buttons/Button';
import { BUDGET_BANDS, OCCASIONS, RECIPIENT_RANGES, getHamper } from '../../data/gifting';
import { validateEnquiry, submitEnquiry } from '../../utils/validate';
import cn from '../../utils/cn';

const REQUIRED = ['name', 'company', 'email', 'phone', 'occasion', 'recipients', 'budget'];
const today = () => new Date().toISOString().slice(0, 10);

function validate(v) {
  const errors = validateEnquiry(v, ['name', 'company', 'email', 'phone']);
  if (!v.occasion) errors.occasion = 'Please choose an occasion.';
  if (!v.recipients) errors.recipients = 'Please select the approximate number of recipients.';
  if (!v.budget) errors.budget = 'Please select a budget per gift.';
  if (v.date && v.date < today()) errors.date = 'Please choose a date in the future.';
  if (v.message.length > 2000) errors.message = 'Please keep your message under 2000 characters.';
  return errors;
}

function Field({ id, label, required, error, hint, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-accent-ink" aria-hidden="true"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[12px] text-muted">{hint}</p>}
      {error && <p id={`${id}-err`} className="field-error" role="alert">{error}</p>}
    </div>
  );
}

function Choice({ name, options, value, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const val = typeof o === 'string' ? o : o.id;
        const text = typeof o === 'string' ? o : o.label;
        const active = value === val;
        return (
          <button key={val} type="button" role="radio" aria-checked={active} name={name} onClick={() => onChange(val)}
            className={cn('h-10 rounded-sm border px-3.5 text-[13px] transition-colors', active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-charcoal hover:border-ink/40')}>
            {text}
          </button>
        );
      })}
    </div>
  );
}

/** Gifting enquiry — includes the visitor's shortlisted hampers. */
export default function GiftingEnquiryForm({ shortlist, onRemove, onClearShortlist }) {
  const uid = useId();
  const id = (k) => `${uid}-${k}`;
  const blank = { name: '', company: '', email: '', phone: '', occasion: '', recipients: '', budget: '', date: '', delivery: 'single', branding: true, message: '' };
  const [v, setV] = useState(blank);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [ref, setRef] = useState('');
  const [sent, setSent] = useState(null);

  const update = (k, val) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (touched[k] || ['occasion', 'recipients', 'budget'].includes(k)) setErrors(validate(next));
  };
  const fp = (k) => ({
    id: id(k), name: k, value: v[k], className: 'field',
    onChange: (e) => update(k, e.target.value),
    onBlur: () => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(v)); },
    'aria-invalid': touched[k] && errors[k] ? 'true' : undefined,
    'aria-describedby': touched[k] && errors[k] ? `${id(k)}-err` : undefined,
  });
  const err = (k) => (touched[k] ? errors[k] : undefined);

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    setTouched(Object.fromEntries([...REQUIRED, 'date', 'message'].map((k) => [k, true])));
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    const res = await submitEnquiry({ type: 'corporate-gifting', ...v, hampers: shortlist });
    setRef(res.reference);
    setSent({ ...v, hampers: shortlist });
    setStatus('success');
    onClearShortlist();
  };

  if (status === 'success' && sent) {
    return (
      <div role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-ink"><Check className="h-6 w-6" strokeWidth={2} aria-hidden="true" /></span>
        <h3 className="mt-6 font-display text-2xl font-semibold">Thank you, {sent.name.split(' ')[0]}.</h3>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
          Your gifting enquiry has been recorded. Our team will prepare curated options for your {sent.occasion.toLowerCase()} requirement and reply at <span className="text-ink">{sent.email}</span>.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line text-[13px] sm:grid-cols-4">
          {[['Reference', ref], ['Occasion', sent.occasion], ['Recipients', sent.recipients], ['Budget / gift', BUDGET_BANDS.find((b) => b.id === sent.budget)?.label]].map(([k, val]) => (
            <div key={k} className="bg-white p-4"><dt className="text-muted">{k}</dt><dd className="mt-1 font-medium text-ink">{val}</dd></div>
          ))}
        </dl>
        {sent.hampers.length > 0 && (
          <p className="mt-4 text-[13px] text-muted">Shortlisted: {sent.hampers.map((x) => getHamper(x)?.name).filter(Boolean).join(', ')}</p>
        )}
        <p className="mt-4 text-[12px] text-muted">Demo build — no data has been sent. Connect this form to your backend or CRM to receive enquiries.</p>
        <Button variant="outline" className="mt-8" onClick={() => { setStatus('idle'); setV(blank); setTouched({}); setErrors({}); }}>Send another enquiry</Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
      {/* Shortlist */}
      <div className="md:col-span-2">
        <p className="field-label">Shortlisted hampers <span className="font-normal text-muted">(optional)</span></p>
        {shortlist.length ? (
          <ul className="flex flex-wrap gap-2">
            {shortlist.map((hid) => {
              const hp = getHamper(hid);
              if (!hp) return null;
              return (
                <li key={hid} className="inline-flex h-9 items-center gap-2 rounded-sm border border-ink/15 bg-white pl-3 pr-1.5 text-[13px] text-ink">
                  {hp.name}
                  <button type="button" onClick={() => onRemove(hid)} className="flex h-6 w-6 items-center justify-center hover:bg-mist" aria-label={`Remove ${hp.name}`}><X className="h-3.5 w-3.5" /></button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="rounded-sm border border-dashed border-line bg-white px-4 py-3 text-[13px] text-muted">
            No hampers added yet. Use <span className="text-ink">Add to enquiry</span> on any hamper above, or simply describe what you need below.
          </p>
        )}
      </div>

      <Field id={id('name')} label="Full name" required error={err('name')}><input {...fp('name')} autoComplete="name" placeholder="Your name" /></Field>
      <Field id={id('company')} label="Company / organisation" required error={err('company')}><input {...fp('company')} autoComplete="organization" placeholder="Company name" /></Field>
      <Field id={id('email')} label="Work email" required error={err('email')}><input {...fp('email')} type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" /></Field>
      <Field id={id('phone')} label="Phone" required error={err('phone')}><input {...fp('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" /></Field>

      <Field id={id('occasion')} label="Occasion" required error={err('occasion')}>
        <select {...fp('occasion')}>
          <option value="">Select an occasion</option>
          {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>
      <Field id={id('date')} label="Required delivery date" error={err('date')} hint="Helps us plan sourcing, branding and dispatch.">
        <input {...fp('date')} type="date" min={today()} />
      </Field>

      <Field id={id('recipients')} label="Number of recipients" required error={err('recipients')} className="md:col-span-2">
        <Choice name="recipients" label="Number of recipients" options={RECIPIENT_RANGES} value={v.recipients} onChange={(x) => update('recipients', x)} />
      </Field>
      <Field id={id('budget')} label="Budget per gift" required error={err('budget')} className="md:col-span-2">
        <Choice name="budget" label="Budget per gift" options={BUDGET_BANDS} value={v.budget} onChange={(x) => update('budget', x)} />
      </Field>

      <fieldset className="md:col-span-2">
        <legend className="field-label">Delivery</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {[['single', 'One location', 'Bulk delivery to a single office'], ['multiple', 'Multiple locations', 'Several offices or individual addresses']].map(([val, t, d]) => (
            <label key={val} className={cn('flex cursor-pointer gap-3 rounded-sm border bg-white p-4 transition-colors', v.delivery === val ? 'border-ink' : 'border-line hover:border-ink/40')}>
              <input type="radio" name="delivery" value={val} checked={v.delivery === val} onChange={() => update('delivery', val)} className="mt-1 accent-[#17191c]" />
              <span><span className="block text-[14px] font-medium text-ink">{t}</span><span className="block text-[13px] text-muted">{d}</span></span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3 md:col-span-2">
        <input type="checkbox" checked={v.branding} onChange={(e) => update('branding', e.target.checked)} className="mt-1 h-4 w-4 accent-[#17191c]" />
        <span className="text-[14px] text-charcoal">Add our company logo / branding to the hampers</span>
      </label>

      <Field id={id('message')} label="Additional details" error={err('message')} className="md:col-span-2" hint="Dietary preferences, items to include or avoid, card message, packaging ideas.">
        <textarea {...fp('message')} rows={4} placeholder="Tell us about your gifting plan…" />
      </Field>

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
        <p className="text-[12px] text-muted">By submitting, you agree to be contacted about this enquiry.</p>
        <Button type="submit" size="lg" disabled={status === 'submitting'} icon={status === 'submitting' ? undefined : ArrowRight} className="w-full sm:w-auto">
          {status === 'submitting' ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Sending…</span> : 'Send gifting enquiry'}
        </Button>
      </div>
    </form>
  );
}
