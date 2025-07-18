import { Code2, Palette, Database, Globe } from 'lucide-react';
import { highlightTechTerms } from '../utils/highlightTechTerms';

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "React, Redux, TypeScript, HTML, CSS, Sass, Tailwind, Zurb Foundations"
    },
    {
      icon: Database,
      title: "Backend Development", 
      description: "Node.js, PHP, GraphQL, REST, MySQL, MongoDB"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Accessibility, Storybook, Figma, Adobe Creative Suite, Prototyping"
    },
    {
      icon: Globe,
      title: "DevOps & Cloud",
      description: "AWS (Lambda, S3, CloudFront, EC2), Docker, CI/CD pipelines"
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text-subtle">About Me</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {highlightTechTerms("I'm a full-stack developer with over 10 years of experience building modern web applications. I specialize in React, TypeScript, Node.js, and GraphQL, with a strong focus on performance, accessibility, and clean, maintainable code. I've delivered scalable solutions across education, cybersecurity, and higher ed, using tools like AWS Lambda, S3, and CloudFront, along with CI/CD pipelines, Docker, and Jest. Whether it's a CMS, learning platform, or content-driven site, I care deeply about creating thoughtful, user-centered experiences.")}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Outside of work, you'll find me exploring new tech, hacking on side projects, or getting lost in a good indie game. I'm also a proud dad, part-time adventurer, and always up for a creative side project or a hike through the woods.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="text-center p-8 frosted-glass rounded-xl spotlight-hover glass-card-3d">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-6 border border-white/10 relative z-10">
                <skill.icon className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 relative z-10">
                {skill.title}
              </h3>
              <p className="text-gray-400 text-sm relative z-10">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;