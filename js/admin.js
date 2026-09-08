/**
 * Sanjana's Studio Dashboard - Private Editor Script
 * Handles input synchronization, visual list interfaces, uploader integrations, and data persistence in localStorage.
 * Refactored to map controls and state to the new modular database schema.
 */

// Baseline default backup (redundancy copy matching portfolio.json)
const BASELINE_JSON_PATH = 'data/portfolio.json';

// Mutable global state loaded on DOM ready
let portfolioData = {};

// Synchronize inputs currently typed in the browser DOM to memory state variable
function syncEditorInputsToState() {
    if (!portfolioData.profile) portfolioData.profile = {};
    if (!portfolioData.contact) portfolioData.contact = {};

    portfolioData.profile.name = document.getElementById('edit-name').value;
    portfolioData.profile.title = document.getElementById('edit-title').value;
    portfolioData.profile.headline = document.getElementById('edit-intro').value;
    portfolioData.profile.bio = document.getElementById('edit-bio').value;
    portfolioData.profile.summary = document.getElementById('edit-summary').value;

    portfolioData.contact.email = document.getElementById('edit-email').value;
    portfolioData.contact.location = document.getElementById('edit-location').value;
    portfolioData.contact.github = document.getElementById('edit-github').value;
    portfolioData.contact.linkedin = document.getElementById('edit-linkedin').value;

    // Sync dynamic project blocks
    const projects = [];
    document.querySelectorAll('#editor-projects-list .editor-item').forEach((item, index) => {
        const name = item.querySelector('.project-name').value;
        const status = item.querySelector('.project-status').value;
        const desc = item.querySelector('.project-desc').value;
        const tagsVal = item.querySelector('.project-tags').value;
        const tags = tagsVal.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

        const github = item.querySelector('.project-github').value;
        const demo = item.querySelector('.project-demo').value;
        const timeline = item.querySelector('.project-timeline').value;
        const casestudy = item.querySelector('.project-casestudy').value;
        const problem = item.querySelector('.project-problem').value;
        const solution = item.querySelector('.project-solution').value;

        // Retrieve existing image or use updated preview image src (handles base64 uploads)
        const existingProject = (portfolioData.projects && portfolioData.projects[index]) || {};
        const image = existingProject.image || '';
        const gallery = existingProject.gallery || [image];

        projects.push({ name, status, desc, tags, demo, github, casestudy, timeline, problem, solution, image, gallery });
    });
    portfolioData.projects = projects;

    // Sync dynamic publication blocks
    const publications = [];
    document.querySelectorAll('#editor-publications-list .editor-item').forEach((item, index) => {
        const title = item.querySelector('.publication-title').value;
        const isbn = item.querySelector('.publication-isbn').value;
        const desc = item.querySelector('.publication-desc').value;
        const buyLink = item.querySelector('.publication-buylink').value;
        const pdfInput = item.querySelector('.publication-pdf').value;
        const statusInput = item.querySelector('.publication-status') ? item.querySelector('.publication-status').value : '';

        const existingPub = (portfolioData.publications && portfolioData.publications[index]) || {};
        const cover = existingPub.cover || '';
        const preview = existingPub.preview || '';
        const status = statusInput || existingPub.status || '';
        const pdf = pdfInput || existingPub.pdf || existingPub['book pdf'] || '';

        publications.push({ title, isbn, desc, status, buyLink, pdf, "book pdf": pdf, cover, preview });
    });
    portfolioData.publications = publications;

    // Sync dynamic journey milestones (Standardized to .experience)
    const experience = [];
    document.querySelectorAll('#editor-journey-list .editor-item').forEach(item => {
        const date = item.querySelector('.journey-date').value;
        const title = item.querySelector('.journey-title').value;
        const institution = item.querySelector('.journey-institution').value;
        const desc = item.querySelector('.journey-desc').value;

        experience.push({ date, title, institution, desc });
    });
    portfolioData.experience = experience;
}

// Render Project editing inputs with move up/down superpowers
function renderProjectsEditor(projects) {
    const listContainer = document.getElementById('editor-projects-list');
    if (!listContainer) return;

    if (!projects || projects.length === 0) {
        listContainer.innerHTML = `
            <div class="text-xs text-zinc-500 italic p-4 text-center border border-zinc-800/40 rounded-xl bg-zinc-950/20">
                No projects added yet. Click "+ Add Project" to start.
            </div>`;
        return;
    }

    listContainer.innerHTML = '';
    projects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = "editor-item rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3 relative";
        item.setAttribute('data-index', index);

        item.innerHTML = `
            <div class="absolute top-4 right-12 flex items-center gap-2 text-zinc-500">
                <button type="button" class="btn-move-up hover:text-white transition disabled:opacity-20 disabled:hover:text-zinc-500 text-xs p-1" title="Move Up" ${index === 0 ? 'disabled' : ''}>
                    ▲
                </button>
                <button type="button" class="btn-move-down hover:text-white transition disabled:opacity-20 disabled:hover:text-zinc-500 text-xs p-1" title="Move Down" ${index === projects.length - 1 ? 'disabled' : ''}>
                    ▼
                </button>
            </div>
            <button type="button" class="btn-delete-project absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition" title="Delete Project">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Project Name</label>
                    <input type="text" class="form-input project-name text-xs text-zinc-300" value="${project.name || ''}" placeholder="e.g. Buds">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Status / Badge</label>
                    <input type="text" class="form-input project-status text-xs text-zinc-300" value="${project.status || ''}" placeholder="e.g. Active">
                </div>
            </div>
            <div class="space-y-1">
                <label class="text-[10px] font-semibold text-zinc-500 uppercase">Description</label>
                <textarea class="form-textarea project-desc text-xs text-zinc-300" rows="2" placeholder="Describe your project...">${project.desc || ''}</textarea>
            </div>
            <div class="space-y-1">
                <label class="text-[10px] font-semibold text-zinc-500 uppercase">Tags (comma-separated)</label>
                <input type="text" class="form-input project-tags text-xs text-zinc-300" value="${project.tags ? project.tags.join(', ') : ''}" placeholder="Android, Gemini, Kotlin">
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">GitHub Repo URL</label>
                    <input type="text" class="form-input project-github text-xs text-zinc-300" value="${project.github || ''}" placeholder="https://github.com/...">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Live Demo URL</label>
                    <input type="text" class="form-input project-demo text-xs text-zinc-300" value="${project.demo || ''}" placeholder="https://...">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Timeline / Duration</label>
                    <input type="text" class="form-input project-timeline text-xs text-zinc-300" value="${project.timeline || ''}" placeholder="e.g. June 2026 (4 Weeks)">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Case Study Markdown Path</label>
                    <input type="text" class="form-input project-casestudy text-xs text-zinc-300" value="${project.casestudy || ''}" placeholder="content/projects/buds.md">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">The Problem</label>
                    <textarea class="form-textarea project-problem text-xs text-zinc-300" rows="2" placeholder="Explain the problem...">${project.problem || ''}</textarea>
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">The Solution</label>
                    <textarea class="form-textarea project-solution text-xs text-zinc-300" rows="2" placeholder="Explain the solution...">${project.solution || ''}</textarea>
                </div>
            </div>
            
            <!-- Project Screenshot Uploader -->
            <div class="space-y-1 border border-zinc-800 bg-zinc-900/10 p-3 rounded-lg flex flex-col items-center gap-2">
                <label class="text-[10px] font-semibold text-zinc-500 uppercase self-start">Project Screenshot</label>
                <div class="w-full max-w-[200px] aspect-video border border-zinc-800 bg-zinc-950 rounded overflow-hidden flex items-center justify-center">
                    <img class="project-screenshot-preview w-full h-full object-cover ${project.image ? '' : 'hidden'}" src="${project.image || ''}">
                    <span class="project-screenshot-placeholder text-xs text-zinc-600 ${project.image ? 'hidden' : ''}">No Image Uploaded</span>
                </div>
                <input type="file" accept="image/*" class="project-screenshot-file text-xs text-zinc-500" data-project-idx="${index}">
            </div>
        `;

        // Bind delete
        item.querySelector('.btn-delete-project').addEventListener('click', () => {
            syncEditorInputsToState();
            portfolioData.projects.splice(index, 1);
            renderProjectsEditor(portfolioData.projects);
        });

        // Bind reordering
        item.querySelector('.btn-move-up')?.addEventListener('click', () => {
            syncEditorInputsToState();
            if (index > 0) {
                const temp = portfolioData.projects[index];
                portfolioData.projects[index] = portfolioData.projects[index - 1];
                portfolioData.projects[index - 1] = temp;
                renderProjectsEditor(portfolioData.projects);
            }
        });

        item.querySelector('.btn-move-down')?.addEventListener('click', () => {
            syncEditorInputsToState();
            if (index < portfolioData.projects.length - 1) {
                const temp = portfolioData.projects[index];
                portfolioData.projects[index] = portfolioData.projects[index + 1];
                portfolioData.projects[index + 1] = temp;
                renderProjectsEditor(portfolioData.projects);
            }
        });

        // Bind Image Upload file reader
        item.querySelector('.project-screenshot-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    item.querySelector('.project-screenshot-preview').src = dataUrl;
                    item.querySelector('.project-screenshot-preview').classList.remove('hidden');
                    item.querySelector('.project-screenshot-placeholder').classList.add('hidden');
                    if (!portfolioData.projects[index]) portfolioData.projects[index] = {};
                    portfolioData.projects[index].image = dataUrl;
                    if (!portfolioData.projects[index].gallery) {
                        portfolioData.projects[index].gallery = [];
                    }
                    portfolioData.projects[index].gallery[0] = dataUrl; // set primary gallery image too
                };
                reader.readAsDataURL(file);
            }
        });

        listContainer.appendChild(item);
    });
}

// Render Publication editing inputs
function renderPublicationsEditor(publications) {
    const listContainer = document.getElementById('editor-publications-list');
    if (!listContainer) return;

    if (!publications || publications.length === 0) {
        listContainer.innerHTML = `
            <div class="text-xs text-zinc-500 italic p-4 text-center border border-zinc-800/40 rounded-xl bg-zinc-950/20">
                No publications added yet. Click "+ Add Publication" to start.
            </div>`;
        return;
    }

    listContainer.innerHTML = '';
    publications.forEach((pub, index) => {
        const item = document.createElement('div');
        item.className = "editor-item rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3 relative";
        item.setAttribute('data-index', index);

        item.innerHTML = `
            <button type="button" class="btn-delete-publication absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition" title="Delete Publication">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Publication Title</label>
                    <input type="text" class="form-input publication-title text-xs text-zinc-300" value="${pub.title || ''}" placeholder="e.g. Love, and only love">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">ISBN / Meta details</label>
                    <input type="text" class="form-input publication-isbn text-xs text-zinc-300" value="${pub.isbn || ''}" placeholder="e.g. ISBN 978-3-16-148410-0">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Status / Availability</label>
                    <input type="text" class="form-input publication-status text-xs text-zinc-300" value="${pub.status || ''}" placeholder="e.g. published or available via DM">
                </div>
            </div>
            <div class="space-y-1">
                <label class="text-[10px] font-semibold text-zinc-500 uppercase">Short Description</label>
                <textarea class="form-textarea publication-desc text-xs text-zinc-300" rows="2" placeholder="Describe the focus of this book or article...">${pub.desc || ''}</textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Buy / Request Link URL</label>
                    <input type="text" class="form-input publication-buylink text-xs text-zinc-300" value="${pub.buyLink || pub.dmLink || ''}" placeholder="https://linkedin.com/... or store link">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">PDF URL / Drive Link</label>
                    <input type="text" class="form-input publication-pdf text-xs text-zinc-300" value="${pub.pdf || pub['book pdf'] || ''}" placeholder="https://drive.google.com/file/d/...">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <!-- Cover Image -->
                <div class="space-y-1 border border-zinc-800 bg-zinc-900/10 p-3 rounded-lg flex flex-col items-center gap-2">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase self-start">Cover Image</label>
                    <div class="w-16 h-20 border border-zinc-800 bg-zinc-950 rounded overflow-hidden flex items-center justify-center">
                        <img class="publication-cover-preview w-full h-full object-cover ${pub.cover ? '' : 'hidden'}" src="${pub.cover || ''}">
                        <span class="publication-cover-placeholder text-[9px] text-zinc-600 text-center ${pub.cover ? 'hidden' : ''}">No Cover</span>
                    </div>
                    <input type="file" accept="image/*" class="publication-cover-file text-[10px] text-zinc-500" data-pub-idx="${index}">
                </div>
                <!-- Preview Page Image -->
                <div class="space-y-1 border border-zinc-800 bg-zinc-900/10 p-3 rounded-lg flex flex-col items-center gap-2">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase self-start">Poem Preview Page Scan</label>
                    <div class="w-16 h-20 border border-zinc-800 bg-zinc-950 rounded overflow-hidden flex items-center justify-center">
                        <img class="publication-preview-preview w-full h-full object-cover ${pub.preview ? '' : 'hidden'}" src="${pub.preview || ''}">
                        <span class="publication-preview-placeholder text-[9px] text-zinc-600 text-center ${pub.preview ? 'hidden' : ''}">No Preview</span>
                    </div>
                    <input type="file" accept="image/*" class="publication-preview-file text-[10px] text-zinc-500" data-pub-idx="${index}">
                </div>
            </div>
        `;

        item.querySelector('.btn-delete-publication').addEventListener('click', () => {
            syncEditorInputsToState();
            portfolioData.publications.splice(index, 1);
            renderPublicationsEditor(portfolioData.publications);
        });

        // Bind Cover upload
        item.querySelector('.publication-cover-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    item.querySelector('.publication-cover-preview').src = dataUrl;
                    item.querySelector('.publication-cover-preview').classList.remove('hidden');
                    item.querySelector('.publication-cover-placeholder').classList.add('hidden');
                    if (!portfolioData.publications[index]) portfolioData.publications[index] = {};
                    portfolioData.publications[index].cover = dataUrl;
                };
                reader.readAsDataURL(file);
            }
        });

        // Bind Preview upload
        item.querySelector('.publication-preview-file').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    item.querySelector('.publication-preview-preview').src = dataUrl;
                    item.querySelector('.publication-preview-preview').classList.remove('hidden');
                    item.querySelector('.publication-preview-placeholder').classList.add('hidden');
                    if (!portfolioData.publications[index]) portfolioData.publications[index] = {};
                    portfolioData.publications[index].preview = dataUrl;
                };
                reader.readAsDataURL(file);
            }
        });

        listContainer.appendChild(item);
    });
}

// Render Journey timeline editing inputs
function renderJourneyEditor(experience) {
    const listContainer = document.getElementById('editor-journey-list');
    if (!listContainer) return;

    if (!experience || experience.length === 0) {
        listContainer.innerHTML = `
            <div class="text-xs text-zinc-500 italic p-4 text-center border border-zinc-800/40 rounded-xl bg-zinc-950/20">
                No milestones added yet. Click "+ Add Milestone" to start.
            </div>`;
        return;
    }

    listContainer.innerHTML = '';
    experience.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "editor-item rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3 relative";
        div.setAttribute('data-index', index);

        div.innerHTML = `
            <button type="button" class="btn-delete-journey absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition" title="Delete Milestone">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Timeline Date</label>
                    <input type="text" class="form-input journey-date text-xs text-zinc-300" value="${item.date || ''}" placeholder="e.g. July 2026 - Present">
                </div>
                <div class="space-y-1">
                    <label class="text-[10px] font-semibold text-zinc-500 uppercase">Milestone Title</label>
                    <input type="text" class="form-input journey-title text-xs text-zinc-300" value="${item.title || ''}" placeholder="e.g. AI Intern">
                </div>
            </div>
            <div class="space-y-1">
                <label class="text-[10px] font-semibold text-zinc-500 uppercase">Institution / Employer</label>
                <input type="text" class="form-input journey-institution text-xs text-zinc-300" value="${item.institution || ''}" placeholder="e.g. Medi-Caps University">
            </div>
            <div class="space-y-1">
                <label class="text-[10px] font-semibold text-zinc-500 uppercase">Description</label>
                <textarea class="form-textarea journey-desc text-xs text-zinc-300" rows="2" placeholder="Describe achievements, details or highlights...">${item.desc || ''}</textarea>
            </div>
        `;

        div.querySelector('.btn-delete-journey').addEventListener('click', () => {
            syncEditorInputsToState();
            portfolioData.experience.splice(index, 1);
            renderJourneyEditor(portfolioData.experience);
        });

        listContainer.appendChild(div);
    });
}

// Populate Editor form with portfolio state
function populateForm(data) {
    const profile = data.profile || {};
    const contact = data.contact || {};

    const editName = document.getElementById('edit-name');
    const editTitle = document.getElementById('edit-title');
    const editIntro = document.getElementById('edit-intro');
    const editBio = document.getElementById('edit-bio');
    const editSummary = document.getElementById('edit-summary');
    const editEmail = document.getElementById('edit-email');
    const editLocation = document.getElementById('edit-location');
    const editGithub = document.getElementById('edit-github');
    const editLinkedin = document.getElementById('edit-linkedin');

    if (editName) editName.value = profile.name || "";
    if (editTitle) editTitle.value = profile.title || "";
    if (editIntro) editIntro.value = profile.headline || "";
    if (editBio) editBio.value = profile.bio || "";
    if (editSummary) editSummary.value = profile.summary || "";
    if (editEmail) editEmail.value = contact.email || "";
    if (editLocation) editLocation.value = contact.location || "";
    if (editGithub) editGithub.value = contact.github || "";
    if (editLinkedin) editLinkedin.value = contact.linkedin || "";

    // Build visual editors
    renderProjectsEditor(data.projects || []);
    renderPublicationsEditor(data.publications || []);
    renderJourneyEditor(data.experience || []);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dashboard Editor Initialized");

    // Initialize photo upload listeners
    if (typeof initUploads === 'function') {
        initUploads();
    }

    // Load active state from storage or fetch baseline JSON
    const cached = window.portfolioStorage.getPortfolioData();
    if (cached) {
        portfolioData = cached;
        populateForm(portfolioData);
    } else {
        fetchBaselineData();
    }

    function fetchBaselineData() {
        fetch(BASELINE_JSON_PATH)
            .then(res => {
                if (!res.ok) throw new Error("Could not load data/portfolio.json");
                return res.json();
            })
            .then(data => {
                portfolioData = data;
                window.portfolioStorage.savePortfolioData(portfolioData);
                populateForm(portfolioData);
            })
            .catch(err => {
                console.error("Error loading baseline fallback JSON:", err);
            });
    }

    // Add Project listener
    const btnAddProject = document.getElementById('btn-add-project');
    if (btnAddProject) {
        btnAddProject.addEventListener('click', () => {
            syncEditorInputsToState();
            if (!portfolioData.projects) portfolioData.projects = [];
            portfolioData.projects.push({ name: "", status: "Active", desc: "", tags: [] });
            renderProjectsEditor(portfolioData.projects);
        });
    }

    // Add Publication listener
    const btnAddPub = document.getElementById('btn-add-publication');
    if (btnAddPub) {
        btnAddPub.addEventListener('click', () => {
            syncEditorInputsToState();
            if (!portfolioData.publications) portfolioData.publications = [];
            portfolioData.publications.push({ title: "", isbn: "", desc: "" });
            renderPublicationsEditor(portfolioData.publications);
        });
    }

    // Add Journey Milestone listener
    const btnAddJourney = document.getElementById('btn-add-journey');
    if (btnAddJourney) {
        btnAddJourney.addEventListener('click', () => {
            syncEditorInputsToState();
            if (!portfolioData.experience) portfolioData.experience = [];
            portfolioData.experience.push({ date: "", title: "", institution: "", desc: "" });
            renderJourneyEditor(portfolioData.experience);
        });
    }

    // Initialize AI Resume Autofill Handler
    if (typeof initResumeUpload === 'function') {
        initResumeUpload((autofilledData) => {
            portfolioData = autofilledData;

            if (window.portfolioStorage.savePortfolioData(portfolioData)) {
                console.log("Portfolio details auto-saved from resume parsing.");
            } else {
                console.error("Failed to save autofill state.");
            }

            populateForm(portfolioData);

            // Write console feedback line
            const consoleConsole = document.getElementById('terminal-console');
            if (consoleConsole) {
                const successLine = document.createElement('div');
                successLine.className = 'console-line text-emerald-400 font-bold mt-2';
                successLine.textContent = '[SUCCESS] ALL SECTIONS AUTO-FILLED AND SAVED!';
                consoleConsole.appendChild(successLine);
                consoleConsole.scrollTop = consoleConsole.scrollHeight;
            }
        });
    }

    // Save Handlers
    const editForm = document.getElementById('portfolio-edit-form');
    function triggerSave(e) {
        if (e) e.preventDefault();

        syncEditorInputsToState();
        if (window.portfolioStorage.savePortfolioData(portfolioData)) {
            alert("Dashboard details successfully saved!");
        } else {
            alert("Save failed: Storage allocation error.");
        }
    }

    if (editForm) {
        editForm.addEventListener('submit', triggerSave);
    }

    const btnSaveTop = document.getElementById('btn-save-top');
    if (btnSaveTop) {
        btnSaveTop.addEventListener('click', triggerSave);
    }

    // JSON Export Superpower
    const btnExport = document.getElementById('btn-export-json');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            syncEditorInputsToState();
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "portfolio.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        });
    }

    // JSON Import Superpower
    const btnImport = document.getElementById('btn-import-json');
    const fileImport = document.getElementById('import-json-file');
    if (btnImport && fileImport) {
        btnImport.addEventListener('click', () => {
            fileImport.click();
        });

        fileImport.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    if (!importedData.profile || !importedData.contact) {
                        alert("Invalid JSON format: Profile and Contact nodes are required.");
                        return;
                    }
                    portfolioData = importedData;
                    window.portfolioStorage.savePortfolioData(portfolioData);
                    populateForm(portfolioData);
                    alert("Portfolio dashboard imported and synced successfully!");
                } catch (err) {
                    alert("Import failed: Selected file is not a valid JSON structure.");
                }
            };
            reader.readAsText(file);
        });
    }

    // Revert Defaults Handler
    const btnReset = document.getElementById('btn-reset-defaults');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (confirm("Are you sure you want to revert all dashboard settings back to the default baseline profile? Unsaved changes will be lost.")) {
                fetch(BASELINE_JSON_PATH)
                    .then(res => {
                        if (!res.ok) throw new Error("Could not reload baseline portfolio.json");
                        return res.json();
                    })
                    .then(data => {
                        portfolioData = data;
                        window.portfolioStorage.savePortfolioData(portfolioData);
                        populateForm(portfolioData);

                        // Clear terminal console lines
                        const terminalConsole = document.getElementById('terminal-console');
                        if (terminalConsole) {
                            terminalConsole.innerHTML = '<div class="text-zinc-500 italic">Terminal ready. Upload a resume to launch parser...</div><span class="terminal-caret"></span>';
                        }
                        const uploadStatus = document.getElementById('upload-status');
                        if (uploadStatus) {
                            uploadStatus.textContent = "No file selected";
                        }
                        alert("Dashboard reset to defaults!");
                    })
                    .catch(err => {
                        console.error("Baseline reset failed:", err);
                        alert("Revert failed: data/portfolio.json is missing or corrupt.");
                    });
            }
        });
    }
});
