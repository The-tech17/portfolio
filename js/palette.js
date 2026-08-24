/**
 * palette.js - Command Palette Module
 * Handles opening/closing, dynamic action lists, search, filtering, and keyboard navigation.
 */
(function() {
    let paletteModal = null;
    let searchInput = null;
    let listContainer = null;
    let isOpen = false;
    let selectedIndex = 0;
    let currentFiltered = [];

    // Core static commands
    const staticCommands = [
        { name: 'Navigate: About Me', category: 'Navigation', action: () => switchTab('about') },
        { name: 'Navigate: AI Projects', category: 'Navigation', action: () => switchTab('projects') },
        { name: 'Navigate: Writing & Publications', category: 'Navigation', action: () => switchTab('writing') },
        { name: 'Navigate: Journey Timeline', category: 'Navigation', action: () => switchTab('journey') },
        { name: 'Navigate: Contact Info', category: 'Navigation', action: () => switchTab('contact') },
        { name: 'Action: Toggle Light/Dark Theme', category: 'Action', action: () => triggerThemeToggle() },
        { name: 'Action: Download Resume', category: 'Action', action: () => triggerResumeDownload() }
    ];

    let dynamicCommands = [];

    function switchTab(tabId) {
        const btn = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        if (btn) btn.click();
    }

    function scrollToAndHighlight(elementId) {
        document.querySelectorAll('.search-highlight').forEach(el => el.classList.remove('search-highlight'));
        const el = document.getElementById(elementId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('search-highlight');
        }
    }

    function triggerThemeToggle() {
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.click();
    }

    function triggerResumeDownload() {
        const link = document.getElementById('profile-resume-link');
        if (link) link.click();
    }

    function show() {
        if (!paletteModal) initDOM();
        paletteModal.classList.remove('hidden');
        searchInput.value = '';
        searchInput.focus();
        isOpen = true;
        selectedIndex = 0;
        filterCommands('');
    }

    function hide() {
        if (!paletteModal) return;
        paletteModal.classList.add('hidden');
        isOpen = false;
    }

    function toggle() {
        if (isOpen) hide();
        else show();
    }

    function filterCommands(query) {
        const q = query.toLowerCase().trim();
        const all = [...staticCommands, ...dynamicCommands];
        if (!q) {
            currentFiltered = all;
        } else {
            currentFiltered = all.filter(cmd => 
                cmd.name.toLowerCase().includes(q) || 
                cmd.category.toLowerCase().includes(q)
            );
        }
        selectedIndex = 0;
        renderList();
    }

    function renderList() {
        if (!listContainer) return;
        listContainer.innerHTML = '';

        if (currentFiltered.length === 0) {
            listContainer.innerHTML = `
                <div class="text-xs text-zinc-600 italic p-4 text-center">
                    No matching commands found.
                </div>`;
            return;
        }

        currentFiltered.forEach((cmd, idx) => {
            const item = document.createElement('div');
            const isActive = idx === selectedIndex;
            item.className = `flex justify-between items-center px-4 py-2.5 rounded-lg text-xs cursor-pointer transition ${
                isActive 
                    ? 'bg-zinc-800 text-white font-medium' 
                    : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
            }`;

            item.innerHTML = `
                <span>${cmd.name}</span>
                <span class="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                    isActive ? 'bg-zinc-700 text-zinc-200' : 'bg-zinc-900 text-zinc-500'
                }">${cmd.category}</span>
            `;

            item.addEventListener('click', () => {
                cmd.action();
                hide();
            });

            listContainer.appendChild(item);
        });

        // Ensure active item is scrolled into view inside container
        const activeEl = listContainer.children[selectedIndex];
        if (activeEl) {
            activeEl.scrollIntoView({ block: 'nearest' });
        }
    }

    function handleKeyDown(e) {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            hide();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % currentFiltered.length;
            renderList();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + currentFiltered.length) % currentFiltered.length;
            renderList();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFiltered[selectedIndex]) {
                currentFiltered[selectedIndex].action();
                hide();
            }
        }
    }

    function initDOM() {
        paletteModal = document.getElementById('command-palette');
        searchInput = document.getElementById('command-search');
        listContainer = document.getElementById('command-list');

        if (!paletteModal) return;

        // Dismiss modal on background click
        paletteModal.addEventListener('click', (e) => {
            if (e.target === paletteModal) hide();
        });

        searchInput.addEventListener('input', (e) => {
            filterCommands(e.target.value);
        });

        searchInput.addEventListener('keydown', handleKeyDown);
    }

    // Set dynamic indexed values once loading completes
    function setDynamicPortfolioData(data) {
        dynamicCommands = [];
        if (data.projects) {
            data.projects.forEach((proj, idx) => {
                dynamicCommands.push({
                    name: `Project: ${proj.name} — ${proj.desc.slice(0, 50)}...`,
                    category: 'Projects',
                    action: () => {
                        switchTab('projects');
                        setTimeout(() => {
                            scrollToAndHighlight(`project-card-${idx}`);
                        }, 350);
                    }
                });
            });
        }
        if (data.publications) {
            data.publications.forEach((pub, idx) => {
                dynamicCommands.push({
                    name: `Writing: "${pub.title}"`,
                    category: 'Writing',
                    action: () => {
                        switchTab('writing');
                        setTimeout(() => {
                            scrollToAndHighlight(`writing-card-${idx}`);
                        }, 350);
                    }
                });
            });
        }
        if (data.experience) {
            data.experience.forEach((exp, idx) => {
                dynamicCommands.push({
                    name: `Timeline: ${exp.title} at ${exp.institution || ''}`,
                    category: 'Journey',
                    action: () => {
                        switchTab('journey');
                        setTimeout(() => {
                            scrollToAndHighlight(`journey-item-${idx}`);
                        }, 350);
                    }
                });
            });
        }
    }

    // Bind Ctrl+K listener globally
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (!paletteModal) initDOM();
            toggle();
        }
    });

    // Expose APIs
    window.portfolioPalette = {
        show,
        hide,
        toggle,
        setDynamicPortfolioData
    };
})();
