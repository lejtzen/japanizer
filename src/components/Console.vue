<template>
    <div class="console">
        <h2>Grammar console</h2>
        <ul>
            <li v-for="(correction, index) in corrections" :key="index">
                <h3>{{ correction.word }}</h3>

                <ul>
                    <li
                        v-for="(corr, index) in correction.corrections"
                        :key="index"
                    >
                        <p>{{ corr.description }}</p>
                        {{ corr.was }} => {{ corr.became }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['corrections'],
}
</script>
