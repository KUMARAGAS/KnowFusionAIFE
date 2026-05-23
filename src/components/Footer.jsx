import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full text-white py-10 px-6 md:px-20 mt-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B75FF] via-[#4F8FFF] to-[#4DB7FF] dark:from-[#1a3a6b] dark:via-[#2d5aa0] dark:to-[#1a3a6b] opacity-90"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-24 h-24 bg-white/10 rounded-full top-10 left-10 blur-2xl"></div>
        <div className="absolute w-32 h-32 bg-white/10 rounded-full bottom-10 right-20 blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/20 pb-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">KnowFusion</h2>
          <p className="text-white/80 text-sm">
            Your AI-powered study companion. Upload lecture notes, get clean summaries, and ask questions — all in one platform.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/upload" className="hover:text-white">Upload Notes</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
        <p>&copy; {new Date().getFullYear()} KnowFusion. All rights reserved.</p>
        <p>Built for students, by students</p>
      </div>
    </footer>
  );
}
