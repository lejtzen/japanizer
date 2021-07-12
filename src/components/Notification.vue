<template>
    <div class="notification">
        <div class="content">{{ notification.text }}</div>
        <button @click="close()"><XIcon /></button>
    </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'

export default {
    components: {
        XIcon,
    },

    props: {
        notification: {
            type: Object,
            required: true,
        },
    },

    methods: {
        close() {
            this.$emit('close', this.notification.id)
        },
    },
}
</script>
