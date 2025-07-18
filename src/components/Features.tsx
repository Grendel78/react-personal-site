
import { Code, Palette, Zap, Users, Globe, Heart } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code following best practices and modern standards.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Crafting beautiful, intuitive interfaces that provide exceptional user experiences across all devices.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimizing applications for speed and performance to ensure the best possible user experience.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "User-Centered",
      description: "Putting users first in every design decision, creating solutions that truly meet their needs.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Globe,
      title: "Modern Tech",
      description: "Leveraging the latest technologies and frameworks to build cutting-edge web applications.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Heart,
      title: "Passion Driven",
      description: "Bringing enthusiasm and dedication to every project, ensuring quality in every detail.",
      gradient: "from-pink-500 to-red-500"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What I Bring to the Table
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Combining technical expertise with creative vision to deliver outstanding results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
