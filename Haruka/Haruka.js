class Haruka {
    #templateName;
    element = null;
    state = {};
    #initPromise = null;
    #isInitialized = false;

    constructor(templateName) {
        this.#templateName = templateName;
        this.init();
    }

    init() {
        if (!this.#initPromise) {
            this.#initPromise = this.#initializeComponent().then(() => {
                this.#isInitialized = true;
                 // Clear the promise to free memory
                this.#initPromise = null;
            }).catch(error => {
                this.handleError(error);
                // Re-throw to keep the promise rejected
                throw error;
            });
        }

        return this.#initPromise;
    }

    async #initializeComponent() {
        const template = await this.fetchTemplate();
        this.element = this.createHTMLElement(template);
        this.render();
        this.onMount();
    }

    handleError(error) {
        // Override this method in child classes for custom error handling
        console.error("Haruka Error:", error);
    }

    onMount() {
        // Override this method in child classes for post-initialization logic
        this.handleError(new Error("onMount method must be implemented"));
    }

    async fetchTemplate() {
        const response = await fetch(`components/templates/${this.#templateName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to fetch template: ${this.#templateName}`);
        }
        return await response.text();
    }

    createHTMLElement(template) {
        const wrapperDiv = document.createElement("div");
        wrapperDiv.innerHTML = template.trim();
        return wrapperDiv.firstElementChild;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    getState() {
        return { ...this.state };
    }

    hydrate() {
        if (this.element) {
            const actionElements = this.element.querySelectorAll("[data-action]");
            actionElements.forEach(el => {
                const action = el.dataset.action;
                const eventType = el.dataset.event || "click";
                el.addEventListener(eventType, (e) => {
                    if (typeof this[action] === "function") {
                        this[action](e);
                    }
                });
            });
        }
    }    

    setCSSProperty(property, value) {
        if (this.element) {
            this.element.style.setProperty(property, value);
        }
    }

    getCSSProperty(property) {
        return this.element ? this.element.style.getPropertyValue(property) : null;
    }

    render() {
        // Override this method in child classes to update the DOM based on the state
        this.handleError(new Error("render method must be implemented"));
    }

    async append(target) {
        await this.init();

        if (this.element) {
            target.appendChild(this.element);
        } else {
            console.warn("Element not yet initialized. Please wait for init to complete.");
        }
    }

    async appendTo(selector) {
        if (typeof selector !== "string") {
            this.handleError(new Error("selector must be a string"));
            return;
        }

        await this.init();

        const target = document.querySelector(selector);
        if (target) {
            if (this.element) {
                target.appendChild(this.element);
            } else {
                console.warn("Element not yet initialized. Please wait for init to complete.");
            }
        } else {
            console.error(`Target element with selector "${selector}" not found.`);
        }
    }

    show() {
        this.element.style.display = "block";
    }

    hide() {
        this.element.style.display = "none";
    }

    isVisible() {
        if (!this.element) return false;
        
        const style = getComputedStyle(this.element);
        return style.display !== "none" &&
               style.visibility !== "hidden" &&
               style.opacity !== "0" &&
               this.element.offsetParent !== null;
    }

    destroy() {
        if (this.element) {
            this.element.querySelectorAll("[data-action]").forEach(el => {
                const eventType = el.dataset.event || "click";
                el.removeEventListener(eventType, this[el.dataset.action]);
            });

            this.remove();
    
            // Clear any timers or cancel any ongoing asynchronous operations
            // (You would need to track these in your component)
            this.clearTimers();
    
            // Clear any references that might prevent garbage collection
            this.element = null;
            this.state = null;
        }
    }
    
    clearTimers() {
        // Implement this in child classes if needed
    }    

    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    insertBefore(referenceNode) {
        if (this.element && referenceNode && referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.element, referenceNode);
        }
    }
    
    replace(oldNode) {
        if (this.element && oldNode && oldNode.parentNode) {
            oldNode.parentNode.replaceChild(this.element, oldNode);
        }
    }
    
    addClass(className) {
        if (this.element) {
            this.element.classList.add(className);
        }
    }
    
    removeClass(className) {
        if (this.element) {
            this.element.classList.remove(className);
        }
    }
    
    toggleClass(className) {
        if (this.element) {
            this.element.classList.toggle(className);
        }
    }    
}

export default Haruka;