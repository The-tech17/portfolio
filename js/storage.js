/**
 * storage.js - LocalStorage Wrapper Layer
 * Handles loading, saving, and removing data to/from localStorage.
 */
const portfolioStorage = {
    get(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.error(`Error reading key "${key}" from localStorage:`, e);
            return null;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (e) {
            console.error(`Error writing key "${key}" to localStorage:`, e);
            return false;
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error(`Error removing key "${key}" from localStorage:`, e);
            return false;
        }
    },
    getPortfolioData() {
        const data = this.get('portfolio-data');
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error("Corrupted cached portfolio-data. Cleared local cache.", e);
                this.remove('portfolio-data');
            }
        }
        return null;
    },
    savePortfolioData(data) {
        return this.set('portfolio-data', JSON.stringify(data));
    },
    clearPortfolioData() {
        return this.remove('portfolio-data');
    },
    getProfileImage() {
        return this.get('profile-image-data');
    },
    saveProfileImage(dataUrl) {
        return this.set('profile-image-data', dataUrl);
    }
};

window.portfolioStorage = portfolioStorage;
