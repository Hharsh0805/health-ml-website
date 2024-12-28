import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HealthInsights from './components/HealthInsights';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HealthInsights />
      </main>
      <Footer />
    </div>
  );
}
