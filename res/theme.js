"use strict";

/**
 * Theme Manager
 * @class
 * @property {object} settings - Array of User Settings
 * @property {array}  styles   - Array of Style Keys
 * @property {object} storage  - LocalStorage
 * @author Dean Wagner <info@deanwagner.net>
 */
class Theme {

    // Class Properties
    settings = {};
    styles   = [
        'color-accent',
        'color-text',
        'color-bg',
        'color-dark',
        'color-light',
        'color-scheme'
    ];

    /**
     * Constructor
     * @constructor
     * @param {object} modal - Modal Module
     */
    constructor(modal) {

        // Class Properties
        this.storage = window.localStorage;
        this.modal   = modal;

        // Load Settings
        if (this.storage.hasOwnProperty('settings')) {
            // Load from LocalStorage
            this.settings = JSON.parse(this.storage.getItem('settings'));
            this.styles.forEach((index) => {
                // Set Value in Stylesheet
                this.setStyleProperty(index, this.settings[index]);
            });
        } else {
            // Build {settings} from [styles] and CSS
            this.styles.forEach((index) => {
                // Get Value from Stylesheet
                this.settings[index] = this.getStyleProperty(index);
            });
        }

        // Populate Settings Modal Form
        for (let index in this.settings) {
            // Get Matching Input
            const input = document.getElementById(index);

            // Update Input Value from {settings}
            input.value = this.settings[index];

            // Add Event Listener to Settings Form
            input.addEventListener('input', (e) => {
                this.setStyleProperty(index, e.target.value);
            });
        }

        // Open Settings Modal
        document.getElementById('settings_link').addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.open('modal_settings');
        });

        // Settings Reset Button
        document.getElementById('settings-reset').addEventListener('click', (e) => {
            e.preventDefault();
            this.resetSettings();
        });

        // Settings Save Button
        document.getElementById('settings-save').addEventListener('click', (e) => {
            e.preventDefault();

            // Update Settings
            for (let index in this.settings) {
                // Get Matching Input
                const input = document.getElementById(index);

                // Update Input Value from {settings}
                this.settings[index] = input.value;
            }

            this.storage.setItem('settings', JSON.stringify(this.settings));
            this.modal.close('modal_settings');
        });
    }

    /**
     * Get CSS Property
     * @param   {string} prop - Property
     * @returns {string} - Value
     */
    getStyleProperty(prop) {
        const property = (prop === 'color-scheme') ? prop : '--' + prop;
        return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
    }

    /**
     * Set CSS Property
     * @param {string} prop  - Property
     * @param {string} value - Value
     */
    setStyleProperty(prop, value) {
        const property = (prop === 'color-scheme') ? prop : '--' + prop;
        document.documentElement.style.setProperty(property, value);
    }

    /**
     * Reset Settings to Last Save
     */
    resetSettings() {
        this.styles.forEach((index) => {
            this.setStyleProperty(index, this.settings[index]);
            document.getElementById(index).value = this.settings[index];
        });
    }
}

export default Theme;