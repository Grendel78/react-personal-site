import React from 'react';

const techTerms = [
  'React.js', 'React', 'Redux', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Tailwind',
  'Node.js', 'Node', 'PHP', 'GraphQL', 'REST', 'MySQL', 'MongoDB',
  'AWS', 'AWS Lambda', 'Lambda', 'S3', 'CloudFront', 'EC2', 'Docker', 'CI/CD',
  'Zurb Foundation', 'Zurb Foundations', 'Learnosity', 'Jest', 'Storybook',
  'Angular', 'Elasticsearch', 'AWS Elasticsearch', 'Google Tag Manager',
  'Zendesk', 'Amazon CloudFront', 'WordPress', 'SEO', 'Figma', 'Adobe Creative Suite'
];

export const highlightTechTerms = (text: string): React.ReactNode => {
  if (!text) return text;
  
  // Create a regex pattern that matches any of the tech terms
  const pattern = new RegExp(`\\b(${techTerms.join('|')})\\b`, 'gi');
  
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    const isMatch = techTerms.some(term => 
      term.toLowerCase() === part.toLowerCase()
    );
    
    if (isMatch) {
      return (
        <span key={index} className="text-orange-300">
          {part}
        </span>
      );
    }
    
    return part;
  });
};