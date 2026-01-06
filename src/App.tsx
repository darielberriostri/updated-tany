import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { HowWeWork } from './components/HowWeWork';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactForm } from './components/ContactForm';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Services />
      <HowWeWork />
      <WhyChooseUs />
      <ContactForm />
    </div>
  );
}

export default App;
