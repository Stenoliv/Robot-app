<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    const apiKey = this.$store.getters.getGoogle
    console.log(apiKey)
    new Promise((resolve, reject) => {
        if (apiKey == "" | apiKey == null) {
          reject()
        }
        const link = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        let googleScript = document.querySelector(`script[src="${link}"]`);
        if (!googleScript) {
          googleScript = document.createElement('script');
          googleScript.src = link;
          googleScript.async = true;
          document.head.append(googleScript);

          googleScript.addEventListener('error', () => {
            reject()
          })

          googleScript.addEventListener('load', () => {
            resolve()
          })
        }
      })
  }
}
</script>