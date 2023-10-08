<script>
export default {
    props: [
        'restaurant',
        'place'
    ],
    methods: {
        findRestaurants() {

            let restaurants;

            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 60.20157545248931, lng: 24.9654922079165 },
                zoom: 14
            });

            const request = {
                location: new google.maps.LatLng(60.20157545248931, 24.9654922079165),
                radius: 1000,
                type: ['restaurant']
            };

            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, (results, status, pagination) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        const place = results[i];
                        restaurants = results[i];
                        console.log(place.name);

                        //const divRest = document.createElement("div");
                        //divRest.innerHTML = `${place.name} <br> Adress: ${place.vicinity} <br> Rating: ${place.rating}`;
                        //divRest.classList.add("restaraunt-styling");
                        //document.querySelector("#fis").appendChild(divRest);

                        const marker = new google.maps.Marker({
                            position: place.geometry.location,
                            map: map,
                        });

                        const infowindow = new google.maps.InfoWindow({
                            content: `<strong>${place.name}</strong><br>${place.vicinity}`
                        });

                        marker.addListener('click', () => {
                            infowindow.open(map, marker);
                        });
                    }
                }

            });
        }
    },
}

</script>

<template>
    <div id="mainContainer">
        <div id="reses">{{ restaurant }} {{ place }}</div>
        <div></div>
        
        <!--<div id="map">
            <button type="button" @click.prevent="findRestaurants">GetRestaurants</button>
        </div>-->
        
        <div v-for="result in results" :key="result.name" v-bind="result.name">Showing different restaurants....</div>
    </div>
</template>

<style scoped></style>