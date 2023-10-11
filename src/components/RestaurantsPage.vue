<template>
    <div id="mainContainer">
      <div>
        <button type="button" @click.prevent="findRestaurants">Get Restaurants</button>
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
      findRestaurants() {
  
        const mapOptions = {
          center: { lat: 60.20157545248931, lng: 24.9654922079165 },
          zoom: 14,
        };
  
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
        const request = {
          location: new google.maps.LatLng(60.20157545248931, 24.9654922079165),
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
  
              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });
            });
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
  
  
  