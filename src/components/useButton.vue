<template>
    <input type="button" :value="value">
</template>

<script setup>
    const props = defineProps({
        value: String,
    })

</script>

<style scoped lang="scss">
    input {
        border: 0;
        outline: 0;
        transition: .3s;
        background-color: #00bd7e;
        border-radius: 5px;
        width: 100%;
        padding: 10px 15px;
        cursor: pointer;
        &:hover {
            opacity: .7;
        }
    }
</style>