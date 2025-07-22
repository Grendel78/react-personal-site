import { Calendar, MapPin } from 'lucide-react';
import { Spotlight } from './Spotlight';
import React, { useRef, useState } from 'react';
import { highlightTechTerms } from '../utils/highlightTechTerms';

const Experience = () => {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "SANS Institute",
      location: "Remote",
      period: "Mar 2022 - May 2025",
      description: "Co-developed and launched OnDemand Web, a video-based learning management system that boosted application performance by 40% over its predecessor. Co-developed the course and user administration tool, which enabled course creators to efficiently build and manage content and manage student enrollment in SANS courses.",
      achievements: [
        "Engineered using React.js and Node.js, integrating GraphQL, AWS Lambda, S3 for course content, and Learnosity for quiz functionalities.",
        "Authored the Zendesk-powered SME chat component, enabling real-time learner engagement, file sharing, and service hour updates.",
        "Implemented CI/CD methodologies and Jest for testing, alongside building a complementary React.js administration tool that leveraged REST microservices for video transcription and content processing.",
        "Utilized Redux for complex state management in the admin tool to support progressive course modifications and Storybook for rapid UI prototyping."
      ]
    },
    {
      title: "Director of User Experience",
      company: "University of Richmond",
      location: "Richmond, VA", 
      period: "Aug 2016 - Mar 2022",
      description: "Led the strategic vision and technical execution for the University of Richmond's public web presence, overseeing a team of web developers and a portfolio of 150+ subdomains.",
      achievements: [
        "Spearheaded a major codebase rewrite and visual overhaul, improving site performance by over 50% and web accessibility compliance by over 75%.",
        "Architected a new responsive, component-based web ecosystem using PHP for the backend and a custom JavaScript framework with Zurb Foundation on the frontend, deeply integrated with the CMS.",
        "Optimized site delivery by utilizing Amazon CloudFront for static asset distribution and implemented AWS Elasticsearch for advanced search capabilities.",
        "Developed a flexible, modular CMS templating system, empowering campus web managers to build high-quality sites from pre-built components and enabling custom Google Tag Manager integrations.",
        "Reimagined and redeveloped an advanced article system, allowing authors to create rich, responsive web articles with embedded multimedia (slideshows, videos), custom backgrounds, and social media integration.",
        "2021 CASE Circle of Excellence Award - Gold for the Hermes Web Redesign."
      ]
    },
    {
      title: "UI Manager/Senior Web Developer",
      company: "University of Richmond",
      location: "Richmond, VA",
      period: "Mar 2010 - Aug 2016", 
      description: "Managed a small team of web developers responsible for the maintenance and operation of the University of Richmond's public web infrastructure.",
      achievements: [
        "Designed and implemented the frontend system (custom JavaScript/HTML framework) and core PHP backend, deeply integrated with the CMS, powering the university's web presence.",
        "Developed an Angular (1.0, later redeveloped to 2.0) web application to enhance prospective student campus tours, providing interactive maps, degree offerings, academic profiles, and student experiences.",
        "Created a custom PHP-based marketing email generator, leveraging in-house article content for dynamic, on-the-fly email generation.",
        "Built a custom event management system to streamline university event coordination and promotion.",
        "Led the migration of university web assets from local storage to cloud distribution, optimizing performance and scalability."
      ]
    },
    {
      title: "Freelance Web Developer",
      company: "joedyfelts.com",
      location: "Remote",
      period: "Jan 2006 - Present", 
      description: "Developed custom websites end-to-end for a diverse range of clients, specializing in WordPress for comprehensive site creation, custom theme development, and bespoke widget authoring.",
      achievements: [
        "Crafted responsive HTML templates, CSS, JavaScript, and robust PHP backends to meet unique client requirements and design specifications.",
        "Delivered SEO-optimized solutions to enhance online visibility, driving organic traffic and improving search engine rankings.",
        "Integrated Google Tag Manager for precise performance tracking, analytics, and data-driven decision-making.",
        "Provided website maintenance and ongoing support, including security updates, content revisions, and troubleshooting to ensure optimal site performance.",
        "Offered consultation services to clients, guiding them through the web development process, technology choices, and digital strategy.",
        "Assisted with domain registration and web hosting setup, ensuring seamless deployment and reliable uptime for client websites."
      ]
    }
  ];

  // Helper for spotlight logic per card
  const ExperienceCard = ({ experience }: { experience: typeof experiences[0] }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Update rect on mount and window resize
    React.useEffect(() => {
      const updateRect = () => {
        if (cardRef.current) {
          setRect(cardRef.current.getBoundingClientRect());
        }
      };

      updateRect();
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', updateRect);
      
      return () => {
        window.removeEventListener('resize', updateRect);
        window.removeEventListener('scroll', updateRect);
      };
    }, []);

    // Clear mouse position after fade-out completes
    React.useEffect(() => {
      if (!isHovered) {
        const timer = setTimeout(() => {
          setMouse(null);
        }, 300); // Match the fade-out duration
        return () => clearTimeout(timer);
      }
    }, [isHovered]);

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (cardRef.current) {
        setRect(cardRef.current.getBoundingClientRect());
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isHovered) return;
      
      // Always get fresh rect on mouse move for accuracy
      const currentRect = cardRef.current?.getBoundingClientRect();
      if (currentRect) {
        setMouse({
          x: e.clientX - currentRect.left,
          y: e.clientY - currentRect.top,
        });
        setRect(currentRect);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Don't reset mouse position immediately - let it fade out from current position
    };

    return (
      <div
        ref={cardRef}
        className="frosted-glass rounded-xl p-8 relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {rect && (
          <Spotlight
            x={mouse?.x || 0}
            y={mouse?.y || 0}
            width={rect.width}
            height={rect.height}
            active={isHovered && mouse !== null}
          />
        )}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">
                {experience.title}
              </h3>
              <h4 className="text-lg gradient-text-orange font-semibold mb-2">
                <span className="gradient-text-coral">{experience.company}</span>
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {highlightTechTerms(experience.description)}
          </p>
          {experience.achievements.length > 0 && (
            <ul className="space-y-2 list-disc pl-6 energetic-bullet" role="list">
              {experience.achievements.map((achievement, achievementIndex) => (
                <li key={achievementIndex} className="text-gray-300">
                  {highlightTechTerms(achievement)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="experience" className="py-20 experience-spotlight">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text-subtle">Experience</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            My professional journey building innovative software solutions and leading web development teams.
          </p>
        </div>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
