import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import "./Skills.css";

interface SkillRow {
  title: string;
  items: { name: string; level: number }[];
}

const SKILLS = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Windows", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
];

const ROWS: SkillRow[][] = [
  [
    {
      title: "Monitoring & Support",
      items: [
        { name: "LogicMonitor", level: 90 },
        { name: "Incident Management", level: 85 },
        { name: "Production Support", level: 85 },
      ],
    },
    {
      title: "Cloud & Virtualization",
      items: [
        { name: "AWS (EC2, S3, IAM, VPC)", level: 80 },
        { name: "VMware", level: 75 },
      ],
    },
    {
      title: "Programming",
      items: [
        { name: "Java", level: 80 },
        { name: "Python", level: 75 },
        { name: "SQL", level: 85 },
      ],
    },
    {
      title: "OS & Networking",
      items: [
        { name: "Windows / Linux", level: 85 },
        { name: "TCP/IP, DNS, HTTP/HTTPS", level: 80 },
        { name: "Load Balancing", level: 75 },
      ],
    },
  ],
  [
    {
      title: "Tools",
      items: [
        { name: "ServiceNow", level: 85 },
        { name: "Cisco Meraki", level: 70 },
        { name: "SolarWinds", level: 75 },
        { name: "Excel", level: 90 },
      ],
    },
    {
      title: "Soft Skills",
      items: [
        { name: "Teamwork", level: 90 },
        { name: "Problem Solving", level: 95 },
        { name: "Adaptability", level: 88 },
        { name: "Communication", level: 85 },
      ],
    },
  ],
];

/* 🚀 ADDED ANIMATION VARIANTS */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.6 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

interface SkillsProps {
  theme: "light" | "dark";
}

export const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(stageRef, { once: true });

  // We don't need the random placement logic anymore as we'll use CSS for the ring
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section id="skills" className="skills-container">
      <motion.div className="skills-header" variants={fadeUp} initial="hidden" animate={controls}>
        <h2 className="skills-title">
          My <span className="grad">Skills</span>
        </h2>
        <div className="skills-underline" />
        <p className="skills-description">
          ✨ Technical expertise blended with creativity — explore my core competencies below.
        </p>
      </motion.div>

      {/* CIRCULAR SKILLS RING */}
      <motion.div
        ref={stageRef}
        className="skills-stage"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        <div className="skills-ring">
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              className="skill-circle-wrapper"
              style={{
                "--i": i,
                "--total": SKILLS.length,
              } as React.CSSProperties}
            >
              <motion.div
                className="skill-circle"
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                <img src={s.logo} className="skill-logo" alt={s.name} />
                <span className="skill-name">{s.name}</span>
              </motion.div>
            </div>
          ))}

          {/* Center piece */}
          <div className="skills-center-orbit">
            <div className="orbit-core">
              <span className="core-text">TECH</span>
              <span className="core-sub">STACK</span>
            </div>
            <div className="orbit-pulse" />
          </div>
        </div>
      </motion.div>

      {/* TABLE PART */}
      <div className="skills-table">
        {ROWS.map((row, i) => (
          <div key={i} className="skills-row">
            {row.map((col) => (
              <motion.div
                key={col.title}
                className="skill-box"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((item, j) => (
                    <li key={j} className="skill-item">
                      <div className="skill-item-header">
                        <span>{item.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
