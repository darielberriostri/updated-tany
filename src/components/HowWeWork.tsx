import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: 1,
    title: '90-Day Roadmap',
    description:
      'Clear visual timeline showing progress from Month 1 to Month 3. We map out every step needed to get your business to the top 3 rankings with measurable milestones.',
  },
  {
    number: 2,
    title: 'We Handle Everything',
    description:
      'Emphasize done-for-you setup, optimization, and management. Our team takes care of all technical aspects, campaign management, and ongoing optimization so you can focus on running your business.',
  },
  {
    number: 3,
    title: 'Track Your Climb',
    description:
      'Weekly ranking updates showing exact position and how close your business is to Top 3. Complete transparency with detailed reports on your progress and performance metrics.',
  },
];

export function HowWeWork() {
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
    <section ref={sectionRef} className="py-24 bg-black">
      <div className="container mx-auto px-5">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
          How We Work
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`bg-gradient-to-br from-zinc-800 to-zinc-900 p-10 rounded-2xl border border-zinc-700 relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{
                transitionDelay: `${index * 300}ms`,
              }}
            >
              <div className="absolute -top-4 left-10 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold text-white mt-6 mb-4">{step.title}</h3>

              {step.number === 1 && (
                <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full mb-6 relative">
                  <div className="absolute right-0 -top-1 w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                </div>
              )}

              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
