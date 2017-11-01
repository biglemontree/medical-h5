<template>
    <div>

        <Top class="mb-60px"></Top>
        <router-view class="pt-76px pb-50px"/>
    </div>
</template>
<script>
import Top from "./Top.vue";

export default {
    data(){
        return {
            i: 0
        }
    },
    components: {
        Top
    },
    methods: {

    }
}
</script>
