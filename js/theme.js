/**
 * theme.js - Theme Controller
 * Handles toggling between light and dark modes, saving settings in localStorage.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Select by ID or default to the header button
    const themeBtn = document.getElementById('theme-toggle') || document.querySelector('header button');
    const htmlEl = document.documentElement;

    if (!themeBtn) return;

    // Apply saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        htmlEl.classList.remove('dark');
        htmlEl.classList.add('light');
        updateButtonText(themeBtn, 'light');
    } else {
        htmlEl.classList.add('dark');
        htmlEl.classList.remove('light');
        updateButtonText(themeBtn, 'dark');
    }

    // Toggle theme on click
    themeBtn.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.remove('dark');
            htmlEl.classList.add('light');
            localStorage.setItem('portfolio-theme', 'light');
            updateButtonText(themeBtn, 'light');
        } else {
            htmlEl.classList.remove('light');
            htmlEl.classList.add('dark');
            localStorage.setItem('portfolio-theme', 'dark');
            updateButtonText(themeBtn, 'dark');
        }
    });

    function updateButtonText(btn, theme) {
        if (theme === 'light') {
            btn.innerHTML = 'Studio ○ Photo ☀️';
        } else {
            btn.innerHTML = 'Studio ○ Photo 🌙';
        }
    }
});
