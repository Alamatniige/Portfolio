import { Facebook, Linkedin, Github } from 'lucide-react';

// Social links configuration
const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/alamatniige',
    icon: Facebook,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ruiz-miguel-sapio-0b4a63270/',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Alamatniige',
    icon: Github,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-10">
          {/* Tagline */}
          <p className="text-center text-body text-muted-foreground max-w-2xl">
            Creating beautiful and functional web experiences with modern technologies
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 md:gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="!text-foreground hover:text-primary transition-colors hover:scale-110 active:scale-95 duration-200 inline-flex items-center justify-center min-w-[44px] min-h-[44px] touch-manipulation"
                >
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center text-body-sm text-muted-foreground">
            <p>© {currentYear} Sapio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}


