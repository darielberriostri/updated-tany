import { CheckCircle, TrendingUp, Eye, Wrench } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: CheckCircle,
    title: 'Guaranteed Results',
    description: "Top 3 ranking or your money back. We're so confident in our system that we guarantee your success.",
  },
  {
    icon: TrendingUp,
    title: 'Proven Track Record',
    description: 'Hundreds of local businesses have achieved top 3 rankings using our proven methodology.',
  },
  {
    icon: Eye,
    title: 'Complete Transparency',
    description: 'Weekly reports showing your exact ranking position and progress toward the top 3.',
  },
  {
    icon: Wrench,
    title: 'Done-For-You Service',
    description: 'We handle everything from setup to ongoing optimization. No work required on your end.',
  },
];

export function WhyChooseUs() {
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
    <section ref={sectionRef} className="py-24 bg-zinc-900 relative">
      <div className="container mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
          Why Choose Us
        </h2>

        <div
          className={`bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-xl p-8 mb-12 relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-l-xl"></div>
          <h3 className="text-2xl font-bold text-red-500 mb-4">Every Day You Wait, Your Competitors Get Ahead</h3>
          <p className="text-gray-300 leading-relaxed">
            While you're considering your options, your competitors are capturing the customers that should be yours.
            Local search rankings change daily, and the businesses that act fast secure the top positions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`flex gap-4 transition-all duration-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mt-1">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
