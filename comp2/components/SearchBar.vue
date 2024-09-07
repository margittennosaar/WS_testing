<template>
    <input class="search-input" v-model="searchInput" @input="debounceInput" :placeholder="placeHolder"/>
</template>
<script>
import _ from 'lodash'
export default{
    name: 'SearchBar',
    props: {
        placeHolder: {
            type: String,
            required: false
        }
    },
    methods: {
        debounceInput: _.debounce(function () {
            this.$emit('search', this.searchInput)
        }, 300)
    },
    data(){
        return {
            searchInput: ''
        }
    }
}

</script>

<style scoped>

.search-input{
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--black);
}
.search-input:focus  {
    border: 1px solid var(--main-color);
    box-shadow: 0px 0px 1px 1px var(--main-color);
    outline: none;
}

</style>