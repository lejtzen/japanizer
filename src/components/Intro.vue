<template>
    <div class="intro__symbol">
        {{ symbol }}
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                symbol: '日',
            }
        },

        mounted: function () {
            let timing = 100
            let symbols = [
                '本',
                '語',
                'に',
                '翻',
                '訳',
                'す',
                'る',
                '日',
                '本',
                '語',
                'に',
                '翻',
                '訳',
                'す',
                'る',
                '翻',
            ]

            symbols.forEach((item, index) => {
                setTimeout(() => {
                    this.symbol = item
                }, index * timing)
            })

            setTimeout(() => {
                this.$emit('done')
            }, (symbols.length + 1) * timing)
        },
    }
</script>
