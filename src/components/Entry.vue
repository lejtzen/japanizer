<template>
    <div class="entry">
        <div class="content content--input">
            <div style="flex-grow: 1">{{ input }}</div>
            <button @click="remove()"><TrashIcon /></button>
        </div>
        <div class="content content--output">
            <div>{{ output }}</div>
        </div>
        <div class="actions">
            <div class="left-actions">
                <button @click="favourite()">
                    <StarIcon :class="{ fill: isFavourite }" />
                </button>
                <button @click="copy()"><CopyIcon /></button>
                <button @click="share()"><ShareIcon /></button>
            </div>
            <div class="right-actions">
                <button v-if="isPlaying" @click="stop()"><PauseIcon /></button>
                <button v-else @click="speak()">
                    <PlayIcon style="transform: translateX(5%)" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { notify } from '@/utils/events.js'
import {
    TrashIcon,
    StarIcon,
    CopyIcon,
    ShareIcon,
    PauseIcon,
    PlayIcon,
} from 'vue-feather-icons'

export default {
    components: {
        TrashIcon,
        StarIcon,
        CopyIcon,
        ShareIcon,
        PauseIcon,
        PlayIcon,
    },

    props: {
        input: {
            type: String,
            default: '',
            required: true,
        },
        output: {
            type: String,
            default: '',
            required: true,
        },
        isFavourite: {
            type: Boolean,
            default: false,
            required: false,
        },
        isPlaying: {
            type: Boolean,
            default: false,
            required: false,
        },
    },

    methods: {
        remove() {
            this.$emit('remove', this.input)
        },

        favourite() {
            this.$emit('favourite', this.input)
        },

        copy() {
            this.$copyText(this.output)
                .then(() => notify('Japanized text copied to clipboard'))
                .catch(() =>
                    notify('Could not copy Japanized text to clipboard'),
                )
        },

        share() {
            const url = document.querySelector('link[rel=canonical]')
            const link = new URL(url ? url.href : document.location.href)

            link.searchParams.set('text', encodeURIComponent(this.input))

            this.$copyText(link.href)
                .then(() => notify('Link copied to clipboard'))
                .catch(() => notify('Could not copy link to clipboard'))
        },

        speak() {
            this.$emit('speak', this.output)
        },

        stop() {
            this.$emit('stop')
        },
    },
}
</script>
