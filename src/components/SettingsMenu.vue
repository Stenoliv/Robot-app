<template>
    <div v-if="show" class="settings-container" @click="">
        <div class="settings-menu">
            <div class="settings-header">
                <h2>Settings menu</h2>
                <div class="back-button" @click="toggleSettings">X</div>
            </div>
            <div class="settings-box">
                <span>Spoonacular Api-key</span>
                <input type="text" placeholder="Spoonacular api-key" v-model="spoonacularApiKey">
            </div>
            <div class="settings-box">
                <span>Google Api-key</span>
                <input type="text" placeholder="Google api-key" v-model="googleApiKey">
            </div>            
        </div>
    </div>
</template>

<script>
export default {
    emits: ['updateSpoonacular','updateGoogle'],
    data() {
        return {
            show: false,
            spoonacularSave: 'spoonacular',
            spoonacularApiKey: null,
            googleSave: 'google',
            googleApiKey: null
        }
    },
    methods: {
        toggleSettings() {
            if (this.show) {
                this.show = false
            } else {
                this.show = true
            }
        }
    },
    mounted() {
        try {
            if (localStorage.getItem(this.spoonacularSave)) {
                this.spoonacularApiKey = localStorage.getItem(this.spoonacularSave)
                this.$store.commit('setSpoonacular', this.spoonacularApiKey.trim())
            }
            if (localStorage.getItem(this.googleSave)) {
                this.googleApiKey = localStorage.getItem(this.googleSave)
                this.$store.commit('setGoogle', this.googleApiKey.trim())
            }
        } catch(error) {
            console.log(error)
        }
   },
   watch: {
    spoonacularApiKey: {
        handler(value) {
            console.log('value changed: ', value)
            try {
                localStorage.setItem(this.spoonacularSave, this.spoonacularApiKey.trim())
                this.$store.commit('setSpoonacular', this.spoonacularApiKey.trim())
            } catch(error) {
                console.log(error)
            }
        }
    },
    googleApiKey: {
        handler(value) {
            console.log('value changed: ', value) 
            try {
                localStorage.setItem(this.googleSave, this.googleApiKey.trim())
                this.$store.commit('setGoogle', this.googleApiKey.trim())
            } catch(error) {
                console.log(error)
            }
        }
    }
   }
}
</script>

<style scoped>
.settings-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.settings-container:hover {
    height: 100vh;
}

.settings-menu {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: white;
    border-radius: 1vw;
    width: 30vw;
    height: 30vh;
    padding-bottom: 2vh;
    padding-top: 2vh;
    color: black;
}

/* Different menus */
.settings-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 15%;
    border-bottom: 1vh solid black;
    top: 0;
}

.settings-header h2 {
    padding: 0;
    margin: 0;
}

.back-button {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    width: 5vw;
    height: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: wheat;
    border-bottom-left-radius: 0.5vw;
    border-top-right-radius: 1vw;
    
}

.settings-box {
    width: 80%;
    height: 50%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.settings-box span {
    height: 50%;
    display: flex;
    font-size: 1.3rem;
    align-items: center;
}

.settings-box input {
    height: 50%;
    font-size: 1rem;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>