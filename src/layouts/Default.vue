<template>
    <div>
        <h1 class="logo">
            <g-link to="/" title="Japanizer">
                <span class="logo__symbol">翻</span>
                <span class="logo__wordmark">Japanizer</span>
            </g-link>
        </h1>

        <slot></slot>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
            }
        },
    }
</script>
