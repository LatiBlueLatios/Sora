/**
 * A class for managing and emitting events.
 */
class SoulDew {
    #listeners = new Map();
    #wildcardListeners = [];
    #isCancelled = false;

    /**
     * Adds an event listener.
     * @param {string} event - The name of the event to listen for.
     * @param {function} listener - The callback function to execute when the event is emitted.
     * @param {boolean} [once=false] - If true, the listener will be automatically removed after being invoked once.
     * @throws {Error} If event is not a string or listener is not a function.
     */
    on(event, listener, once = false) {
        if (typeof event !== "string" || typeof listener !== "function") throw new Error("Invalid arguments");
        const eventObj = { listener, once: once ? 1 : 0 };

        if (event === "*") {
            this.#wildcardListeners.push(eventObj);
        } else {
            if (!this.#listeners.has(event)) {
                this.#listeners.set(event, []);
            }
            this.#listeners.get(event).push(eventObj);
        }
    }

    /**
     * Removes an event listener.
     * @param {string} event - The name of the event to remove the listener from.
     * @param {function} listener - The callback function to remove.
     * @throws {Error} If event is not a string or listener is not a function.
     */
    off(event, listener) {
        if (typeof event !== "string" || typeof listener !== "function") throw new Error("Invalid arguments");

        if (event === "*") {
            this.#wildcardListeners = this.#wildcardListeners.filter(e => e.listener !== listener);
            return;
        }
        if (this.#listeners.has(event)) {
            this.#listeners.set(event, this.#listeners.get(event).filter(e => e.listener !== listener));
            if (this.#listeners.get(event).length === 0) {
                this.#listeners.delete(event);
            }
        }
    }

    /**
     * Emits an event, calling all listeners registered for that event.
     * @param {string} event - The name of the event to emit.
     * @param {...*} rest - Additional arguments to pass to the event listeners.
     * @returns {boolean} False if the event was cancelled, true otherwise.
     * @throws {Error} If event is not a string.
     */
    emit(event, ...rest) {
        if (typeof event !== "string") throw new Error("Invalid arguments");
        
        this.#isCancelled = false;

        if (this.#listeners.has(event)) {
            const listeners = this.#listeners.get(event);
            this.#listeners.set(event, this.#callListeners(listeners, ...rest));
            if (this.#isCancelled) return false;
        } else {
            console.warn(`Event ${event} has no listener!`);
            return true;
        }

        this.#wildcardListeners = this.#callListeners(this.#wildcardListeners, ...rest);
        return !this.#isCancelled;
    }

    /**
     * Internal method to call listeners and manage their lifecycle.
     * @param {Array} listeners - Array of listener objects.
     * @param {...*} rest - Arguments to pass to each listener.
     * @returns {Array} Array of remaining listeners.
     * @private
     */
    #callListeners(listeners, ...rest) {
        const remainingListeners = [];

        for (const event of listeners) {
            event.listener(...rest);
            if (this.#isCancelled) break;
            if (event.once === 0) {
                remainingListeners.push(event);
            }
        }
        return remainingListeners;
    }

    /**
     * Cancels the current event emission.
     * This method should be called within an event listener to stop further processing of the current event.
     */
    cancel() {
        this.#isCancelled = true;
    }
}

export default SoulDew;