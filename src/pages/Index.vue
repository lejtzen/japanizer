<template>
    <Layout>
        <form class="form" @submit.prevent="submit()">
            <textarea
                class="content content--input"
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
            <div id="speak">
                <button v-if="isSpeaking" @click="stop()" type="button">
                    <PauseIcon />
                </button>
                <button v-else @click="submit()" type="button">
                    <PlayIcon style="transform: translateX(5%)" />
                </button>
            </div>
            <div class="content content--output">
                {{ output || '&nbsp;' }}{{ isTyping ? '...' : '' }}
            </div>

            <div id="favourite">
                <button
                    @click="favourite()"
                    type="button"
                    :class="{ fill: isFavourite }"
                >
                    <HeartIcon />
                </button>
            </div>
        </form>
    </Layout>
</template>

<script>
import translate from '@/utils/translate.js'
import synth from '@/utils/synth.js'
import { PauseIcon, PlayIcon, HeartIcon } from 'vue-feather-icons'
import { debounce } from 'debounce'

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
        PauseIcon,
        PlayIcon,
        HeartIcon,
    },

    data() {
        return {
            favourites: [],
            input: 'Jag heter Vincent',
            isSpeaking: false,
            isTyping: false,
        }
    },

    computed: {
        output() {
            return translate(this.input)
        },

        isFavourite() {
            return this.favourites.includes(this.input.trim())
        },
    },

    watch: {
        favourites(favourites) {
            window.localStorage.setItem(
                'favourites',
                JSON.stringify(favourites),
            )
        },

        input(input) {
            window.sessionStorage.setItem('input', input)
            this.isTyping = true
            debounce(() => (this.isTyping = false), 500)()
        },
    },

    mounted() {
        const sharedInput = new URLSearchParams(window.location.search).get(
            'text',
        )
        const savedInput = window.sessionStorage.getItem('input')

        this.favourites =
            JSON.parse(window.localStorage.getItem('favourites')) || []
        this.input = sharedInput
            ? decodeURIComponent(sharedInput)
            : savedInput || this.input
        this.$refs.input.focus()
    },

    methods: {
        submit() {
            synth.speak(
                translate(this.input),
                () => {
                    this.isSpeaking = true
                },
                () => {
                    this.isSpeaking = false
                },
            )
        },

        favourite() {
            const text = this.input.trim()

            if (!text) {
                return
            }

            if (this.isFavourite) {
                this.favourites = this.favourites.filter(
                    (entry) => entry !== text,
                )
            } else {
                this.favourites.unshift(text)
            }
        },

        stop() {
            synth.cancel()
        },
    },
}
</script>
