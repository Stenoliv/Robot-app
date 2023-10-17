<script>
        recepieComponents = JSON.parse(Response)
        title = recepieComponents.title
        preparationtime = recepieComponents.readyInMinutes
        extendedIngredients.forEach(ingredient => {
            document.getElementById("aine").innerHTML = ingredient.original
        });

    
</script>
<template>
    <div class="aine"></div>
</template>