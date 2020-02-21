<template>
    <div class="app">
        <transition>
            <div class="intro" v-if="isLoading">
                {{ symbol }}
            </div>

            <div class="layout" v-else>
                <h1 class="logo">
                    <g-link to="/" title="Japanizer">
                        <span class="logo__symbol">翻</span>
                        <span class="logo__wordmark">Japanizer</span>
                    </g-link>
                </h1>

                <button class="toggle-console" :class="{ 'toggle-console--active': showConsole }" type="button" name="openConsole" @click="showConsole = !showConsole">
                    <IconSettings />
                </button>

                <div class="panels">
                    <div class="character">
                        <button @click.prevent="speak(output)">
                            <IconVolume />
                        </button>
                    </div>
                    <div class="panel panel--input">
                        <div class="content">
                            <textarea name="input" v-model="input" v-resize rows="1"></textarea>
                        </div>
                    </div>
                    <div class="panel panel--output">
                        <div class="content">
                            <div v-html="$options.filters.withLineBreaks(output)"></div>

                            <button v-if="shareIsAvailable" @click="share()" type="button" name="shareOutput">
                                <IconShare />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
                <div class="console" :class="{ 'console--active': showConsole }">
                    <div class="console__inner">
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
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import rules from '../utils/rules'

    export default {
        data: function () {
            return {
                isLoading: true,
                symbol: '翻',
                showConsole: true,
                input: 'Jag heter Vincent',
                shareIsAvailable: false,
                synth: null,
                corrections: {},
            }
        },

        computed: {
            output () {
                let separator = ' '
                let words = this.input.split(separator)

                this.corrections = {}

                return words.map((word, index) => {
                    let original = word

                    rules.forEach(rule => {
                        word = word.replace(rule.find, match => {
                            let corrections = this.corrections[index]

                            if (!corrections) {
                                corrections = {
                                    word: original,
                                    corrections: []
                                }
                            }

                            corrections.corrections.push({
                                was: match,
                                became: rule.replace(match),
                                description: rule.description
                            })

                            this.corrections[index] = corrections

                            return rule.replace(match)
                        })
                    })

                    return word
                }).join(separator)
            },
        },

        filters: {
            withLineBreaks: function (value) {
                if (!value) return

                return (value.toString()).replace(/\n/gi, '<br>')
            },
        },

        beforeMount: function () {
            this.synth = window.speechSynthesis
        },

        mounted: function () {
            this.shareIsAvailable = this.isShareApiAvailable()

            this.isLoading = false
        },

        watch: {
        },

        methods: {
            isShareApiAvailable: function () {
                return !!(window.navigator && window.navigator.share)
            },

            share: function () {
                let title = document.title
                let url = document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href

                navigator.share({
                    title: title,
                    url: url,
                }).then(() => {
                    // Ready for callback
                })
            },

            speak: function (text) {
                let utterance = new SpeechSynthesisUtterance(text)
                let voices = this.synth.getVoices()

                utterance.pitch = 1
                utterance.rate = 1

                if (voices[18]) {
                    utterance.voice = voices[18]
                }

                if (voices[58]) {
                    utterance.voice = voices[58]
                }

                this.synth.speak(utterance)
            },
        }
    }
</script>
