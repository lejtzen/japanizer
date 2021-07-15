import Vue from 'vue'

const EventBus = new Vue()

export default EventBus

export const notify = (text) => {
    EventBus.$emit('notify', text)
}
