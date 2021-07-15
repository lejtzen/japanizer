<template>
    <div>
        <router-view />
        <div v-if="notifications.length" class="notifications">
            <Notification
                v-for="notification in notifications"
                :key="notification.id"
                :notification="notification"
                @close="deleteNotification"
            />
        </div>
    </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import EventBus from '@/utils/events.js'
import Notification from '@/components/Notification.vue'

export default {
    components: {
        Notification,
    },

    metaInfo() {
        const metaInfo = { meta: [] }
        const { siteName, siteDescription } = this.$static.metadata

        if (siteName) {
            metaInfo.title = siteName
        }

        if (siteDescription) {
            metaInfo.meta.push({
                key: 'description',
                name: 'description',
                content: siteDescription,
            })
        }

        return metaInfo
    },

    data() {
        return {
            notifications: [],
        }
    },

    mounted() {
        EventBus.$on('notify', (text) => {
            const notification = {
                id: Math.random(),
                text: text,
            }

            this.notifications.push(notification)
            setTimeout(() => this.deleteNotification(notification.id), 1500)
        })
    },

    methods: {
        deleteNotification(id) {
            this.notifications = this.notifications.filter(
                (notification) => notification.id !== id,
            )
        },
    },
}
</script>
