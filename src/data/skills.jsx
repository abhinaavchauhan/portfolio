import React from 'react';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaJava, FaPython, FaPhp, FaGitAlt, FaDocker, FaLinux, FaShieldAlt
} from 'react-icons/fa';
import { 
  SiJavascript, SiTailwindcss, SiExpress, SiNestjs, SiMongodb, SiMysql, SiFirebase, SiC, SiPostman
} from 'react-icons/si';

export const skills = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26] text-2xl" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6] text-2xl" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E] text-2xl" /> },
      { name: "React", icon: <FaReact className="text-[#61DAFB] text-2xl" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4] text-2xl" /> },
      { name: "Bootstrap", icon: <FaBootstrap className="text-[#7952B3] text-2xl" /> }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-[#339933] text-2xl" /> },
      { name: "Express.js", icon: <SiExpress className="text-white text-2xl" /> },
      { name: "NestJS", icon: <SiNestjs className="text-[#E0234E] text-2xl" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248] text-2xl" /> },
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1] text-2xl" /> },
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28] text-2xl" /> }
    ]
  },
  {
    category: "Programming",
    skills: [
      { name: "Java", icon: <FaJava className="text-[#007396] text-2xl" /> },
      { name: "Python", icon: <FaPython className="text-[#3776AB] text-2xl" /> },
      { name: "C", icon: <SiC className="text-[#A8B9CC] text-2xl" /> },
      { name: "PHP", icon: <FaPhp className="text-[#777BB4] text-2xl" /> }
    ]
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-[#F05032] text-2xl" /> },
      { name: "Docker", icon: <FaDocker className="text-[#2496ED] text-2xl" /> },
      { name: "Linux", icon: <FaLinux className="text-white text-2xl" /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37] text-2xl" /> },
      { name: "Cybersecurity", icon: <FaShieldAlt className="text-[#00f0ff] text-2xl" /> }
    ]
  }
];
