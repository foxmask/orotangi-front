// Create a global Event Bus
import Vue from 'vue';
export const EventBus = new Vue();

// Add to Vue properties by exposing a getter for $bus
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus;
        }
    }
})