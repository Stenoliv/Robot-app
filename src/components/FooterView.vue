<template>
    <div class="footer-container">
        <div class="copyright-box">
            <img class="copyright-svg" src="@/assets/images/cc-svg.svg" alt="cc-rights">
            <span class="copyright-text">
                Rasmus Räihä, Hermes Heikkilä, Victor Liljequist & Oliver Stenbacka
            </span>
        </div>
        <div class="settings-button" @click="openSettings">
            <img class="settings-svg" src="@/assets/images/settings.svg" alt="Settings svg">
            Settings
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        openSettings() {
            this.$parent.openSettings()
        }
    }
}
</script>

<style scoped>
.footer-container {
    position: absolute;
    background-color: black;
    margin: 0;
    padding: 0;
    bottom: 0;
    height: 3vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-self: center;
}

.copyright-box {
    position: relative;
    padding: 0;
    margin: 0;
    margin-left: 15%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.copyright-svg {
    padding: 0;
    margin: 0;
    height: 2vh;
    margin-top: -1vh;
    filter: invert(100%);
}

.copyright-text {
    font-size: 2vh;
    color: wheat;
}

.settings-button {
    position: absolute;
    right: 0;
    margin-right: 15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: wheat;
    font-size: 2vh;
    cursor: pointer;
    transition: 0.3s;
}

.settings-button:hover {
    transform: scaleY(1.1) scaleX(1.05);
}
.settings-svg {
    margin: 0;
    padding: 0;
    height: 2vh;
    filter: invert(100%);
}

@media screen and (max-width: 1000px) {
    .footer-container {
        height: 7dvh;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        padding-top: 0.2dvh;
    }
    .copyright-box {
        height: 40%;
    }
    .copyright-text {
        font-size: 3dvh;
    }
    .settings-button{
        margin: 0;
        margin-left: 15%;
        right: auto;
        left: 0;
        bottom: 0;
        font-size: 3dvh;
        height: 40%;
    }
    
    @media screen and (max-width: 600px) {
        .footer-container {
            height: 4dvh;
            padding-top: 0;
        }
        .copyright-box {
            height: 50%;
            padding-bottom: 1.2dvh;
        }
        .copyright-text {
            font-size: 2.5dvw;
        }
        .copyright-svg {
            height: 50%;
        }
        .settings-button{
            font-size: 2.5dvw;
            height: 50%;
        }
        .settings-svg {
            height: 50%;
        }
    }
}

</style>