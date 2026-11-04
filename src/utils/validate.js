const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-\s\d]{7,20}$/;

/**
 * Validates an enquiry payload. `rules` lists which fields are required.
 * Returns an object of { field: message } — empty when valid.
 */
export function validateEnquiry(values, required = []) {
  const errors = {};
  const req = (k, msg) => {
    if (required.includes(k) && !String(values[k] ?? '').trim()) errors[k] = msg;
  };
  req('name', 'Please enter your name.');
  req('company', 'Please enter your company or organisation.');
  req('email', 'Please enter your business email.');
  req('phone', 'Please enter a contact number.');
  req('enquiryType', 'Please choose an enquiry type.');
  req('product', 'Please tell us which product you are interested in.');
  req('quantity', 'Please select an approximate quantity.');
  req('message', 'Please add a short description of your requirement.');

  if (values.email && !EMAIL.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone && !PHONE.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (values.message && values.message.length > 2000) errors.message = 'Please keep your message under 2000 characters.';
  return errors;
}

/** Simulated submit — swap for a real API call later. */
export function submitEnquiry(payload) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, reference: `CE-${Date.now().toString(36).toUpperCase().slice(-6)}`, payload }), 900);
  });
}
