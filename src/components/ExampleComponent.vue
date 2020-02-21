<template>
    <div>
        <!-- TODO -->
    </div>
</template>

<script>
    export default {
        props: [
            'some',
        ],

        data: function () {
            return {
                thing: false,
            }
        },

        computed: {
            else: function () {
                return false
            },
        },
    }
</script>
