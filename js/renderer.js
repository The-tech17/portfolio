/**
 * renderer.js - UI Rendering Engine
 * Only renders UI views based on the structured portfolio data model.
 */

// Helper to render dynamic colored chips
function renderTagChips(tags) {
    if (!tags) return '';
    const tagColors = {
        'python': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'gemini': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        'claude': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        'chatgpt': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'android': 'bg-green-500/10 text-green-400 border-green-500/20',
        'kotlin': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'react': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        'streamlit': 'bg-red-500/10 text-red-400 border-red-500/20',
        'javascript': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        'html': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        'css': 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    };

    return tags.map(tag => {
        const lower = tag.toLowerCase().trim();
        let colorClass = 'bg-zinc-900 text-zinc-400 border-zinc-800';
        for (const [key, value] of Object.entries(tagColors)) {
            if (lower.includes(key)) {
                colorClass = value;
                break;
            }
        }
        return `<span class="${colorClass} text-[10px] font-semibold px-2.5 py-1 rounded-md border transition">${tag}</span>`;
    }).join('');
}

const portfolioRenderer = {
    renderAbout(data) {
        const container = document.getElementById('about-container');
        if (!container) return;

        const profile = data.profile || {};
        const contact = data.contact || {};
        const skills = data.skills || [];

        // 1. Core Expertise mapping instead of highlights
        const expertiseHTML = skills.map(skill => {
            const key = skill.toLowerCase();
            let emoji = '⚙️';
            let desc = 'Core technology and integration competency.';

            if (key.includes('prompt')) {
                emoji = '🧠';
                desc = 'Designing robust AI workflows and multi-agent systems.';
            } else if (key.includes('android') || key.includes('mobile')) {
                emoji = '📱';
                desc = 'Native Android applications with AI integration.';
            } else if (key.includes('creative') || key.includes('writing')) {
                emoji = '✍️';
                desc = 'Published author exploring human-centered narratives.';
            } else if (key.includes('gen') || key.includes('ai') || key.includes('generative')) {
                emoji = '🤖';
                desc = 'Building conversational AI products and automations.';
            }

            return `
                <div class="flex flex-col gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-5 hover:border-zinc-700 transition">
                    <div class="flex items-center gap-3">
                        <span class="text-3xl">${emoji}</span>
                        <h4 class="font-bold text-zinc-200">${skill}</h4>
                    </div>
                    <p class="text-xs text-zinc-400 leading-relaxed pl-1">${desc}</p>
                </div>
            `;
        }).join('');

        const localProfilePhoto = window.portfolioStorage.getProfileImage() || profile.photo || 'assets/profile/profile.jpg';

        container.innerHTML = `
            <!-- Hero Introduction Dashboard -->
            <div class="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                <div class="space-y-4 max-w-2xl">
                    <h2 class="text-4xl font-extrabold text-white leading-tight">
                        Crafting Intelligent Experiences with AI
                    </h2>
                    <p class="text-sm font-semibold text-zinc-400 font-mono tracking-wider">
                        Prompt Engineer • AI Application Developer • Published Writer
                    </p>
                    <p class="text-zinc-500 leading-relaxed text-sm">
                        Building conversational AI, Android applications, and intelligent automation that feels human.
                    </p>
                    <div class="flex items-center gap-4 pt-2">
                        <button onclick="document.querySelector('.tab-button[data-tab=\\'projects\\']').click()" class="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition shadow-lg shadow-white/5">
                            View Projects
                        </button>
                        <button onclick="document.getElementById('profile-resume-link')?.click()" class="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 font-semibold text-xs hover:bg-zinc-800 hover:text-white transition">
                            Download Resume
                        </button>
                    </div>
                </div>
                
                <!-- Statistics Dashboard Widgets -->
                <div class="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div class="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 min-w-[125px] text-center">
                        <div class="text-2xl font-bold text-white mb-1">15+</div>
                        <div class="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">AI Projects</div>
                    </div>
                    <div class="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 min-w-[125px] text-center">
                        <div class="text-2xl font-bold text-white mb-1">3</div>
                        <div class="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Published Works</div>
                    </div>
                    <div class="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 min-w-[125px] text-center">
                        <div class="text-2xl font-bold text-white mb-1">2</div>
                        <div class="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">Platforms</div>
                        <div class="text-[8px] text-zinc-600 mt-0.5">(Android + Web)</div>
                    </div>
                    <div class="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 min-w-[125px] text-center">
                        <div class="text-2xl font-bold text-white mb-1">1</div>
                        <div class="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">AI Internship</div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <!-- LEFT COLUMN (60% / 3 cols) -->
                <div class="lg:col-span-3 space-y-10">
                    <!-- About Me (Tri-fold split column layout) -->
                    <div>
                        <h2 class="text-2xl font-bold text-white mb-6">About Me</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="space-y-2">
                                <h4 class="font-bold text-zinc-200 text-sm flex items-center gap-2">👤 Who I Am</h4>
                                <p class="text-zinc-400 text-xs leading-relaxed leading-6">${profile.bio || 'A Prompt Engineer and AI Developer passionate about human-centric interfaces.'}</p>
                            </div>
                            <div class="space-y-2 border-t md:border-t-0 md:border-l border-zinc-800/60 pt-4 md:pt-0 md:pl-6">
                                <h4 class="font-bold text-zinc-200 text-sm flex items-center gap-2">🛠️ What I Build</h4>
                                <p class="text-zinc-400 text-xs leading-relaxed leading-6">${profile.summary ? profile.summary.split('.')[0] + '.' : 'Intelligent agent workflows, mobile integrations, and conversational platforms.'}</p>
                            </div>
                            <div class="space-y-2 border-t md:border-t-0 md:border-l border-zinc-800/60 pt-4 md:pt-0 md:pl-6">
                                <h4 class="font-bold text-zinc-200 text-sm flex items-center gap-2">🚀 What Drives Me</h4>
                                <p class="text-zinc-400 text-xs leading-relaxed leading-6">${profile.summary && profile.summary.split('.').length > 1 ? profile.summary.split('.').slice(1).join('.') : 'Exploring the intersections of digital vulnerability, computer science, and creative engineering.'}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Professional Summary -->
                    <div class="border-t border-zinc-800/60 pt-8">
                        <h3 class="text-xl font-semibold text-zinc-200 mb-4">Professional Summary</h3>
                        <p id="about-summary" class="text-zinc-400 leading-8">
                            ${profile.summary || ''}
                        </p>
                    </div>

                    <!-- Core Expertise Grid -->
                    <div class="border-t border-zinc-800/60 pt-8">
                        <h3 class="text-xl font-semibold text-zinc-200 mb-4">Core Expertise</h3>
                        <div id="about-highlights" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${expertiseHTML}
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN (40% / 2 cols) -->
                <div class="lg:col-span-2">
                    <!-- Profile Card -->
                    <div class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col items-center text-center">
                        <!-- Profile Photo Frame -->
                        <div class="relative group w-32 h-32 mb-4">
                            <div class="w-full h-full rounded-full border-2 border-solid border-zinc-700 bg-zinc-950 flex items-center justify-center overflow-hidden" id="profile-container">
                                <img id="profile-image" class="w-full h-full object-cover" src="${localProfilePhoto}" alt="Profile Picture">
                            </div>
                        </div>

                        <div class="w-full border-t border-zinc-800/80 my-4"></div>

                        <!-- Actions & Links -->
                        <div class="w-full space-y-3">
                            <a id="profile-resume-link" href="#" class="flex items-center justify-center gap-2 w-full rounded-xl bg-white text-zinc-950 font-semibold py-3 hover:bg-zinc-200 transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>
                                Download Resume
                            </a>

                            <div class="grid grid-cols-3 gap-2">
                                <a id="profile-github" href="${contact.github || '#'}" target="_blank" class="flex flex-col items-center justify-center py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/60 transition text-zinc-400 hover:text-white">
                                    <span class="text-xs font-medium">GitHub</span>
                                </a>
                                <a id="profile-linkedin" href="${contact.linkedin || '#'}" target="_blank" class="flex flex-col items-center justify-center py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/60 transition text-zinc-400 hover:text-white">
                                    <span class="text-xs font-medium">LinkedIn</span>
                                </a>
                                <a id="profile-email" href="mailto:${contact.email || ''}" class="flex flex-col items-center justify-center py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/60 transition text-zinc-400 hover:text-white">
                                    <span class="text-xs font-medium">Email</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderProjects(data) {
        const container = document.getElementById('projects-container');
        if (!container) return;

        const projects = data.projects || [];
        window.portfolioProjects = projects; // Cache on window for modal lookup

        const projectsListHTML = projects.map((project, idx) => {
            let emoji = '⚙️';
            const nameLower = project.name ? project.name.toLowerCase() : '';
            if (nameLower.includes('bud')) emoji = '🤖';
            else if (nameLower.includes('flow')) emoji = '⚡';
            else if (nameLower.includes('assistant')) emoji = '💬';

            const tagsHTML = renderTagChips(project.tags);

            const demoUrl = project.demo || '#';
            const githubUrl = project.github || '#';
            const caseStudyUrl = project.casestudy || '#';
            const hasDemo = !!project.demo;
            const hasGithub = !!project.github;
            const hasCase = !!project.casestudy;

            const imageHTML = project.image ? `
                <div class="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800/80 mb-4 bg-zinc-900/40 cursor-pointer group-hover:border-zinc-700 transition" onclick="window.portfolioRenderer.showProjectDetails(${idx})">
                    <img src="${project.image}" alt="${project.name}" class="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300">
                </div>
            ` : `
                <div class="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800/80 mb-4 bg-zinc-900/40 flex items-center justify-center cursor-pointer" onclick="window.portfolioRenderer.showProjectDetails(${idx})">
                    <span class="text-5xl">${emoji}</span>
                </div>
            `;

            return `
                <div id="project-card-${idx}" class="project-card rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/60 transition duration-300 group">
                    <div>
                        ${imageHTML}
                        <div class="space-y-2 mt-2">
                            <div class="flex justify-between items-center">
                                <h3 class="text-xl font-bold text-white group-hover:text-zinc-200 transition cursor-pointer" onclick="window.portfolioRenderer.showProjectDetails(${idx})">${project.name || 'Unnamed Project'}</h3>
                                <span class="text-[9px] font-bold text-zinc-500 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-wider">${project.status || 'Active'}</span>
                            </div>
                            <p class="text-zinc-400 text-xs mt-1.5 leading-relaxed line-clamp-3">${project.desc || ''}</p>
                        </div>
                        <div class="flex flex-wrap gap-1.5 pt-3">
                            ${tagsHTML}
                        </div>
                    </div>
                    
                    <!-- Actionable CTA Buttons -->
                    <div class="flex flex-wrap items-center gap-1.5 mt-5 pt-3 border-t border-zinc-800/40">
                        <button onclick="window.portfolioRenderer.showProjectDetails(${idx})" class="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white transition text-[9px] font-bold">
                            View Details
                        </button>
                        <a href="${demoUrl}" ${hasDemo ? 'target="_blank"' : 'onclick="event.preventDefault();"'} class="px-3 py-1.5 rounded-lg text-[9px] font-bold transition flex items-center gap-0.5 ${hasDemo ? 'bg-white text-zinc-950 hover:bg-zinc-200' : 'bg-zinc-900/80 text-zinc-500 border border-zinc-800/80 cursor-not-allowed hidden'
                }">
                            <span>Live Demo</span>
                            ${hasDemo ? '<span>→</span>' : ''}
                        </a>
                        <a href="${githubUrl}" ${hasGithub ? 'target="_blank"' : 'onclick="event.preventDefault();"'} class="px-3 py-1.5 rounded-lg border text-[9px] font-bold transition ${hasGithub ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-800/60 hover:text-white' : 'border-zinc-850 text-zinc-500 cursor-not-allowed hidden'
                }">
                            GitHub
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="space-y-8">
                <div>
                    <h2 class="text-3xl font-bold text-white mb-2">AI Projects</h2>
                    <p class="text-zinc-500">A collection of intelligent applications, agent workflows, and experimental AI tools.</p>
                </div>
                <div id="projects-list" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${projectsListHTML}
                </div>
            </div>
        `;
    },

    renderWriting(data) {
        const container = document.getElementById('writing-container');
        if (!container) return;

        const publications = data.publications || [];
        const contact = data.contact || {};
        const writingListHTML = publications.map((pub, idx) => {
            const coverImg = pub.cover || 'assets/books/love-cover.jpg';
            const pdfUrl = pub.pdf || pub['book pdf'] || pub.bookPdf || pub['book_pdf'] || pub.link || '';
            const buyUrl = pub.buyLink || pub.buylink || pub['buy link'] || pub.dmLink || '';
            const status = pub.status || '';

            // Status Badge
            let statusBadge = '';
            if (status) {
                const isHardcopy = status.toLowerCase().includes('hardcopy') || status.toLowerCase().includes('dm');
                const badgeColor = isHardcopy
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
                const dotColor = isHardcopy ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse';

                statusBadge = `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badgeColor}">
                        <span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>
                        <span>${status}</span>
                    </span>
                `;
            }

            // PDF Action Button
            let pdfBtn = '';
            if (pdfUrl) {
                pdfBtn = `
                    <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <span>Read Work (PDF)</span>
                        <svg class="w-3 h-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                `;
            }

            // Buy / Purchase / DM Button
            let buyBtn = '';
            if (buyUrl) {
                const isLinkedIn = buyUrl.includes('linkedin.com');
                const btnText = isLinkedIn ? 'Request Hardcopy (DM)' : 'Buy Book';
                buyBtn = `
                    <a href="${buyUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 ${isLinkedIn ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700' : 'bg-white text-zinc-950 hover:bg-zinc-200'} font-bold text-xs rounded-xl transition duration-200 shadow-sm">
                        ${isLinkedIn ? '<svg class="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>' : ''}
                        <span>${btnText}</span>
                        <svg class="w-3 h-3 ${isLinkedIn ? 'text-zinc-400' : 'text-zinc-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                `;
            } else if (status.toLowerCase().includes('dm') || status.toLowerCase().includes('hardcopy')) {
                const linkedinUrl = contact.linkedin || 'https://www.linkedin.com/in/sanjana-londhe-9ab383334/';
                buyBtn = `
                    <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl border border-zinc-700 transition duration-200 shadow-sm">
                        <svg class="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        <span>Request Hardcopy (DM)</span>
                        <svg class="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                `;
            }

            // Email author button for hardcopy inquiries
            let emailBtn = '';
            if (status.toLowerCase().includes('dm') || status.toLowerCase().includes('hardcopy')) {
                const authorEmail = contact.email || 'londhesanjana17@gmail.com';
                const emailSubject = encodeURIComponent(`Hardcopy Inquiry: ${pub.title}`);
                emailBtn = `
                    <a href="mailto:${authorEmail}?subject=${emailSubject}" class="inline-flex items-center gap-1.5 px-3.5 py-2 border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-xs rounded-xl transition duration-200">
                        <svg class="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <span>Email Author</span>
                    </a>
                `;
            }

            // Preview scan button (if pub.preview exists)
            const previewBtn = pub.preview ? `
                <button onclick="window.portfolioRenderer.openLightbox('${pub.preview}', '${pub.title} Preview')" class="inline-flex items-center gap-1.5 px-3.5 py-2 border border-zinc-800 bg-zinc-900/40 text-zinc-300 font-medium text-xs rounded-xl hover:bg-zinc-800 hover:text-white transition">
                    <svg class="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    <span>View Scan</span>
                </button>
            ` : '';

            // Cover click lightbox button
            const coverLightboxBtn = `
                <button onclick="window.portfolioRenderer.openLightbox('${coverImg}', '${pub.title} Cover')" class="inline-flex items-center gap-1.5 px-3 py-2 border border-zinc-800/80 bg-zinc-900/30 text-zinc-400 hover:text-zinc-200 text-xs font-medium rounded-xl hover:bg-zinc-800/60 transition" title="Enlarge cover image">
                    <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>View Cover</span>
                </button>
            `;

            return `
                <div id="writing-card-${idx}" class="book-card rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start hover:border-zinc-700 transition duration-300 shadow-lg">
                    <!-- Book Cover Container with 3D and Hover Zoom cues -->
                    <div class="book-cover-container group w-28 sm:w-32 h-40 sm:h-44 rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden flex-shrink-0 flex items-center justify-center relative cursor-pointer shadow-md" onclick="window.portfolioRenderer.openLightbox('${pub.preview || coverImg}', '${pub.title}')" title="Click to view full cover">
                        <img src="${coverImg}" alt="${pub.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                            <span class="p-1.5 px-2.5 rounded-lg bg-black/70 text-white text-[11px] font-medium backdrop-blur-sm flex items-center gap-1">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path></svg>
                                <span>Zoom</span>
                            </span>
                        </div>
                    </div>
                    <div class="space-y-3 flex-1 w-full text-center sm:text-left">
                        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            ${pub.isbn ? `<span class="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">${pub.isbn}</span>` : ''}
                            ${statusBadge}
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mt-0.5 tracking-tight">${pub.title || 'Untitled Publication'}</h3>
                        </div>
                        <p class="text-zinc-300 text-sm leading-relaxed max-w-2xl">${pub.desc || ''}</p>
                        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2">
                            ${pdfBtn}
                            ${buyBtn}
                            ${emailBtn}
                            ${previewBtn}
                            ${coverLightboxBtn}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="space-y-8">
                <div>
                    <h2 class="text-3xl font-bold text-white mb-2">Writing & Publications</h2>
                    <p class="text-zinc-500">Bridging technology and humanities. A selection of published creative writing and literary work.</p>
                </div>
                <div id="writing-list" class="grid grid-cols-1 gap-6">
                    ${writingListHTML}
                </div>
            </div>
        `;
    },

    renderJourney(data) {
        const container = document.getElementById('journey-container');
        if (!container) return;

        const experience = data.experience || [];

        // Dynamic horizontal/micro timeline diagram nodes at the top
        const timelineNodes = [
            { year: '2023', text: 'Started B.Tech', icon: '🎓' },
            { year: '2024', text: 'Won Essay Competition', icon: '🏆' },
            { year: '2025', text: 'Published Writing', icon: '📖' },
            { year: '2026', text: 'AI Intern @ Flyrank.ai', icon: '🤖' },
            { year: 'Now', text: 'Building AI Products', icon: '🚀' }
        ];

        const nodeHTML = timelineNodes.map((node, i) => {
            const isLast = i === timelineNodes.length - 1;
            return `
                <div class="flex-1 flex flex-col items-center text-center space-y-1 relative">
                    <div class="text-[10px] text-zinc-500 font-mono">${node.year}</div>
                    <div class="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-xs flex items-center justify-center relative z-10 hover:border-zinc-600 transition shadow">
                        ${node.icon}
                    </div>
                    <div class="text-[9px] text-zinc-400 font-medium hidden sm:block">${node.text}</div>
                    ${!isLast ? `<div class="absolute top-[28px] left-[50%] right-[-50%] h-[1px] bg-zinc-800 z-0"></div>` : ''}
                </div>
            `;
        }).join('');

        const experienceTimelineHTML = experience.map((item, idx) => {
            const isCurrent = idx === 0;
            const dotClass = isCurrent ? 'bg-white border-white' : 'bg-zinc-950 border-zinc-800';
            const titleClass = isCurrent ? 'text-white' : 'text-zinc-200';
            return `
                <div id="journey-item-${idx}" class="journey-item relative pl-8 pb-10 border-l border-zinc-800 last:border-0 last:pb-0">
                    <!-- Bullet Node -->
                    <div class="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full ${dotClass} border-2 flex items-center justify-center shadow-lg">
                        <div class="w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-zinc-950' : 'bg-zinc-500'}"></div>
                    </div>
                    <span class="text-xs font-mono uppercase tracking-wider text-zinc-500">${item.date || ''}</span>
                    <h3 class="text-lg font-bold ${titleClass} mt-1">${item.title || 'Untitled Role'}</h3>
                    <p class="text-sm font-semibold text-zinc-400">${item.institution || ''}</p>
                    <p class="text-zinc-500 text-xs mt-2 max-w-3xl leading-relaxed leading-6">${item.desc || ''}</p>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="space-y-8">
                <div>
                    <h2 class="text-3xl font-bold text-white mb-2">My Journey</h2>
                    <p class="text-zinc-500">A timeline of my academic background, internships, and key milestones.</p>
                </div>

                <!-- Visual Vertical Nodes Header Flow -->
                <div class="flex justify-between items-center py-6 border border-zinc-800 bg-zinc-900/10 rounded-2xl mb-8 px-4 overflow-x-auto">
                    ${nodeHTML}
                </div>

                <div id="journey-timeline" class="relative ml-4 pl-4 space-y-2 mt-8">
                    ${experienceTimelineHTML}
                </div>
            </div>
        `;
    },

    renderContact(data) {
        const container = document.getElementById('contact-container');
        if (!container) return;

        const contact = data.contact || {};

        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <!-- Left Details (40%) -->
                <div class="lg:col-span-2 space-y-6">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                        <p class="text-zinc-500">Have a query or want to discuss a new AI development opportunity? Let's connect.</p>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/20">
                            <span class="text-xl text-zinc-400">📧</span>
                            <div>
                                <p class="text-xs text-zinc-500">Email Me</p>
                                <a id="contact-email-link" href="mailto:${contact.email || ''}" class="text-sm text-zinc-300 hover:text-white transition">${contact.email || ''}</a>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/20">
                            <span class="text-xl text-zinc-400">📍</span>
                            <div>
                                <p class="text-xs text-zinc-500">Location</p>
                                <p id="contact-location-text" class="text-sm text-zinc-300">${contact.location || ''}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Form (60%) -->
                <div class="lg:col-span-3">
                    <form class="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                        <h3 class="text-lg font-bold text-zinc-200">Send a Message</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label class="text-xs font-semibold text-zinc-500">Your Name</label>
                                <input type="text" placeholder="Name" class="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-semibold text-zinc-500">Email Address</label>
                                <input type="email" placeholder="email@example.com" class="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition">
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-semibold text-zinc-500">Message</label>
                            <textarea rows="4" placeholder="How can I help you?" class="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition resize-none"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-2.5 rounded-lg transition duration-200">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        `;
    },

    renderPortfolio(data) {
        const profile = data.profile || {};

        const headerName = document.getElementById('header-name');
        if (headerName) headerName.textContent = (profile.name || "Sanjana") + "'s Studio";

        const headerTitle = document.getElementById('header-title');
        if (headerTitle) headerTitle.textContent = profile.title || "";

        const headerIntro = document.getElementById('header-intro');
        if (headerIntro) headerIntro.textContent = profile.headline || "";

        this.renderAbout(data);
        this.renderProjects(data);
        this.renderWriting(data);
        this.renderJourney(data);
        this.renderContact(data);

        // Bind data values dynamically to the command palette list indexing
        if (window.portfolioPalette && typeof window.portfolioPalette.setDynamicPortfolioData === 'function') {
            window.portfolioPalette.setDynamicPortfolioData(data);
        }
    },

    showProjectDetails(idx) {
        const project = window.portfolioProjects[idx];
        if (!project) return;

        document.getElementById('modal-project-name').textContent = project.name || 'Unnamed Project';
        document.getElementById('modal-project-image').src = project.image || '';
        document.getElementById('modal-project-desc').textContent = project.desc || '';
        document.getElementById('modal-project-timeline').textContent = project.timeline || 'N/A';
        document.getElementById('modal-project-status').textContent = project.status || 'Active';
        document.getElementById('modal-project-tags').innerHTML = renderTagChips(project.tags);

        // GitHub & Demo links
        const gitLink = document.getElementById('modal-project-github');
        if (project.github) {
            gitLink.href = project.github;
            gitLink.classList.remove('hidden');
        } else {
            gitLink.classList.add('hidden');
        }

        const demoLink = document.getElementById('modal-project-demo');
        if (project.demo) {
            demoLink.href = project.demo;
            demoLink.classList.remove('hidden');
        } else {
            demoLink.classList.add('hidden');
        }

        // Problem & Solution
        document.getElementById('modal-project-problem').textContent = project.problem || 'No problem statement documented.';
        document.getElementById('modal-project-solution').textContent = project.solution || 'No solution blueprint documented.';

        // Dynamic Markdown Case Study Loader
        const markdownContainer = document.getElementById('modal-markdown-container');
        const markdownBody = document.getElementById('modal-markdown-body');
        if (project.casestudy) {
            markdownContainer.classList.remove('hidden');
            markdownBody.innerHTML = '<div class="text-zinc-500 italic">Loading case study details...</div>';
            fetch(project.casestudy)
                .then(res => {
                    if (!res.ok) throw new Error("Markdown not found");
                    return res.text();
                })
                .then(text => {
                    markdownBody.innerHTML = window.portfolioRenderer.parseMarkdown(text);
                })
                .catch(err => {
                    console.error(err);
                    markdownBody.innerHTML = '<div class="text-red-400">Failed to load case study document.</div>';
                });
        } else {
            markdownContainer.classList.add('hidden');
        }

        // Gallery Setup
        const galleryContainer = document.getElementById('modal-gallery-container');
        const slidesContainer = document.getElementById('modal-gallery-slides');
        const dotsContainer = document.getElementById('modal-gallery-dots');

        if (project.gallery && project.gallery.length > 0) {
            galleryContainer.classList.remove('hidden');
            slidesContainer.innerHTML = '';
            dotsContainer.innerHTML = '';

            project.gallery.forEach((img, gIdx) => {
                const slide = document.createElement('div');
                slide.className = 'w-full flex-shrink-0 aspect-video';
                slide.innerHTML = `<img src="${img}" class="w-full h-full object-cover gallery-zoom" onclick="window.portfolioRenderer.openLightbox('${img}', '${project.name} Screenshot')">`;
                slidesContainer.appendChild(slide);

                const dot = document.createElement('button');
                dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${gIdx === 0 ? 'bg-white w-4' : 'bg-zinc-600 hover:bg-zinc-400'}`;
                dot.title = `Slide ${gIdx + 1}`;
                dot.onclick = () => {
                    window.portfolioRenderer.setGallerySlide(gIdx);
                };
                dotsContainer.appendChild(dot);
            });

            window.currentSlideIndex = 0;
            window.currentGallerySize = project.gallery.length;
            window.portfolioRenderer.setGallerySlide(0);

            // Bind next/prev button clicks
            const btnPrev = document.getElementById('gallery-prev');
            const btnNext = document.getElementById('gallery-next');
            if (btnPrev && btnNext) {
                btnPrev.onclick = (e) => {
                    e.stopPropagation();
                    let prevIdx = window.currentSlideIndex - 1;
                    if (prevIdx < 0) prevIdx = window.currentGallerySize - 1;
                    window.portfolioRenderer.setGallerySlide(prevIdx);
                };
                btnNext.onclick = (e) => {
                    e.stopPropagation();
                    let nextIdx = window.currentSlideIndex + 1;
                    if (nextIdx >= window.currentGallerySize) nextIdx = 0;
                    window.portfolioRenderer.setGallerySlide(nextIdx);
                };
            }
        } else {
            galleryContainer.classList.add('hidden');
        }

        // Show modal
        document.getElementById('project-modal').classList.remove('hidden');
    },

    setGallerySlide(slideIdx) {
        window.currentSlideIndex = slideIdx;
        const slides = document.getElementById('modal-gallery-slides');
        if (slides) {
            slides.style.transform = `translateX(-${slideIdx * 100}%)`;
        }

        // Update dots visual active state
        const dots = document.getElementById('modal-gallery-dots')?.children;
        if (dots) {
            for (let i = 0; i < dots.length; i++) {
                if (i === slideIdx) {
                    dots[i].className = 'w-2 h-2 rounded-full transition-all duration-300 bg-white w-4';
                } else {
                    dots[i].className = 'w-2 h-2 rounded-full transition-all duration-300 bg-zinc-600 hover:bg-zinc-400';
                }
            }
        }
    },

    openLightbox(imgSrc, captionText) {
        const modal = document.getElementById('lightbox-modal');
        const img = document.getElementById('lightbox-img');
        const caption = document.getElementById('lightbox-caption');
        if (!modal || !img) return;
        img.src = imgSrc;
        if (caption) caption.textContent = captionText || '';
        modal.classList.remove('hidden');
    },

    parseMarkdown(md) {
        if (!md) return '';
        let html = md;
        // Escape HTML tags to prevent XSS (except headers/pre/etc we insert ourselves)
        html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Headings
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold & Italics
        html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
        html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

        // Blockquotes
        html = html.replace(/^\>\s+(.*$)/gim, '<blockquote>$1</blockquote>');

        // Fenced Code Blocks (```)
        html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

        // Inline Code
        html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

        // Unordered lists
        html = html.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>[\s\S]*?<\/li>)/gim, '<ul>$1</ul>');
        html = html.replace(/<\/ul>\s*<ul>/gim, '');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" class="text-white hover:underline">$1</a>');

        // Split and add paragraphs for regular text lines
        const lines = html.split('\n');
        const parsedLines = lines.map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('<pre') || trimmed.startsWith('<blockquote') || trimmed.startsWith('</') || trimmed.startsWith('<a')) {
                return line;
            }
            return `<p>${line}</p>`;
        });

        return parsedLines.join('\n');
    }
};

// Bind Modal Close listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal-close')?.addEventListener('click', () => {
        document.getElementById('project-modal').classList.add('hidden');
    });
    document.getElementById('lightbox-close')?.addEventListener('click', () => {
        document.getElementById('lightbox-modal').classList.add('hidden');
    });
    window.addEventListener('click', (e) => {
        const projModal = document.getElementById('project-modal');
        if (e.target === projModal) {
            projModal.classList.add('hidden');
        }
        const lightboxModal = document.getElementById('lightbox-modal');
        if (e.target === lightboxModal) {
            lightboxModal.classList.add('hidden');
        }
    });
});

window.portfolioRenderer = portfolioRenderer;
