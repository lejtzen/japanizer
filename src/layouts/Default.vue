<template>
    <div id="layout">
        <header id="header">
            <g-link to="/" title="Japanizer">
                <Logo />
                <!-- <span class="logo__wordmark">{{ title || 'Japanizer' }}</span> -->
            </g-link>
        </header>
        <main id="main">
            <slot></slot>
        </main>
        <footer id="footer">
            <nav>
                <ul>
                    <li>
                        <g-link to="/" title="Japanizer">
                            <Logo />
                            <span>Japanizer</span>
                        </g-link>
                    </li>
                    <li>
                        <g-link to="/favourites/" title="Favourites">
                            <StarIcon />
                            <span>Favourites</span>
                        </g-link>
                    </li>
                </ul>
            </nav>
        </footer>
    </div>
</template>

<script>
import Logo from '@/assets/svg/logo.svg?inline'
import { StarIcon } from 'vue-feather-icons'

export default {
    components: {
        Logo,
        StarIcon,
    },

    props: ['title'],

    data() {
        return {}
    },

    computed: {},
}
</script>
