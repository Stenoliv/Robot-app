<template>
  <div>
    <button type="button" @click.prevent="getLocation">Get Restaurants</button>
  </div>
  <div id="mainContainer">
    <div id="map"></div>
    <div id="resContainer">
      <div id="rest-div" v-for="(result, i) in results" :key="result.name">
        <strong>{{ result.name }}</strong><br>
        <div>Address: {{ result.vicinity }}</div>
        <div>Rating: {{ result.rating }}</div>
        <strong :style="{ color: result.opening_hours && result.opening_hours.isOpen ? 'green' : 'red' }">
          {{ result.opening_hours && result.opening_hours.isOpen ? 'Open' : 'Closed' }}
        </strong>
      </div>
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
    findRestaurants(lat, lon) {

      const mapOptions = {
        center: { lat: lat, lng: lon },
        zoom: 14,
      };

      const map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const request = {
        location: new google.maps.LatLng(lat, lon),
        radius: 1000,
        type: ['restaurant']
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

            console.log(place)

            //websiteurl toimar inte, det fanns inget objekt i apin. Försökte göra sådär men namnet apin fetchar matchar inte webbisdan url
            const websiteUrl = `<a href="https://${place.name.replace(/ /g, '').toLowerCase()}.fi">${place.name}</a>`;

            const infowindow = new google.maps.InfoWindow({
              content: `<strong id="info-window">${websiteUrl}<br>${place.vicinity}</strong>`

            });

            marker.addListener('click', () => {
              infowindow.open(map, marker);
            });


          });

        }
      });


    },
    getLocation() {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {

        if (result.state === "granted") {

          //console.log(result.state)

          navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            //console.log(lat + " " + lon)
            this.findRestaurants(lat, lon);
          })

        } else if (result.state === "denied") {

          //console.log(result.state)

          console.log("Geolocation is not supported by this browser or not allowed showing Restaurants near Arcada!.");
          this.findRestaurants(60.20157545248931, 24.9654922079165)

        }
      });
    },
    showSomething() {
      console.log("Hello, is this working?")
    },
  },


}
</script>
  
<style scoped>
button {
  width: 100px;
}

#mainContainer {
  background-color: rgb(184, 64, 64);
  margin: auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  height: 850px;
  border-radius: 10px;
}

#resContainer {
  width: 55%;
  display: flex;
  flex-direction: column;
  margin: 20px;
  height: 800px;
  overflow: auto;
  font-size: 30px;
}

#resContainer::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

#resContainer::-webkit-scrollbar {
  width: 12px;
}

#resContainer::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #a12525;
}


#map {
  height: 800px;
  width: 40%;
  margin: 20px;
  border-radius: 10px;
}

#rest-div {
  color: black;
  margin: 10px;
  display: inline-block;
  background-color: aliceblue;
  padding: 8px;
  border-radius: 5px;
  height: fit-content;
}

#rest-div:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
  
  
  