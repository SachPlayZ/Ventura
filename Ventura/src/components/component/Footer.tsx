import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from "lucide-react";

// Footer component definition using TypeScript
const Footer: React.FC = () => {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-primary mb-4">Ventur<span className="text-[#00d8ff]">â</span></h2>
            <p className="mb-4">Creating amazing experiences for our customers since 2024.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00d8ff]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors ">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors ">About</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors ">Services</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors ">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00d8ff]">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-primary transition-colors ">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors ">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-primary transition-colors ">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00d8ff]">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com" className="hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://youtube.com" className="hover:text-primary transition-colors">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://github.com" className="hover:text-primary transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Ventur<span className="text-[#00d8ff]">â</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
