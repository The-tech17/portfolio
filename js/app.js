/**
 * Sanjana's Studio Portfolio - Main Application Public Entrypoint
 * Handles dynamic content rendering from dataLoader, dark/light theme triggers,
 * and the AI-powered search routing and highlighting engine.
 */

// Instant real-time DOM element filtering
function applyRealTimeFiltering(query) {
    const q = query.toLowerCase().trim();

    // 1. Projects tab filtering
    document.querySelectorAll('.project-card').forEach(card => {
        if (!q) {
            card.style.display = '';
            return;
        }
        const text = card.textContent.toLowerCase();
        if (text.includes(q)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    // 2. Core Expertise cards on About tab
    const highlightsContainer = document.getElementById('about-highlights');
    if (highlightsContainer) {
        highlightsContainer.querySelectorAll('div').forEach(card => {
            // Only targets direct child grid elements
            if (card.parentElement === highlightsContainer) {
                if (!q) {
                    card.style.display = '';
                    return;
                }
                const text = card.textContent.toLowerCase();
                if (text.includes(q)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    // 3. Writing cards on Writing tab
    document.querySelectorAll('.writing-card').forEach(card => {
        if (!q) {
            card.style.display = '';
            return;
        }
        const text = card.textContent.toLowerCase();
        if (text.includes(q)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    // 4. Journey timeline items
    document.querySelectorAll('.journey-item').forEach(item => {
        if (!q) {
            item.style.display = '';
            return;
        }
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Interactive search routing matching keywords to sections and items
function initSearchEngine(data) {
    const searchBar = document.getElementById('search-bar');
    if (!searchBar) return;

    let debounceTimer;

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value;

        // 1. Apply instant dynamic filtering on active pages
        applyRealTimeFiltering(query);

        // 2. Debounce matching tab focus behavior
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            handleSearch(query, data);
        }, 500); // 500ms debounce for auto-routing tab shifts
    });
}

function handleSearch(query, data) {
    // Clear previous search highlight styling
    document.querySelectorAll('.search-highlight').forEach(el => {
        el.classList.remove('search-highlight');
    });

    if (!query.trim()) return;

    const q = query.toLowerCase();

    // Matching candidate search metrics
    let bestMatch = null;
    let highestScore = 0;

    // 1. Scan Projects
    (data.projects || []).forEach((proj, idx) => {
        let score = 0;
        if (proj.name && proj.name.toLowerCase().includes(q)) score += 10;
        if (proj.desc && proj.desc.toLowerCase().includes(q)) score += 5;
        if (proj.tags && proj.tags.some(tag => tag.toLowerCase().includes(q))) score += 8;

        // Semantic triggers
        if (q.includes('project') && proj.tags && proj.tags.some(t => t.toLowerCase() === 'android') && q.includes('android')) score += 15;

        if (score > highestScore) {
            highestScore = score;
            bestMatch = { tab: 'projects', elementId: `project-card-${idx}` };
        }
    });

    // 2. Scan Writings / Publications
    (data.publications || []).forEach((pub, idx) => {
        let score = 0;
        if (pub.title && pub.title.toLowerCase().includes(q)) score += 10;
        if (pub.desc && pub.desc.toLowerCase().includes(q)) score += 5;
        if (pub.isbn && pub.isbn.toLowerCase().includes(q)) score += 5;

        if (score > highestScore) {
            highestScore = score;
            bestMatch = { tab: 'writing', elementId: `writing-card-${idx}` };
        }
    });

    // 3. Scan Journey / Experiences
    (data.experience || []).forEach((exp, idx) => {
        let score = 0;
        if (exp.title && exp.title.toLowerCase().includes(q)) score += 10;
        if (exp.institution && exp.institution.toLowerCase().includes(q)) score += 8;
        if (exp.desc && exp.desc.toLowerCase().includes(q)) score += 5;

        // Semantic triggers
        if (q.includes('intern') && exp.title && exp.title.toLowerCase().includes('intern')) score += 15;
        if (q.includes('university') && exp.institution && exp.institution.toLowerCase().includes('university')) score += 15;

        if (score > highestScore) {
            highestScore = score;
            bestMatch = { tab: 'journey', elementId: `journey-item-${idx}` };
        }
    });

    // 4. Scan Profile Basics
    const profile = data.profile || {};
    let profileScore = 0;
    if (profile.bio && profile.bio.toLowerCase().includes(q)) profileScore += 3;
    if (profile.summary && profile.summary.toLowerCase().includes(q)) profileScore += 3;
    if (data.skills && data.skills.some(skill => skill.toLowerCase().includes(q))) profileScore += 6;

    if (profileScore > highestScore) {
        highestScore = profileScore;
        bestMatch = { tab: 'about', elementId: 'about-bio' };
    }

    // 5. Scan Contact
    const contact = data.contact || {};
    let contactScore = 0;
    if (contact.email && contact.email.toLowerCase().includes(q)) contactScore += 5;
    if (contact.location && contact.location.toLowerCase().includes(q)) contactScore += 5;

    if (contactScore > highestScore) {
        highestScore = contactScore;
        bestMatch = { tab: 'contact', elementId: 'contact-container' };
    }

    // Route search intent to correct layout
    if (bestMatch && highestScore > 0) {
        const tabBtn = document.querySelector(`.tab-button[data-tab="${bestMatch.tab}"]`);
        if (tabBtn) {
            // Trigger tab switch
            tabBtn.click();

            // Smooth scroll to the matched element and trigger spotlight pulse
            setTimeout(() => {
                const element = document.getElementById(bestMatch.elementId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('search-highlight');
                }
            }, 300); // synchronizes with CSS fade-in tab transitions
        }
    }
}

// Document Bootstrap
document.addEventListener('DOMContentLoaded', () => {
    console.log("Headless Portfolio Engine Initialized");

    // Load dynamic schema data using dataLoader.js
    if (window.portfolioLoader) {
        window.portfolioLoader.load()
            .then(data => {
                // Render modular layout using window.portfolioRenderer
                if (window.portfolioRenderer) {
                    window.portfolioRenderer.renderPortfolio(data);
                } else {
                    console.error("renderer.js missing or loaded out of order.");
                }
                
                // Initialize tabs after DOM elements are created
                if (typeof window.initTabs === 'function') {
                    window.initTabs();
                }

                // Activate search engine matcher
                initSearchEngine(data);
            })
            .catch(err => {
                console.error("Bootstrapping data load error:", err);
            });
    } else {
        console.error("dataLoader.js missing or loaded out of order.");
    }
});