<template>
  <div id="mainbox" class="mainbox">
    <div v-if="wheelVisible == true" id="box" class="box">
      <div class="box1">
        <span class="span1"><b>Iron Man</b></span>
        <span class="span2"><b>7500</b></span>
        <span class="span3"><b>Bat Man</b></span>
        <span class="span4"><b>Joker</b></span>
      </div>
      <div class="box2">
        <span class="span1"><b>Shoplifters</b></span>
        <span class="span2"><b>Inception</b></span>
        <span class="span3"><b>Deadpool</b></span>
        <span class="span4"><b>Terminator</b></span>
      </div>
      <button class="spin" @click="spinTheWheel" :disabled="spinning">SPIN</button>
    </div>

    <div id="result">
      {{ finalRestaurant.name }} - {{ finalRestaurant.vicinity }}
    </div>
    <div id="map"></div>

    <p v-if="this.result">Result: {{ result }}</p>
  </div>
</template>
  

<script>

export default {
  data() {
    return {
      spinning: false,
      result: null,
      wheelVisible: true,
      resultRestaurant: [],
      randomNumber: null,
      finalRestaurant: {}
    };
  },
  methods: {
    spinTheWheel() {
      let rand = Math.floor(Math.random() * 2);
      console.log("Random number for recipe or restaurant: " + rand)
      let randResult;
      /*if (rand == 0) {
        randResult = "RANDOM RECIPE";
        this.getRandomRecipe(randResult);
      } else if (rand == 1) {
        randResult = "RANDOM RESTAURANT";
        this.getRandomRestaurants(randResult);
      }*/

      if (!this.spinning) {
        this.spinning = true;
        var x = 1024;
        var y = 9999;
        var deg = Math.round(Math.random() * (x - y)) + y;
        console.log(deg)
        document.getElementById('box').style.transform = "rotate(" + deg + "deg";
        var element = document.getElementById('mainbox');
        element.classList.remove('animate');
        setTimeout(() => {
          element.classList.add('animate');
          const sections = ['Iron Man', '7500', 'Bat Man', 'Joker', 'Shoplifters', 'Inception', 'Deadpool', 'Terminator'];
          const sectionIndex = deg / (360);
          console.log(sectionIndex)
          this.result = sections[sectionIndex];
          this.spinning = false;
          this.wheelVisible = false;
          this.getRandomFood(rand);
        }, 5000);
      }
    },
    getRandomFood(number) {
      // Random getter for recipe
      if (number == 0) {
        console.log("Recipe")


        // Random getter for restaurants
      } else if (number == 1) {
        console.log("Restaurant")

        let randomNumber = Math.floor(Math.random() * 20);
        console.log("Random number: " + randomNumber);

        const mapOptions = {
          center: { lat: 60.20157545248931, lng: 24.965492207916 },
          zoom: 14,
        };

        const map = new google.maps.Map(document.getElementById('map'), mapOptions);

        const request = {
          location: new google.maps.LatLng(60.20157545248931, 24.965492207916),
          radius: 1000,
          type: ['restaurant']
        };

        const service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.resultRestaurant = result;
            console.log(this.resultRestaurant[randomNumber].name);
            //this.finalRestaurant = "Name: " + this.resultRestaurant[randomNumber].name + " Adress: " + this.resultRestaurant[randomNumber].vicinity;
            this.finalRestaurant = this.resultRestaurant[randomNumber];
            console.log(this.finalRestaurant)
            //document.querySelector("#result").innerHTML = this.resultRestaurant[randomNumber].name;
            //for (let i = 0; i < this.resultRestaurant.length; i++) {
            //  console.log(this.resultRestaurant[i]);
            //}
          }
        })
      }
    }
  },
};
</script>
  
<style scoped>
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
</style>


  

 
  