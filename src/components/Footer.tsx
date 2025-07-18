
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--section-bg-dark))] border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            © {currentYear} Joedy Felts. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Built with <span className="gradient-text-purple font-medium">React</span>, <span className="gradient-text-purple font-medium">TypeScript</span>, and <span className="gradient-text-purple font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
