import { CheckCircle } from 'lucide-react';

export function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-black to-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-50"></div>

      <div className="container mx-auto px-5 z-10">
        <div className="max-w-4xl opacity-0 translate-y-8 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 rounded-full mb-8 shadow-lg shadow-emerald-500/30">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Money Back Guarantee</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent leading-tight">
            We Help Local Businesses Like You Generate More Leads and Rank Top 3 on Google Guaranteed
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            If you do not rank in the top 3, you get your money back. Professional lead generation with proven results for local businesses.
          </p>

          <button
            onClick={scrollToContact}
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40 shadow-lg shadow-blue-500/30"
          >
            Book Your Free Strategy Call
          </button>
        </div>
      </div>
    </section>
  );
}
