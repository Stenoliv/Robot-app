<template>
    <div ref="empty_space" class="empty hide">
        <br>
        <span></span>
        <br>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
    components: {

    },
    props: [],
    data() {
        return {
            
        }
    },
    setup() {
        const instance = getCurrentInstance()
        const height =  window.innerHeight
        const empty_height = height + 'px'

        return {
            empty_height,
            instance
        }
    },
    methods: {
        show() {
            const container = this.$refs.empty_space
            container.classList.remove('hide')
            container.classList.add('show')
        },
        hide() {
            const container = this.$refs.empty_space
            container.classList.remove('show')
            container.classList.add('hide')
        }
    }
}
</script>

<style scoped>
    .empty {
        width: 100%;
        min-height: v-bind('empty_height');
    }

    .show {
        display: block;
    }

    .hide {
        display: none;
    }
</style>