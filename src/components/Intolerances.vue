<template>
    <input type="checkbox" id="{{id}}" :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)">
      <label for="{{id}}">{{title}}</label>
</template>
<script>
    export default{
        props:["id","value","title"],
        emits: ['update:value']
    }
</script>