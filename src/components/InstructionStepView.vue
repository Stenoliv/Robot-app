<template>
    
    <div>
        <div class="cont">
            <h3>Step: {{ number }}</h3>
            <p>{{ step }}</p>
        </div>
        
    </div>
</template>

<script>


export default {
   
    props: ['equipment','ingredients','length','number','step']
}
</script>

<style scoped>
h3{
    font-size: 35px;
    display: flex;
    color: whitesmoke;
}
p{
    font-size: 30px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: whitesmoke;
}
.cont{
    margin: 25px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: whitesmoke;
}

</style>