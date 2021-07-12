<template>
    <div class="entry">
        <div class="content content--input">
            <div style="flex-grow: 1">{{ input }}</div>
            <button @click="remove()"><TrashIcon /></button>
        </div>
        <div class="content content--output">
            <div v-html="$options.filters.withLineBreaks(output)"></div>
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

    filters: {
        withLineBreaks(value) {
            if (!value) return

            return value.toString().replace(/\n/gi, '<br>')
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
            this.$copyText(this.output).then(
                (event) => {
                    alert('Japanized text copied')
                    console.log(event)
                },
                (error) => {
                    console.log(error)
                },
            )
        },

        share() {
            const url = document.querySelector('link[rel=canonical]')
                ? document.querySelector('link[rel=canonical]').href
                : document.location.href

            this.$copyText(url).then(
                (event) => {
                    alert('Link copied')
                    console.log(event)
                },
                (error) => {
                    console.log(error)
                },
            )
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
