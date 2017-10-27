<template>
    <div>
        <Top class="mb-60px"></Top>
        <router-view class="pt-36px pb-50px"/>
    </div>
</template>
<script>
import Top from "./Top.vue";
export default {
    data(){
        return {
            
        }
    },
    components: {
        Top
    }
}
</script>
