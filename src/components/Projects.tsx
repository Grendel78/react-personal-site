import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import onDemandWeb from '@/assets/images/onDemandWeb.png';
import urImage from '@/assets/images/ur.png';
import urnowImage from '@/assets/images/urnow.png';
import joedyfeltsImage from '@/assets/images/joedyfeltscom.png';

const Projects = () => {
  const projects = [
    {
      title: "OnDemand Web",
      description: "A video-based learning management system with integrated SME chat, quiz administration, progress syncing, and digital certification built with React and Node.js.",
      image: onDemandWeb,
      technologies: ["React", "Redux", "TypeScript", "Node.js", "GraphQL", "DynamoDB", "AWS Lambda", "AWS EC2", "CI/CD"],
      liveUrl: "https://www.sans.org/course-preview/",
      githubUrl: null
    },
    {
      title: "University of Richmond - Hermes Platform",
      description: "PHP and JavaScript-based web platform for the University of Richmond, featuring a modular CMS, responsive design, and integrated analytics. Powers over 150 subdomains and 10K+ individual pages.",
      image: urImage,
      technologies: ["PHP", "JavaScript", "Zurb Foundations", "eXist-db", "GTM", "AWS CloudFront", "Elasticsearch"],
      liveUrl: "https://www.richmond.edu",
      githubUrl: null
    },
    {
      title: "UR Now",
      description: "A campus news and digital storytelling platform for the University of Richmond, featuring a custom article management system with responsive layout control and a suite of content components.",
      image: urnowImage,
      technologies: ["PHP", "JavaScript", "Zurb Foundations", "eXist-db", "AWS CloudFront"],
      liveUrl: "https://urnow.richmond.edu",
      githubUrl: null
    },
    {
      title: "www.joedyfelts.com",
      description: "My homepage and portfolio site, showcasing my work, skills, and personal projects. Built with React and Tailwind CSS for a modern, responsive design.",
      image: joedyfeltsImage,
      technologies: ["React", "Tailwind", "Typescript", "Vite"],
      liveUrl: null, 
      githubUrl: "https://github.com/Grendel78/react-personal-site"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text-subtle">Featured Projects</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for software engineering and web development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="frosted-glass overflow-hidden flex flex-col rounded-xl">
              <div className="relative w-full overflow-hidden group">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain bg-black transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(217,33%,6%)]/80 to-transparent pointer-events-none"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm flex-1">
                  {project.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-300 rounded-full border border-orange-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--energetic-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Button 
                          className="btn-energetic-coral w-full text-white font-semibold" 
                          size="sm"
                          tabIndex={-1}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Site
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--energetic-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Button 
                          variant="blue" 
                          className="w-full font-semibold" 
                          size="sm"
                          tabIndex={-1}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          View Code
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
