<template>
    <Layout>
        <form class="form" @submit.prevent="submit()">
            <div class="content content--input">
                <textarea
                    name="input"
                    rows="1"
                    minlength="1"
                    placeholder="Enter text"
                    required
                    v-model="input"
                    ref="input"
                    v-resize
                    @keypress.enter.prevent="submit()"
                ></textarea>
                <button @click="reset()" v-if="input" type="button">
                    <XIcon />
                </button>
            </div>
            <div class="content content--output">
                <div>
                    {{ output || '&nbsp;' }}
                </div>
            </div>
        </form>

        <Entry
            v-for="entry in entries"
            :key="entry.id"
            :input="entry.input"
            :output="entry.output"
            :isFavourite="favourites.includes(entry.input)"
            :isPlaying="entry.output === playingOutput"
            @remove="remove"
            @favourite="favourite"
            @speak="speak"
            @stop="stop"
        />
    </Layout>
</template>

<script>
import translate from '@/utils/translate.js'
import Entry from '@/components/Entry.vue'
import { XIcon } from 'vue-feather-icons'

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
        Entry,
        XIcon,
    },

    data() {
        return {
            input: '',
            entries: [],
            favourites: [],
            playingOutput: '',
            synth: null,
        }
    },

    computed: {
        output() {
            return translate(this.input)
        },
    },

    watch: {
        entries(entries) {
            window.localStorage.setItem('entries', JSON.stringify(entries))
        },

        favourites(favourites) {
            window.localStorage.setItem(
                'favourites',
                JSON.stringify(favourites),
            )
        },
    },

    mounted() {
        const input = new URLSearchParams(window.location.search).get('text')

        this.input = input ? decodeURIComponent(input) : this.input
        this.entries = JSON.parse(window.localStorage.getItem('entries')) || []
        this.favourites =
            JSON.parse(window.localStorage.getItem('favourites')) || []
        this.synth = window.speechSynthesis
        this.synth.onvoiceschanged = this.setVoice

        this.$refs.input.focus()
        this.setVoice()
    },

    methods: {
        setVoice() {
            this.voice = this.synth
                .getVoices()
                .find((voice) => voice.lang.indexOf('ja') === 0)
        },

        reset() {
            this.input = ''
            this.$refs.input.focus()
        },

        submit() {
            if (this.input.length < 1) {
                return
            }

            const newEntry = {
                id: Math.random(),
                input: this.input,
                output: translate(this.input),
            }

            this.$refs.input.blur()
            this.entries = [
                newEntry,
                ...this.entries.filter(
                    (entry) => entry.input !== newEntry.input,
                ),
            ]
            this.speak(newEntry.output)
            this.input = ''
        },

        remove(text) {
            this.entries = this.entries.filter((entry) => entry.input !== text)

            this.stop()
        },

        favourite(text) {
            const favourites = this.favourites.filter((entry) => entry !== text)

            if (!this.favourites.includes(text)) {
                favourites.unshift(text)
            }

            this.favourites = favourites
        },

        speak(text) {
            let utterance = new SpeechSynthesisUtterance(text)

            utterance.onend = () => (this.playingOutput = '')
            utterance.onerror = () => (this.playingOutput = '')
            utterance.onpause = () => (this.playingOutput = '')
            utterance.onresume = () => (this.playingOutput = text)
            utterance.onstart = () => (this.playingOutput = text)
            utterance.pitch = 1
            utterance.rate = 1
            utterance.voice = this.voice ? this.voice : utterance.voice

            this.synth.cancel()
            this.synth.speak(utterance)
        },

        stop() {
            this.synth.cancel()
            this.playingOutput = ''
        },
    },
}
</script>
