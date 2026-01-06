import { Smartphone, Target, Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: Smartphone,
    title: 'Meta Ads',
    description: 'Strategic Meta advertising campaigns designed to drive qualified leads directly to your local business.',
  },
  {
    icon: Target,
    title: 'Google Ads',
    description: 'Targeted Google advertising that puts your business in front of customers actively searching for your services.',
  },
  {
    icon: Calendar,
    title: '30-Day Roadmap',
    description: 'Comprehensive strategy and implementation plan to get your business ranking in the top 3 within 30 days.',
  },
];

export function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-900">
      <div className="container mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-xl border border-zinc-700 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
