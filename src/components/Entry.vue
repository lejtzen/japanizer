<template>
    <div class="entry">
        <div class="content content--input">
            {{ input }}
        </div>
        <div class="content content--output">
            {{ output }}
        </div>
        <div class="actions">
            <div class="left-actions">
                <button @click="remove()" type="button">
                    <TrashIcon />
                </button>
                <button @click="share()" type="button">
                    <LinkIcon />
                </button>
            </div>
            <div class="right-actions">
                <button v-if="isSpeaking" @click="stop()" type="button">
                    <PauseIcon />
                </button>
                <button v-else @click="speak()" type="button">
                    <PlayIcon style="transform: translateX(5%)" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import translate from '@/utils/translate.js'
import synth from '@/utils/synth.js'
import { notify } from '@/utils/events.js'
import { TrashIcon, LinkIcon, PauseIcon, PlayIcon } from 'vue-feather-icons'

export default {
    components: {
        TrashIcon,
        LinkIcon,
        PauseIcon,
        PlayIcon,
    },

    props: {
        input: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isSpeaking: false,
        }
    },

    computed: {
        output() {
            return translate(this.input)
        },
    },

    methods: {
        remove() {
            this.stop()
            this.$emit('remove', this.input)
        },

        share() {
            const link = new URL('/', document.location.href)

            link.searchParams.set('text', encodeURIComponent(this.input))

            this.$copyText(link.href)
                .then(() => notify('Link copied to clipboard'))
                .catch(() => notify('Could not copy link to clipboard'))
        },

        speak() {
            synth.speak(
                this.output,
                () => {
                    this.isSpeaking = true
                },
                () => {
                    this.isSpeaking = false
                },
            )
        },

        stop() {
            synth.cancel()
        },
    },
}
</script>
