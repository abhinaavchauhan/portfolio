import {
    FaReact, FaJava, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaDocker, FaLinux
} from 'react-icons/fa';
import {
    SiJavascript, SiTypescript, SiTailwindcss, SiBootstrap, SiMongodb, SiMysql, SiFirebase, SiPostman, SiExpress, SiNestjs, SiC, SiPhp
} from 'react-icons/si';
import { MdSecurity } from 'react-icons/md';

export const skillsData = [
    {
        category: "Frontend",
        skills: [
            { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
            { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
            { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
        ]
    },
    {
        category: "Backend",
        skills: [
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "Express.js", icon: SiExpress, color: "#000000" }, // Black/White
            { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
            { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        ]
    },
    {
        category: "Programming",
        skills: [
            { name: "Java", icon: FaJava, color: "#007396" },
            { name: "Python", icon: FaPython, color: "#3776AB" },
            { name: "C Programming", icon: SiC, color: "#A8B9CC" },
            { name: "PHP", icon: SiPhp, color: "#777BB4" },
        ]
    },
    {
        category: "Tools & Others",
        skills: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "Docker", icon: FaDocker, color: "#2496ED" },
            { name: "Linux", icon: FaLinux, color: "#FCC624" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "Cybersecurity", icon: MdSecurity, color: "#4CAF50" },
        ]
    }
];
