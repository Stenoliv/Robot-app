<template>
    <div>
        <span> {{ localizedName }} </span>
        <img :src="url" alt="Ingredient Image">
    </div>
</template>

<script>

export default {
    props: ['id','image','name','localizedName'],
    data() {
        return {
            url: "https://spoonacular.com/cdn/ingredients_100x100/"+this.image
        }
    },
}
</script>

<style scoped>

</style>