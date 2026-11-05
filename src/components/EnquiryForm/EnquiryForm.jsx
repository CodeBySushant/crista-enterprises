import { useId, useMemo, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { lightingProducts, gymProducts } from '../../data/products';
import { ENQUIRY_TYPES, QUANTITY_RANGES } from '../../data/site';
import { validateEnquiry, submitEnquiry } from '../../utils/validate';
import Button from '../Buttons/Button';
import cn from '../../utils/cn';

const GENERAL = [
  { value: 'general-lighting', label: 'Lighting — general / multiple products' },
  { value: 'general-gym', label: 'Gym equipment — general / multiple products' },
  { value: 'general-both', label: 'Both divisions' },
];

export const productLabel = (value) =>
  [...lightingProducts, ...gymProducts].find((p) => p.slug === value)?.name ?? GENERAL.find((g) => g.value === value)?.label ?? value;

function Field({ id, label, error, required, children, className, hint }) {
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

/**
 * Shared enquiry / quote form.
 * variant "quote"   → name, company, email, phone, product, quantity, requirements
 * variant "contact" → + enquiry type, labels tuned for general enquiries
 */
export default function EnquiryForm({ variant = 'quote', initial = {}, onDone, compact = false }) {
  const uid = useId();
  const id = (k) => `${uid}-${k}`;
  const isContact = variant === 'contact';
  const required = isContact
    ? ['enquiryType', 'name', 'company', 'email', 'phone', 'message']
    : ['name', 'company', 'email', 'phone', 'product', 'quantity'];

  const [values, setValues] = useState({
    enquiryType: initial.enquiryType ?? (isContact ? '' : 'quote'),
    product: initial.product ?? '',
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [result, setResult] = useState(null);

  const productOptions = useMemo(
    () => [
      { group: 'General', items: GENERAL },
      { group: 'Crista Lights', items: lightingProducts.map((p) => ({ value: p.slug, label: p.name })) },
      { group: 'Crista Gym Equipment', items: gymProducts.map((p) => ({ value: p.slug, label: p.name })) },
    ],
    [],
  );

  const set = (k) => (e) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (touched[k]) setErrors(validateEnquiry({ ...values, [k]: v }, required));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateEnquiry(values, required));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validateEnquiry(values, required);
    setErrors(errs);
    setTouched(Object.fromEntries(required.map((k) => [k, true])));
    if (Object.keys(errs).length) {
      const first = e.currentTarget.querySelector(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus('submitting');
    const res = await submitEnquiry(values);
    setResult(res);
    setStatus('success');
  };

  const fieldProps = (k) => ({
    id: id(k),
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': errors[k] && touched[k] ? 'true' : undefined,
    'aria-describedby': errors[k] && touched[k] ? `${id(k)}-err` : undefined,
    className: 'field',
  });
  const err = (k) => (touched[k] ? errors[k] : undefined);

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start py-4" role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
          <Check className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium">Thank you, {values.name.split(' ')[0]}.</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          Your {isContact ? 'enquiry' : 'quote request'} has been recorded. Our team will review your requirement and get back to you at{' '}
          <span className="text-ink">{values.email}</span>.
        </p>
        <dl className="mt-6 grid w-full grid-cols-2 gap-px overflow-hidden border border-line bg-line text-[13px]">
          <div className="bg-white p-4"><dt className="text-muted">Reference</dt><dd className="mt-1 font-medium tabular text-ink">{result?.reference}</dd></div>
          <div className="bg-white p-4"><dt className="text-muted">Interest</dt><dd className="mt-1 font-medium text-ink">{values.product ? productLabel(values.product) : ENQUIRY_TYPES.find((t) => t.value === values.enquiryType)?.label}</dd></div>
        </dl>
        <p className="mt-4 text-[12px] text-muted">Demo build — no data has been sent. Connect this form to your backend or CRM to receive enquiries.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {onDone && <Button onClick={onDone}>Done</Button>}
          <Button variant="outline" onClick={() => { setStatus('idle'); setValues((v) => ({ ...v, message: '', quantity: '' })); setTouched({}); }}>
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  const cols = compact ? 'sm:grid-cols-2' : 'md:grid-cols-2';

  return (
    <form noValidate onSubmit={onSubmit} className={cn('grid grid-cols-1 gap-x-5 gap-y-5', cols)}>
      {isContact && (
        <Field id={id('enquiryType')} label="Enquiry type" required error={err('enquiryType')}>
          <select {...fieldProps('enquiryType')}>
            <option value="">Select an enquiry type</option>
            {ENQUIRY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </Field>
      )}
      <Field id={id('product')} label="Product of interest" required={required.includes('product')} error={err('product')} className={isContact ? '' : 'sm:col-span-2 md:col-span-2'}>
        <select {...fieldProps('product')}>
          <option value="">Select a product or range</option>
          {productOptions.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.items.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </optgroup>
          ))}
        </select>
      </Field>
      <Field id={id('name')} label="Full name" required error={err('name')}>
        <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Your name" />
      </Field>
      <Field id={id('company')} label="Company / organisation" required error={err('company')}>
        <input {...fieldProps('company')} type="text" autoComplete="organization" placeholder="Company name" />
      </Field>
      <Field id={id('email')} label="Business email" required error={err('email')}>
        <input {...fieldProps('email')} type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" />
      </Field>
      <Field id={id('phone')} label="Phone" required error={err('phone')}>
        <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" />
      </Field>
      <Field id={id('quantity')} label="Required quantity" required={required.includes('quantity')} error={err('quantity')} className={isContact ? 'sm:col-span-2 md:col-span-2' : 'sm:col-span-2 md:col-span-2'}>
        <div role="radiogroup" aria-label="Required quantity" className="flex flex-wrap gap-2">
          {QUANTITY_RANGES.map((q) => {
            const active = values.quantity === q;
            return (
              <button
                key={q}
                type="button"
                role="radio"
                aria-checked={active}
                name="quantity"
                onClick={() => { setValues((s) => ({ ...s, quantity: q })); setErrors(validateEnquiry({ ...values, quantity: q }, required)); }}
                className={cn(
                  'h-10 rounded-sm border px-3.5 text-[13px] transition-colors',
                  active ? 'border-ink bg-ink text-white' : 'border-line bg-white text-charcoal hover:border-ink/40',
                )}
              >
                {q}
              </button>
            );
          })}
        </div>
      </Field>
      <Field id={id('message')} label={isContact ? 'Message' : 'Additional requirements'} required={required.includes('message')} error={err('message')} className="sm:col-span-2 md:col-span-2" hint="Specifications, site details, timelines or delivery location help us respond accurately.">
        <textarea {...fieldProps('message')} rows={compact ? 3 : 5} placeholder={isContact ? 'Tell us what your business needs…' : gymProducts.some((g) => g.slug === values.product) || values.product === 'general-gym' ? 'e.g. facility type, floor space, upholstery colour, delivery timeline' : 'e.g. colour temperature, pole height, project location, delivery timeline'} />
      </Field>
      <div className="flex flex-col-reverse items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
        <p className="text-[12px] leading-relaxed text-muted">By submitting, you agree to be contacted about this enquiry.</p>
        <Button type="submit" size="lg" disabled={status === 'submitting'} icon={status === 'submitting' ? undefined : ArrowRight} className="w-full sm:w-auto">
          {status === 'submitting' ? (<span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Sending…</span>) : isContact ? 'Send enquiry' : 'Submit quote request'}
        </Button>
      </div>
    </form>
  );
}
