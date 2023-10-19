<template>
  <div id="mainContainer">
    <div id="mainbox" class="mainbox">
      <div id="box" class="box">
        <div class="box1">
          <span class="span1"><b>1</b></span>
          <span class="span2"><b>2</b></span>
          <span class="span3"><b>3</b></span>
          <span class="span4"><b>4</b></span>
        </div>
        <div class="box2">
          <span class="span1"><b>5</b></span>
          <span class="span2"><b>6</b></span>
          <span class="span3"><b>7</b></span>
          <span class="span4"><b>8</b></span>
        </div>
        <button class="spin" @click="spinTheWheel" :disabled="spinning">SPIN</button>
      </div>
    </div>
    <div v-show="this.recipeOrRestaurant == 1 && this.visible == true" id="randContainer">

      <div id="map2"></div>
      <div id="result">
        {{ finalRestaurant.name }} - {{ finalRestaurant.vicinity }}
      </div>

    </div>
    <div v-show="this.recipeOrRestaurant == 0 && this.visible == true" id="recipeCont">
      <RandomRecipeView v-bind="randomRecipe"/>
    </div>
  </div>
</template>
  

<script>
import axios from 'axios'
import RandomRecipeView from '@/components/RandomRecipeView.vue';

export default {
  components: {
    RandomRecipeView
  },
  data() {
    return {
      spinning: false,
      recipeOrRestaurant: null,
      result: null,
      resultRestaurant: [],
      randomNumber: null,
      finalRestaurant: {},
      randomRecipe: [],
      visible: false,
    };
  },
  methods: {
    spinTheWheel() {
      this.visible = false;
      this.recipeOrRestaurant = null;
      this.recipeOrRestaurant = Math.floor(Math.random() * 2);
      //console.log("recipeOrRestaurant: " + this.recipeOrRestaurant)
      if (!this.spinning) {
        this.spinning = true;
        var x = 1024;
        var y = 9999;
        var deg = Math.round(Math.random() * (x - y)) + y;
        document.getElementById('box').style.transform = "rotate(" + deg + "deg";
        var element = document.getElementById('mainbox');
        element.classList.remove('animate');
        setTimeout(() => {
          element.classList.add('animate');
          this.spinning = false;
          this.visible = true;

          this.getRandomFood(this.recipeOrRestaurant);
        }, 5000);

      }
    },
    getRandomRecipe() {
      axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${this.$store.getters.getSpoonacular}&number=1`)
      .then((response) => {
        if (response.status == 200) {
          this.randomRecipe = response.data.recipes[0];
        }
        console.log(response.data);
      })
    },
    getRandomFood(number) {
      // Random getter for recipe
      if (number == 0) {

        //console.log("Recipe")
        this.getRandomRecipe();

        // Random getter for restaurants
      } else if (number == 1) {
        //console.log("Restaurant")

        let randomNumber = Math.floor(Math.random() * 20);
        //console.log("Random number: " + randomNumber);

        const mapOptions = {
          center: { lat: 60.20157545248931, lng: 24.965492207916 },
          zoom: 14,
        };

        const map = new google.maps.Map(document.getElementById('map2'), mapOptions);

        const request = {
          location: new google.maps.LatLng(60.20157545248931, 24.965492207916),
          radius: 1000,
          type: ['restaurant']
        };

        const service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.resultRestaurant = result;
            //console.log(result[randomNumber].geometry)
            //console.log("resultRestaurant: " + this.resultRestaurant[randomNumber].name);
            this.finalRestaurant = this.resultRestaurant[randomNumber];
            //console.log("finalResult: " + this.finalRestaurant)

            const marker = new google.maps.Marker({
              position: this.finalRestaurant.geometry.location,
              map: map,
            });

            const infowindow = new google.maps.InfoWindow({
              content: `<strong id="info-window">${this.finalRestaurant.name}<br>${this.finalRestaurant.vicinity}</strong>`
            });
            marker.addListener('click', () => {
              infowindow.open(map, marker);
            });

          }
        })
      }
    }
  },
};
</script>
  
<style scoped>
#mainContainer {
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 80vh;
  margin: auto;
  justify-content: center;
  align-items: center;
}

#recipeCont {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 10px;
}

#randContainer {
  display: flex;
  flex-direction: row-reverse;
  width: 50%;
  margin: auto;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  justify-content: space-around;
  color: #000;
}

#result {
  text-align: center;
  margin: auto;
  font-size: 30px;
}

#info-window {
  color: black;
}

#map2 {
  height: 30vh;
  width: 25vw;
  border-radius: 10px;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: none;
}


body {
  font-family: Open Sans;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  background: rgb(60, 60, 242);
  background: linear-gradient(90deg, rgba(60, 60, 242, 1) 0%, rgba(98, 245, 230, 1) 52%, rgba(60, 60, 242, 1) 100%);
  background-size: cover;
}

.mainbox {
  position: relative;
  width: 500px;
  height: 500px;
  max-width: 500px;
  min-width: 500px;
  transform: scale(0.8);
}

.mainbox:after {
  position: absolute;
  content: '';
  width: 32px;
  height: 32px;
  background: url('src/assets/images/arrow.png') no-repeat;
  background-size: 32px;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
}

.box {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  border: 10px solid #fff;
  overflow: hidden;
  transition: all ease 5s;
}

span {
  width: 50%;
  height: 50%;
  display: inline-block;
  position: absolute;
}

.span1 {
  clip-path: polygon(0 92%, 100% 50%, 0 8%);
  background-color: #fffb00;
  top: 120px;
  left: 0;
}

.span2 {
  clip-path: polygon(100% 92%, 0 50%, 100% 8%);
  background-color: #ff4fa1;
  top: 120px;
  right: 0;
}

.span3 {
  clip-path: polygon(50% 0%, 8% 100%, 92% 100%);
  background-color: #ffaa00;
  bottom: 0;
  left: 120px;
}

.span4 {
  clip-path: polygon(50% 100%, 92% 0, 8% 0);
  background-color: #22ff00;
  top: 0;
  left: 120px;
}


.box1 .span3 b {
  transform: translate(-50%, -50%) rotate(-270deg);
}

.box1 .span1 b,
.box2 .span1 b {
  transform: translate(-50%, -50%) rotate(185deg);
}

.box2 .span3 b {
  transform: translate(-50%, -50%) rotate(90deg);
}

.box1 .span4 b,
.box2 .span4 b {
  transform: translate(-50%, -50%) rotate(-85deg);
}

.box2 {
  width: 100%;
  height: 100%;
  transform: rotate(-135deg);
}

span b {
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 4px solid #fff;
  background-color: #001aff;
  color: #fff;
  box-shadow: 0 5px 20px #000;
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;
}

.spin:active {
  width: 70px;
  height: 70px;
  font-size: 20px;
}

.mainbox.animate:after {
  animation: animateArrow 0.7s ease infinite;
}

@keyframes animateArrow {
  50% {
    right: -40px;
  }
}

@media screen and (max-width: 1000px) {
  .mainbox {
    transform: scale(.5);
    margin-left: -20%;
  }

  #randContainer {
    width: 60%;
    height: 50vh;
  }
  #map2 {
    width: 50vw;
    height: 45vh;
  }
  #result {
    font-size: 20px;
  }

  @media screen and (max-width: 600px) {
    #mainContainer {
      flex-direction: column;
      height: 90vh;
    }
    .mainbox {
      width: 500px;
      height: 500px;
      margin: 0;
      margin-top: -30%;
      margin-bottom: -30%;
      padding: 0;
    }
    .box {
      width: 500px;
      height: 500px;
    }

    #randContainer {
      width: 100%;
      flex-direction: column;
    }
    #map2 {
      width: 100%;
      height: 70%;
    }
    #result {
      font-size: 15px;
    }
  }
}
</style>


  

 
  