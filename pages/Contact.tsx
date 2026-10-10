
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { Magnetic, Tilt } from '../components/motion';
import { IMAGES } from '../constants';
import { useI18n } from '../i18n';

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block space-y-2">
    <span className="text-sm font-medium text-ink-soft">{label}</span>
    {children}
  </label>
);

const Contact: React.FC = () => {
  const { t } = useI18n();
  const p = t.contactPage;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    pickup: '',
    delivery: '',
    freight: '',
    date: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Opens a pre-filled Gmail draft to the office with the quote details.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = 'Freight Quote Request';
    const f = p.fields;
    const body = [
      `${f.company}: ${formData.company}`,
      `${f.contact}: ${formData.contact}`,
      `${f.email}: ${formData.email}`,
      `${f.phone}: ${formData.phone}`,
      `${f.pickup}: ${formData.pickup}`,
      `${f.delivery}: ${formData.delivery}`,
      `${f.freight}: ${formData.freight}`,
      `${f.date}: ${formData.date}`,
      '',
      `${f.notes}:`,
      formData.notes,
    ].join('\n');

    window.location.href =
      `https://mail.google.com/mail/?view=cm&fs=1&to=S.chritalia@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  const cards = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: p.hq,
      body: <>WARNAKULASURIYA FERNANDO SUJITH NIROSHAN E C.<br />VIA DELLA PACE 13<br />37124, Verona (VR), {t.footer.country}</>,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: p.line,
      body: <a href="tel:+393773331089" className="hover:text-navy transition-colors">{p.cell}: +39 377 333 1089</a>,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: p.email,
      body: (
        <>
          PEC: <a href="mailto:chritaliasas@pec.it" className="hover:text-navy transition-colors">chritaliasas@pec.it</a><br />
          Email: <a href="mailto:info@chritalia.it" className="hover:text-navy transition-colors">info@chritalia.it</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        subtitle={p.subtitle}
        image={IMAGES.warehouseSunset}
        imageAlt={p.imageAlt}
        caption={p.caption}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {cards.map((card, i) => (
              <Reveal key={i} delay={i * 100}>
                <Tilt className="group rounded-2xl p-7 glass" max={4}>
                  <div className="w-11 h-11 rounded-xl bg-navy text-accent flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy mb-2">{card.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{card.body}</p>
                </Tilt>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal delay={150} className="lg:col-span-2">
            <div className="rounded-3xl p-7 md:p-12 glass-strong">
              {submitted ? (
                <div className="text-center py-20 fade-up">
                  <div className="w-20 h-20 rounded-full bg-navy text-accent flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="font-display font-bold text-3xl text-navy tracking-tight mb-4">{p.successTitle}</h2>
                  <p className="text-lg text-ink-soft mb-10 max-w-md mx-auto">{p.successText}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-4 bg-navy text-white rounded-full font-semibold hover:bg-navy-3 transition-colors"
                  >
                    {p.another}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-navy tracking-tight mb-2">{p.formTitle}</h2>
                  <p className="text-ink-soft mb-4">{p.formLead}</p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label={p.fields.company}>
                      <input name="company" value={formData.company} onChange={handleChange} required type="text" className="field" placeholder={p.placeholders.company} />
                    </Field>
                    <Field label={p.fields.contact}>
                      <input name="contact" value={formData.contact} onChange={handleChange} required type="text" className="field" placeholder="Mario Rossi" />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label={p.fields.email}>
                      <input name="email" value={formData.email} onChange={handleChange} required type="email" className="field" placeholder="mario@company.com" />
                    </Field>
                    <Field label={p.fields.phone}>
                      <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" className="field" placeholder="+39 000 000 0000" />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label={p.fields.pickup}>
                      <input name="pickup" value={formData.pickup} onChange={handleChange} required type="text" className="field" placeholder={p.placeholders.city} />
                    </Field>
                    <Field label={p.fields.delivery}>
                      <input name="delivery" value={formData.delivery} onChange={handleChange} required type="text" className="field" placeholder={p.placeholders.city} />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label={p.fields.freight}>
                      <input name="freight" value={formData.freight} onChange={handleChange} required type="text" className="field" placeholder={p.placeholders.freight} />
                    </Field>
                    <Field label={p.fields.date}>
                      <input name="date" value={formData.date} onChange={handleChange} required type="date" className="field" />
                    </Field>
                  </div>

                  <Field label={p.fields.notes}>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} className="field h-32 resize-none" placeholder={p.placeholders.notes} />
                  </Field>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
                    <p className="text-sm text-ink-faint">{t.common.respond}</p>
                    <Magnetic strength={0.25}>
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 bg-navy text-white pl-8 pr-2 py-2 rounded-full font-semibold hover:bg-navy-3 transition-colors"
                      >
                        {p.submit}
                        <span className="w-11 h-11 rounded-full bg-accent text-navy flex items-center justify-center">
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
