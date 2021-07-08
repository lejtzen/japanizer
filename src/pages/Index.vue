<template>
    <Layout>
        <transition appear name="welcome">
            <div class="layout">
                <h1 class="logo">
                    <g-link to="/" title="Japanizer">
                        <span class="logo__symbol">翻</span>
                        <span class="logo__wordmark">Japanizer</span>
                    </g-link>
                </h1>

                <button
                    class="toggle-sidebar"
                    :class="{ 'toggle-sidebar--active': showConsole }"
                    @click="showConsole = !showConsole"
                >
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
                            <textarea
                                name="input"
                                v-model="input"
                                v-resize
                                rows="1"
                            ></textarea>
                        </div>
                    </div>
                    <div class="panel panel--output">
                        <div class="content">
                            <div
                                v-html="$options.filters.withLineBreaks(output)"
                            ></div>

                            <button
                                v-if="shareIsAvailable"
                                @click="share()"
                                type="button"
                                name="shareOutput"
                            >
                                <IconShare />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="sidebar"
                    :class="{ 'sidebar--active': showConsole }"
                >
                    <div class="sidebar__inner">
                        <Console :corrections="corrections" />
                    </div>
                </div>
            </div>
        </transition>
    </Layout>
</template>

<script>
import rules from '@/utils/rules.js'
import Console from '@/components/Console.vue'

export default {
    metaInfo: {
        title: 'Japanizer by Lejtzén Design',
        meta: [
            {
                name: 'description',
                content:
                    'This project of mine will translate everything to japanese.',
            },
        ],
    },

    components: {
        Console,
    },

    data() {
        return {
            showConsole: false,
            input: 'Jag heter Vincent',
            shareIsAvailable: false,
            synth: null,
            corrections: {},
        }
    },

    computed: {
        output() {
            let separator = ' '
            let words = this.input.split(separator)

            this.corrections = {}

            return words
                .map((word, index) => {
                    let original = word

                    rules.forEach((rule) => {
                        word = word.replace(rule.find, (match) => {
                            let corrections = this.corrections[index]

                            if (!corrections) {
                                corrections = {
                                    word: original,
                                    corrections: [],
                                }
                            }

                            corrections.corrections.push({
                                was: match,
                                became: rule.replace(match),
                                description: rule.description,
                            })

                            this.corrections[index] = corrections

                            return rule.replace(match)
                        })
                    })

                    return word
                })
                .join(separator)
        },
    },

    filters: {
        withLineBreaks(value) {
            if (!value) return

            return value.toString().replace(/\n/gi, '<br>')
        },
    },

    mounted() {
        this.shareIsAvailable = this.isShareApiAvailable()
        this.synth = window.speechSynthesis
    },

    methods: {
        isShareApiAvailable() {
            return !!(window.navigator && window.navigator.share)
        },

        share() {
            let title = document.title
            let url = document.querySelector('link[rel=canonical]')
                ? document.querySelector('link[rel=canonical]').href
                : document.location.href

            navigator
                .share({
                    title: title,
                    url: url,
                })
                .then(() => {
                    // Ready for callback
                })
        },

        speak(text) {
            let utterance = new SpeechSynthesisUtterance(text)
            let voices = this.synth.getVoices()
            let japanese = voices.find(
                (voice) => voice.lang.indexOf('ja') === 0,
            )

            utterance.pitch = 1
            utterance.rate = 1

            if (japanese) {
                utterance.voice = japanese
            }

            this.synth.speak(utterance)
        },
    },
}
</script>
