<template>
  <div id="mainContainer">
    <div>
      <button type="button" @click.prevent="getLocation">Get Restaurants</button>
    </div>
    <div id="map"></div>
    <div v-for="result in results" :key="result.name">
      <strong>{{ result.name }}</strong><br>
      Address: {{ result.vicinity }}<br>
      Rating: {{ result.rating }}
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      results: [],
    };
  },
  methods: {

    findRestaurants(latitude, longitude) {

      //this.getLocation();
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 14,
      };

      const map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const request = {
        location: new google.maps.LatLng(latitude, longitude),
        radius: 1000,
        type: 'restaurant',
      };

      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.results = results;
          results.forEach((place) => {
            const marker = new google.maps.Marker({
              position: place.geometry.location,
              map: map,
            });

            const infowindow = new google.maps.InfoWindow({
              content: `<strong>${place.name}</strong><br>${place.vicinity}`,
            });
            //console.log(infowindow)

            marker.addListener('click', () => {
              infowindow.open(map, marker);
            });
          });
        }
      });
    },
    getLocation() {

      navigator.permissions.query({ name: "geolocation" }).then((result) => {

        let stateThing;

        if (result.state === "granted") {
          stateThing = result.state;
          console.log(stateThing)
          navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log(lat + " " + lon)
            this.findRestaurants(lat, lon);
          })

        } else if (result.state === "denied") {
          stateThing = result.state;
          console.log(stateThing)

          console.log("Geolocation is not supported by this browser or not allowed showing Restaurants near Arcada!.");
          this.findRestaurants(60.20157545248931, 24.9654922079165)

        }
      });
    },
  },
};
</script>
  
<style scoped>
#map {
  height: 500px;
  width: 50%;
}
</style>
  
  
  