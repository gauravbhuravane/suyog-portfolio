import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Code2, Monitor, Cloud, Settings } from "lucide-react";
import "./Projects.css";

const PROJECTS = [
  {
    title: "Enterprise Infrastructure Monitoring",
    desc: "Implemented and optimized LogicMonitor for real-time monitoring of hybrid cloud infrastructure, reducing system downtime by 25% through proactive alerting.",
    ss: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    tech: ["LogicMonitor", "SNMP", "AWS", "Linux"],
    live: "#",
    code: "#",
    icon: <Monitor className="w-6 h-6" />
  },
  {
    title: "Cloud Infrastructure Setup",
    desc: "Designed and deployed secure, scalable AWS environments using EC2, S3, and VPC, ensuring high availability and cost-optimization for enterprise applications.",
    ss: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    tech: ["AWS", "IAM", "CloudWatch", "VPC"],
    live: "#",
    code: "#",
    icon: <Cloud className="w-6 h-6" />
  },
  {
    title: "Automated Incident Workflow",
    desc: "Integrated monitoring platforms with ServiceNow via REST APIs to automate incident lifecycle management, streamlining production support operations.",
    ss: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    tech: ["ServiceNow", "REST API", "SQL", "Python"],
    live: "#",
    code: "#",
    icon: <Settings className="w-6 h-6" />
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
  })
};

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-wrapper">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="projects-title">
            Featured <span className="grad">Projects</span>
          </h2>
          <p className="projects-subtitle">
            A showcase of my expertise in Systems Engineering, Cloud Infrastructure, and Automation.
          </p>
        </motion.div>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              className="project-card"
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              <div className="project-img-container">
                <img src={project.ss} alt={project.title} className="project-img" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.code} className="icon-link" title="Source Code"><Github size={20} /></a>
                    <a href={project.live} className="icon-link" title="Live Demo"><ExternalLink size={20} /></a>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-type-icon">
                  {project.icon}
                </div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
