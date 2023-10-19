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
@media screen and (max-width: 1000px) {
    h3 {
        font-size: 6dvw;
        padding: 0;
        margin: 0;
    }
    p {
        font-size: 4dvw;
        margin: 0;
        padding: 0;
        padding-left: 2dvw;
        line-height: 1.5;
    }

    @media screen and (max-height: 600px) {
        h3 {
            font-size: 1.2rem;
            padding: 0;
            margin: 0;
        }
        p {
            font-size: 1rem;
            margin: 0;
            padding: 0;
        }
        .cont {
            margin: 10px;
        }
    }
}

</style>