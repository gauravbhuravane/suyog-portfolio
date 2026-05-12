import { useState } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

interface ContactProps {
  theme: "light" | "dark";
}

export function Contact({ theme }: ContactProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("⚠️ Please fill all fields.");
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(form.email)) {
      setStatus("⚠️ Enter a valid email address.");
      return;
    }

    setSending(true);
    setStatus("Sending...");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          user_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
        setSending(false);
      })
      .catch(() => {
        setStatus("❌ Failed to send message. Please try again.");
        setSending(false);
      });
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "suyabhuravane@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9021851756" },
    { icon: MapPin, label: "Location", value: "Pune, Maharashtra, India" },
  ];

  const quickLinks = [
    { icon: Linkedin, url: "https://www.linkedin.com/in/suyog-bhuravane-24511133a" },
    { icon: Mail, url: "mailto:suyabhuravane@gmail.com" },
    { icon: MessageCircle, url: "https://wa.me/+919021851756" },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">



        <div className="max-w-2xl mx-auto text-center">

          {/* CENTERED CONTENT */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl dark:text-white mb-6">
              Let’s Connect & Collaborate{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                🤝
              </span>
            </h3>

            <p className="text-gray-600 dark:text-white/70 mb-8 text-lg">
              Whether it’s a new project or collaboration — I’d love to hear from you!
            </p>

            {/* CONTACT INFO */}
            <div className="space-y-6 mb-12">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white/50 dark:bg-white/5
                             backdrop-blur-xl border border-gray-300 dark:border-white/10
                             rounded-2xl p-6 hover:border-blue-500 dark:hover:bg-white/10 transition-all text-left"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-white/60 text-sm font-medium">{item.label}</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 w-full">
              {quickLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl
                    bg-white/50 dark:bg-white/5 backdrop-blur-md
                    border border-gray-300 dark:border-white/10 transition-shadow hover:shadow-lg hover:shadow-blue-500/40"
                >
                  <item.icon className="text-blue-500 dark:text-blue-400 w-7 h-7" />
                </motion.a>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
