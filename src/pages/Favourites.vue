<template>
    <Layout title="Favourites">
        <Entry
            v-for="entry in favourites"
            :key="entry"
            :input="entry"
            @remove="remove"
        />

        <div class="muted" v-if="!favourites.length">
            <p>
                You have not saved any translations yet. Click on the
                <HeartIcon size="1x" /> when Japanizing.
            </p>
        </div>
    </Layout>
</template>

<script>
import Entry from '@/components/Entry.vue'
import { HeartIcon } from 'vue-feather-icons'

export default {
    components: {
        Entry,
        HeartIcon,
    },

    metaInfo: {
        title: 'Favourites — Japanizer',
        meta: [
            {
                name: 'description',
                content: 'Your saved favourites.',
            },
        ],
    },

    data() {
        return {
            favourites: [],
        }
    },

    watch: {
        favourites(favourites) {
            window.localStorage.setItem(
                'favourites',
                JSON.stringify(favourites),
            )
        },
    },

    mounted() {
        this.favourites =
            JSON.parse(window.localStorage.getItem('favourites')) || []
    },

    methods: {
        remove(text) {
            this.favourites = this.favourites.filter((entry) => entry !== text)
        },
    },
}
</script>
