import { FaReact, FaJava, FaPython, FaMusic, FaBook, FaBus } from 'react-icons/fa';
import { SiSwift, SiMysql, SiFirebase, SiTailwindcss, SiNestjs } from 'react-icons/si';

export const projects = [
    {
        id: 1,
        title: "DarkProbe",
        description: "Intelligent Attack Surface Analysis Engine. Modular web vulnerability scanner for detecting XSS, SQLi and more. Features professional reporting and a web dashboard.",
        image: "/assets/projects/darkprobe.png",
        technologies: ["Python", "Flask", "HTML/JS", "Security"],
        githubLink: "https://github.com/abhinaavchauhan/DarkProbe",
        liveLink: "https://github.com/abhinaavchauhan/DarkProbe",
        category: "Security"
    },
    {
        id: 2,
        title: "SwiftShare",
        description: "A fast, secure file sharing application with end-to-end encryption. Allows users to share large files seamlessly.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=60",
        technologies: ["React", "Firebase", "Tailwind CSS"],
        githubLink: "https://github.com/abhinaavchauhan/swiftshare",
        liveLink: "https://github.com/abhinaavchauhan/swiftshare",
        category: "Web App"
    },
    {
        id: 3,
        title: "T-BUS Ticket App",
        description: "Mobile-first web application for booking bus tickets. Includes real-time seat selection and payment integration.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        technologies: ["React", "Node.js", "MongoDB"],
        githubLink: "https://github.com",
        liveLink: "https://demo.com",
        category: "Mobile App"
    },
    {
        id: 4,
        title: "NovaBeats Music Player",
        description: "A sleek music player with visualization, playlist management, and high-quality audio streaming.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        technologies: ["React", "Redux", "Spotify API"],
        githubLink: "https://github.com",
        liveLink: "https://demo.com",
        category: "Web App"
    },
    {
        id: 5,
        title: "Online Book Store",
        description: "E-commerce platform for books featuring search, reviews, cart, and secure checkout system.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        technologies: ["Java", "Spring Boot", "MySQL"],
        githubLink: "https://github.com",
        liveLink: "https://demo.com",
        category: "Full Stack"
    },
    {
        id: 6,
        title: "Portfolio V1",
        description: "My first personal portfolio website demonstrating early frontend skills.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        technologies: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com",
        liveLink: "https://demo.com",
        category: "Web"
    }
];
