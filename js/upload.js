/**
 * Profile Photo & Resume Uploads Module - Sanjana's Studio Portfolio
 * Handles profile image caching and simulated AI resume parsing for PDF, DOC, DOCX, TXT, JSON.
 * Refactored to output data using the new modular portfolio schema.
 */

function initUploads() {
    const profileUploadInput = document.getElementById('profile-upload');
    const profilePlaceholderIcon = document.getElementById('profile-placeholder-icon');
    const profileImage = document.getElementById('profile-image');
    const profileContainer = document.getElementById('profile-container');

    if (!profileUploadInput) return;

    function loadProfileImage(dataUrl) {
        if (profileImage) {
            profileImage.src = dataUrl;
            profileImage.classList.remove('hidden');
        }
        if (profilePlaceholderIcon) {
            profilePlaceholderIcon.classList.add('hidden');
        }
        if (profileContainer) {
            profileContainer.classList.remove('border-dashed');
            profileContainer.classList.add('border-solid');
        }
    }

    const storedImage = window.portfolioStorage.getProfileImage();
    if (storedImage) {
        loadProfileImage(storedImage);
    }

    profileUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                console.warn('Selected file is not an image.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                loadProfileImage(dataUrl);
                window.portfolioStorage.saveProfileImage(dataUrl);
            };
            reader.readAsDataURL(file);
        }
    });
}

function initResumeUpload(onAutofill) {
    const dropzone = document.getElementById('resume-dropzone');
    const fileInput = document.getElementById('resume-upload');
    const uploadStatus = document.getElementById('upload-status');
    const terminal = document.getElementById('terminal-console');

    if (!dropzone || !fileInput) return;

    // Trigger click on file input
    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag over styling
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFile(files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length) {
            handleFile(files[0]);
        }
    });

    function handleFile(file) {
        const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt', '.json'];
        const fileName = file.name.toLowerCase();
        const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

        if (!isValidExtension) {
            uploadStatus.textContent = "Error: Invalid file format.";
            uploadStatus.classList.remove('text-zinc-400');
            uploadStatus.classList.add('text-red-500');
            return;
        }

        uploadStatus.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        uploadStatus.classList.remove('text-red-500');
        uploadStatus.classList.add('text-zinc-300');

        // Start AI parsing simulation
        simulateAIParsing(file);
    }

    function simulateAIParsing(file) {
        if (!terminal) return;

        // Clear terminal
        terminal.innerHTML = '';
        
        const logs = [
            `$ bash ai-resume-parser.sh --file "${file.name}"`,
            `[INFO] Target document length: ${file.size} bytes`,
            `[INFO] Verifying file integrity and extension type...`,
            `[INFO] Detected format: ${file.name.split('.').pop().toUpperCase()}`,
            `[INFO] Loading LLM parsing agent for document layout analysis...`,
            `[INFO] Processing text tokens and layout clusters...`,
            `[INFO] Running semantic segment extraction...`,
            `> Found Profile Name: Sanjana Londhe`,
            `> Found Contact Info: Mumbai, India | sanjana.londhe@flyrank.ai`,
            `> Found Education: B.Tech in CS, Medi-Caps University (2023 - 2027)`,
            `> Found Experience: AI Prompt Engineer & Developer Intern at Flyrank.ai`,
            `> Found Projects: Buds (Active), PromptFlow (Active)`,
            `[SUCCESS] Extraction complete. Generating structured JSON portfolio object...`,
            `[SUCCESS] JSON schema matched. Auto-populating portfolio forms...`
        ];

        let index = 0;

        function addLogLine() {
            if (index < logs.length) {
                const line = document.createElement('div');
                line.className = 'console-line';
                // Color formatting
                if (logs[index].startsWith('$')) {
                    line.className += ' text-zinc-400 font-bold';
                } else if (logs[index].startsWith('[INFO]')) {
                    line.className += ' text-zinc-400';
                } else if (logs[index].startsWith('>')) {
                    line.className += ' text-green-400 pl-4';
                } else if (logs[index].startsWith('[SUCCESS]')) {
                    line.className += ' text-emerald-400 font-semibold';
                }
                line.textContent = logs[index];
                
                // Add before the caret
                const caret = terminal.querySelector('.terminal-caret') || document.createElement('span');
                if (!caret.parentNode) {
                    caret.className = 'terminal-caret';
                    terminal.appendChild(caret);
                }
                terminal.insertBefore(line, caret);
                terminal.scrollTop = terminal.scrollHeight;
                
                index++;
                setTimeout(addLogLine, 200 + Math.random() * 150); // realistic typing delay
            } else {
                // Done parsing, trigger the callback
                triggerAutofill();
            }
        }

        // Add initial blinking caret
        const caret = document.createElement('span');
        caret.className = 'terminal-caret';
        terminal.appendChild(caret);

        // Start typing logs
        setTimeout(addLogLine, 100);
    }

    function triggerAutofill() {
        // High quality mock data matching Sanjana's background for resume autofill
        const parsedData = {
            profile: {
                name: "Sanjana Londhe",
                title: "Lead AI Engineer • Prompt Design Expert • Tech Writer",
                headline: "Designing the Future of Conversational Interfaces with AI Agents.",
                bio: "I am an AI Engineer specializing in Prompt Engineering, large-scale multi-agent workflows, and Android application integrations.",
                summary: "My expertise lies at the intersection of AI orchestration, Android architecture, and creative communications. I design high-throughput agent networks, optimize prompting context token consumption by up to 45%, and build seamless customer-facing AI products.",
                photo: "assets/profile/profile.jpg"
            },
            skills: [
                "Prompt Engineering",
                "Android Development",
                "Creative Writing",
                "Generative AI"
            ],
            projects: [
                {
                    name: "Buds",
                    status: "Active",
                    desc: "A state-of-the-art agentic chatbot built using reasoning trees and model routing for empathic conversation.",
                    tags: ["Android", "Gemini", "Claude", "Reasoning Trees"],
                    github: "https://github.com/The-tech17/Buds",
                    demo: "",
                    image: "assets/projects/buds.png",
                    casestudy: "content/projects/buds.md",
                    gallery: ["assets/projects/buds.png"],
                    problem: "Traditional chatbots use rigid, robotic structures that fail to validate emotional nuances, causing users to disengage during times of high emotional distress.",
                    solution: "Built a multi-agent routing system using Gemini and Claude. Input is parsed by a Router agent, directing flow to an Active Listener or a Solution Guide, maintaining a natural, empathetic tone throughout.",
                    timeline: "June 2026 (4 Weeks)"
                },
                {
                    name: "Visa Helper AI",
                    status: "Active",
                    desc: "An AI-powered assistant designed to simplify the visa application process. It helps users find the right visa type, gather necessary documents, and understand application procedures—all through an intelligent, conversational interface.",
                    tags: ["Python", "Streamlit", "Gemini"],
                    github: "https://github.com/The-tech17/Visa-Helper-AI",
                    demo: "https://visahelper.streamlit.app",
                    image: "assets/projects/visa-helper.png",
                    casestudy: "content/projects/visa-helper.md",
                    gallery: [
                        "assets/gallery/visa1.png",
                        "assets/gallery/visa2.png",
                        "assets/gallery/visa3.png"
                    ],
                    problem: "Visa application requirements are spread across confusing government portals, written in complex legal terms, leading applicants to upload incorrect files and face rejections.",
                    solution: "Created a RAG (Retrieval-Augmented Generation) pipeline that indexes immigration policy guidelines and matches query intents, outputting interactive, easy-to-use checklist dashboards.",
                    timeline: "May 2026 (4 Weeks)"
                }
            ],
            publications: [
                {
                    title: "Love, and only love",
                    isbn: "ISBN 978-81-985729-0-5",
                    desc: "A collection of short prose, introspective poetry, and essays examining the textures of human intimacy, digital vulnerability, and emotional friction in modern society.",
                    cover: "assets/books/love-cover.jpg",
                    pdf: "assets/books/sample.pdf",
                    buyLink: "https://amazon.com"
                },
                {
                    title: "Poem-The Sea Speaks (Book: Your Ink)",
                    isbn: "ISBN 978-93-6489-354-1",
                    desc: "A reflection on the power of nature and its ability to inspire awe and wonder.",
                    cover: "assets/books/your-ink.jpg",
                    preview: "assets/books/sea-speaks-page.jpg",
                    pdf: "assets/books/sample.pdf",
                    buyLink: "https://amazon.com"
                }
            ],
            experience: [
                {
                    date: "July 2026 - Present",
                    title: "AI Prompt Engineer & Developer Intern",
                    institution: "Flyrank.ai",
                    desc: "Designed multi-agent routing systems, optimized context windows to reduce LLM token overhead, and integrated APIs."
                },
                {
                    date: "2023 - 2027",
                    title: "Bachelor of Technology in Computer Science",
                    institution: "Medi-Caps University",
                    desc: "Pursuing B.Tech in Computer Science with a strong foundation in prompt engineering and Gen AI fundamentals."
                },
                {
                    date: "September 2024",
                    title: "First Place — Essay Writing Competition, Sahityik, Medi-Caps University",
                    institution: "Sahityik, Medi-Caps University",
                    desc: "Crafted an analytical essay that explored the dual nature of urban development, examining development versus destruction."
                }
            ],
            contact: {
                email: "sanjana.londhe@flyrank.ai",
                location: "Mumbai, India",
                github: "https://github.com/sanjanalondhe",
                linkedin: "https://linkedin.com/in/sanjanalondhe"
            }
        };

        if (typeof onAutofill === 'function') {
            onAutofill(parsedData);
        }
    }
}

// Expose to window
window.initUploads = initUploads;
window.initResumeUpload = initResumeUpload;
