import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Github, Linkedin, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal heading
      gsap.fromTo(
        ".contact-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );

      // Stagger form fields
      gsap.fromTo(
        ".contact-field",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Animate button on submit
    gsap.to(".send-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-screen py-32 px-6 md:px-16 bg-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-indigo-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left: heading + socials */}
        <div className="space-y-8">
          <div className="contact-heading space-y-4">
            <p className="text-xs font-mono tracking-widest uppercase text-indigo-400">
              // Get In Touch
            </p>
            <h2 className="text-4xl md:text-6xl font-black font-poppins bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent leading-tight">
              Let's Build Something Amazing
            </h2>
            <p className="text-gray-400 font-inter text-lg">
              Open to internships, freelance projects, and collaborations in AI and Full-Stack development.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: <Mail className="w-5 h-5" />, label: "pandeychirag651@gmail.com", href: "mailto:pandeychirag651@gmail.com", color: "text-cyan-400" },
              { icon: <Github className="w-5 h-5" />, label: "github.com/Chirag240105", href: "https://github.com/Chirag240105", color: "text-white" },
              { icon: <Linkedin className="w-5 h-5" />, label: "linkedin.com/in/chirag", href: "https://linkedin.com", color: "text-indigo-400" },
              { icon: <Code2 className="w-5 h-5" />, label: "leetcode.com/chirag", href: "https://leetcode.com", color: "text-orange-400" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <span className={`${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-5 p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <div className="contact-field space-y-2">
            <label className="text-xs font-mono tracking-widest uppercase text-gray-500">Name</label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-inter text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all"
            />
          </div>

          <div className="contact-field space-y-2">
            <label className="text-xs font-mono tracking-widest uppercase text-gray-500">Email</label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-inter text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all"
            />
          </div>

          <div className="contact-field space-y-2">
            <label className="text-xs font-mono tracking-widest uppercase text-gray-500">Message</label>
            <textarea
              required
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-inter text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="send-btn contact-field w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-[1.02] transition-all duration-300"
          >
            {sent ? (
              "Message Sent ✓"
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
