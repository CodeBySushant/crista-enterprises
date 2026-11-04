import usePageMeta from '../hooks/usePageMeta';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Button from '../components/Buttons/Button';

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'This page will contain Crista Enterprises’ privacy policy, describing how enquiry and contact information submitted through this website is collected, used and stored.',
  },
  terms: {
    title: 'Terms & Conditions',
    intro: 'This page will contain the terms and conditions governing the use of this website and the supply of products by Crista Enterprises.',
  },
};

export default function Legal({ kind }) {
  const c = CONTENT[kind];
  usePageMeta(c.title);
  return (
    <section className="wrap max-w-3xl py-14 lg:py-20">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: c.title }]} />
      <h1 className="display-lg mt-10">{c.title}</h1>
      <p className="mt-6 text-[17px] leading-relaxed text-charcoal/80">{c.intro}</p>
      <div className="mt-8 border-l-2 border-accent bg-white p-6 text-[14px] leading-relaxed text-muted">
        The final legal text has not yet been provided. It should be drafted or reviewed by the company&rsquo;s legal advisor before the website goes live.
      </div>
      <Button to="/contact" variant="outline" className="mt-10">Questions? Contact us</Button>
    </section>
  );
}
