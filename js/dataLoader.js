/**
 * dataLoader.js - Headless Portfolio Data Loader
 * Responsibility: Load JSON, parse it, and return the data object.
 * Checks storage first for user edits, falling back to data/portfolio.json.
 */
const portfolioLoader = {
    async load(jsonPath = 'data/portfolio.json') {
        const cached = window.portfolioStorage.getPortfolioData();
        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Cache in localStorage via portfolioStorage
            window.portfolioStorage.savePortfolioData(data);
            return data;
        } catch (error) {
            console.error("dataLoader failed to load portfolio JSON:", error);
            throw error;
        }
    }
};

window.portfolioLoader = portfolioLoader;
