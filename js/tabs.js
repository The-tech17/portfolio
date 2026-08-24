/**
 * Tabs Module - Sanjana's Studio Portfolio
 * Handles modular tab switching, active class toggling, keyboard navigation,
 * accessibility properties (ARIA), and the animated sliding underline indicator.
 */

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabIndicator = document.getElementById('tab-indicator');
    const tabList = document.querySelector('[role="tablist"]');

    if (!tabButtons.length) return;

    /**
     * Updates the position and width of the animated underline indicator.
     */
    function updateIndicator(activeButton) {
        if (!activeButton || !tabIndicator) return;
        
        // Use offsetWidth and offsetLeft relative to the scrollable container
        tabIndicator.style.width = `${activeButton.offsetWidth}px`;
        tabIndicator.style.left = `${activeButton.offsetLeft}px`;
    }

    /**
     * Switch active tab to the specified button element.
     */
    function switchTab(button) {
        const targetTabId = button.getAttribute('data-tab');

        // Update button states
        tabButtons.forEach(btn => {
            if (btn === button) {
                btn.classList.add('active', 'text-white', 'font-medium');
                btn.classList.remove('text-zinc-400');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active', 'text-white', 'font-medium');
                btn.classList.add('text-zinc-400');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        // Update sliding underline
        updateIndicator(button);

        // Toggle sections with transitions
        tabContents.forEach(content => {
            if (content.id === targetTabId) {
                content.classList.remove('hidden');
                // Re-trigger the fade-in animation by removing and adding the class
                content.classList.remove('animate-fade-in');
                void content.offsetWidth; // Force reflow
                content.classList.add('animate-fade-in');
            } else {
                content.classList.add('hidden');
                content.classList.remove('animate-fade-in');
            }
        });

        console.log(`Tab switched to: ${targetTabId}`);
    }

    // Set initial indicator position
    const initialActive = document.querySelector('.tab-button.active');
    if (initialActive) {
        // Short delay to ensure browser layout is calculated and custom fonts are loaded
        setTimeout(() => updateIndicator(initialActive), 150);
    }

    // Set up click event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button);
        });
    });

    // Keyboard navigation within the tablist (WAI-ARIA Pattern)
    if (tabList) {
        tabList.addEventListener('keydown', (e) => {
            const activeBtn = document.activeElement;
            if (!activeBtn || !activeBtn.classList.contains('tab-button')) return;

            const buttons = Array.from(tabButtons);
            const currentIndex = buttons.indexOf(activeBtn);
            if (currentIndex === -1) return;

            let nextIndex = currentIndex;

            switch (e.key) {
                case 'ArrowRight':
                    nextIndex = (currentIndex + 1) % buttons.length;
                    break;
                case 'ArrowLeft':
                    nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                    break;
                case 'Home':
                    nextIndex = 0;
                    break;
                case 'End':
                    nextIndex = buttons.length - 1;
                    break;
                default:
                    return; // Let other keys proceed
            }

            e.preventDefault();
            buttons[nextIndex].focus();
            switchTab(buttons[nextIndex]);
        });
    }

    // Adjust indicator on screen resize
    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab) {
            updateIndicator(activeTab);
        }
    });
}

// Expose to global window scope for modular access in app.js
window.initTabs = initTabs;
