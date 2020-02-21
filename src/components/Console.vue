<template>
    <div class="console">
        <h2>Grammar console</h2>
        <ul>
            <li v-for="correction in corrections">
                <h3>{{ correction.word }}</h3>

                <ul>
                    <li v-for="corr in correction.corrections">
                        <p>{{ corr.description }}</p>
                        {{ corr.was }} => {{ corr.became }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: [
            'corrections',
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
