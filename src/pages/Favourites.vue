<template>
    <Layout title="Favourites"> Favourites </Layout>
</template>

<script>
export default {
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
}
</script>
