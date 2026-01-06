import { useState, FormEvent, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { LeadSubmission } from '../types';

export function ContactForm() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<Omit<LeadSubmission, 'id' | 'created_at' | 'updated_at'>>({
    full_name: '',
    business_email: '',
    phone_number: '',
    website_url: '',
    company_name: '',
    timeline: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.from('lead_submissions').insert([
        {
          full_name: formData.full_name,
          business_email: formData.business_email,
          phone_number: formData.phone_number,
          website_url: formData.website_url || null,
          company_name: formData.company_name,
          timeline: formData.timeline,
          message: formData.message || null,
        },
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        full_name: '',
        business_email: '',
        phone_number: '',
        website_url: '',
        company_name: '',
        timeline: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-gradient-to-br from-black to-zinc-900">
      <div className="container mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
          Book a Free Strategy Call
        </h2>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Ready to dominate your local market? Let's discuss how we can get your business to the top 3 on Google Maps.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`max-w-2xl mx-auto bg-gradient-to-br from-zinc-800 to-zinc-900 p-10 rounded-2xl border border-zinc-700 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="full_name" className="block text-gray-300 font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="business_email" className="block text-gray-300 font-medium mb-2">
                Business Email *
              </label>
              <input
                type="email"
                id="business_email"
                name="business_email"
                value={formData.business_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone_number" className="block text-gray-300 font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="website_url" className="block text-gray-300 font-medium mb-2">
                Website URL
              </label>
              <input
                type="url"
                id="website_url"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="company_name" className="block text-gray-300 font-medium mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="timeline" className="block text-gray-300 font-medium mb-2">
                Timeline *
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="">Select Timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 Month</option>
                <option value="3-months">Within 3 Months</option>
                <option value="6-months">Within 6 Months</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your business and goals..."
              className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
              Thank you! We will contact you within 24 hours to schedule your free strategy call.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/40 shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Free Strategy Call'}
          </button>
        </form>
      </div>
    </section>
  );
}
