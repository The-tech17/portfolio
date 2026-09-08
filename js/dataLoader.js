/**
 * dataLoader.js - Headless Portfolio Data Loader
 * Responsibility: Load JSON, parse it, and return the data object.
 * Checks storage first for user edits, falling back to data/portfolio.json.
 */
const portfolioLoader = {
    async load(jsonPath = 'data/portfolio.json') {
        try {
            // Append cache buster to ensure updates to portfolio.json are fetched immediately
            const cacheBuster = `?t=${Date.now()}`;
            const response = await fetch(`${jsonPath}${cacheBuster}`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Cache in localStorage via portfolioStorage for offline resilience
            if (window.portfolioStorage && typeof window.portfolioStorage.savePortfolioData === 'function') {
                window.portfolioStorage.savePortfolioData(data);
            }
            return data;
        } catch (error) {
            console.warn("dataLoader network fetch failed, checking local cache fallback:", error);
            if (window.portfolioStorage && typeof window.portfolioStorage.getPortfolioData === 'function') {
                const cached = window.portfolioStorage.getPortfolioData();
                if (cached) {
                    return cached;
                }
            }
            console.error("dataLoader failed to load portfolio JSON:", error);
            throw error;
        }
    }
};

window.portfolioLoader = portfolioLoader;
