<template>
    <div class="app">
        <transition>
            <div class="intro" v-if="isLoading">
                {{ symbol }}
            </div>

            <div class="layout" v-else>
                <h1 class="logo">
                    <a href="/" title="Japanizer">
                        <span class="logo__symbol">翻</span>
                        <span class="logo__wordmark">Japanizer</span>
                    </a>
                </h1>

                <button class="toggle-console" :class="{ 'toggle-console--active': showConsole }" type="button" name="openConsole" @click="showConsole = !showConsole">
                    []
                </button>

                <div class="panels">
                    <div class="character">
                        CHAR :)
                    </div>
                    <div class="panel panel--input">
                        <div class="content">
                            Input
                        </div>
                    </div>
                    <div class="panel panel--output">
                        <div class="content">
                            Output

                            <button type="button" name="shareOutput">[] Share</button>
                        </div>
                    </div>
                </div>
                <div class="console" :class="{ 'console--active': showConsole }">
                    <div class="console__inner">
                        Console
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                isLoading: true,
                symbol: '翻',
                showConsole: false,
            }
        },

        computed: {
        },

        beforeMount: function () {
        },

        mounted: function () {
            this.isLoading = false
        },

        watch: {
        },

        methods: {
        }
    }
</script>
