<template>
  <div id="showResultComponents">
    <div>
      <p class="h2 font-weight-bold text-left mb-3">Calculate a trip</p>
      <div class="card mb-5">
        <div class="container">
          <div class="row rowShowResult">
            <div class="col-3">
              <p class="font-weight-bold text-left mb-0">From address:</p>
              <gmap-autocomplete
                @place_changed="setPlace"
                :options="autocompleteOptions"
                class="form-control"
              >
              </gmap-autocomplete>
            </div>
            <div class="col-3">
              <p class="font-weight-bold text-left mb-0">Waste type:</p>
              <b-form-select
                v-model="mouseHerramientaUsarMasTarde"
                :options="options"
              ></b-form-select>
            </div>
            <div class="col-3">
              <p class="font-weight-bold text-left mb-0">Tons:</p>
              <b-form-input v-model="tons" type="number"></b-form-input>
            </div>
            <div class="col-3">
              <p class="font-weight-bold text-left mb-0">&nbsp;</p>
              <b-button variant="primary" @click="Calculate"
                >Calculate</b-button
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="resultShow">
        <div class="container-fluid">
          <div class="row">
            <div class="col-3">
              <p class="font-weight-bold text-left mb-3">Best offers</p>
              <div class="card">
                <BarShow />
              </div>
            </div>
            <div class="col-9">
              <div class="mb-3">
                <div class="row align-items-center">
                  <div class="col-2">
                    <p class="font-weight-bold text-left mb-0">
                      Show results as
                    </p>
                  </div>
                  <div class="col-1">
                    <b-button
                      class="font-weight-bold"
                      :variant="Tableshow ? 'primary' : 'transparentButton'"
                      @click="ShowResultBox(1)"
                      >Table</b-button
                    >
                  </div>
                  <div class="col-1">
                    <b-button
                      class="font-weight-bold"
                      :variant="Chartshow ? 'primary' : 'transparentButton'"
                      @click="ShowResultBox(2)"
                      >Chart</b-button
                    >
                  </div>
                  <div class="col-1">
                    <b-button
                      class="font-weight-bold"
                      :variant="Mapshow ? 'primary' : 'transparentButton'"
                      @click="ShowResultBox(3)"
                      >Map</b-button
                    >
                  </div>
                </div>
              </div>
              <div class="card">
                <gmap-map
                  :center="center"
                  :zoom="12"
                  style="width: 100%; height: 400px"
                  v-show="Mapshow"
                >
                  <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center = m.position"
                  >
                    <gmap-info-window
                      :opened="true"
                      :options="{
                        pixelOffset: { width: 0, height: 0 },
                        content: `<p>${m.address}</p><p>Destination Address <br>${m.position.lat} , ${m.position.lng}</p><p>Name <br>${m.name}</p>`,
                      }"
                    ></gmap-info-window>
                  </gmap-marker>
                </gmap-map>
                <b-tabs content-class="mt-3 tabsShow" v-show="Tableshow">
                  <b-tab title="All results" active>
                    <TableDataShow type="1" />
                  </b-tab>
                  <b-tab
                    title="Covanta"
                    :disabled="
                      CalculateResult.covantaPriceList.length > 0 ? false : true
                    "
                  >
                    <TableDataShow type="2"
                  /></b-tab>
                  <b-tab
                    title="Competition"
                    :disabled="
                      CalculateResult.competionPriceList.length > 0
                        ? false
                        : true
                    "
                  >
                    <TableDataShow type="3"
                  /></b-tab>
                </b-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* 
azul covanta
rojo competencia
*/
import { mapActions, mapGetters } from "vuex";

import TableDataShow from "@/components/globalComponents/TableDataShowComponents.vue";
import BarShow from "@/components/globalComponents/barComponents.vue";
export default {
  name: "GoogleMap",
  components: {
    TableDataShow,
    BarShow,
  },
  data() {
    return {
      currentPlace: null,
      autocompleteOptions: {
        componentRestrictions: {
          country: ["US"],
        },
      },
      data: null,
      mouseHerramientaUsarMasTarde: null,
      options: [{ value: "CDSWS", text: "CDSWS" }],
      tons: null,
      payload: [],
      resultShow: false,
      markers: [],
      center: {},
      Tableshow: true,
      Chartshow: false,
      Mapshow: false,
    };
  },
  computed: {
    ...mapGetters("showresult", ["AllFacility", "CalculateResult"]),
  },
  mounted() {
    this.getAllFacility(0);
  },

  methods: {
    ...mapActions("showresult", ["getAllFacility", "SendCalculate"]),
    ShowResultBox(status) {
      this.Tableshow = status === 1 ? true : false;
      this.Chartshow = status === 2 ? true : false;
      this.Mapshow = status === 3 ? true : false;
    },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      this.markers = [];
      this.center = {};
      const origins = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      };
      this.center = origins;
      this.payload = [];
      this.markers.push({
        position: origins,
        address: this.currentPlace.name,
        name: "Search",
      });
      this.AllFacility.competitionFacility.forEach((element, index) => {
        if (index < 5) {
          let destinations = {
            lat: element.latitude,
            lng: element.longitude,
          };
          this.markers.push({
            position: destinations,
            address: element.address,
            name: element.name,
          });
          this.calculateDistances(origins, destinations, element);
        }
      });
    },
    Calculate() {
      if (this.currentPlace) {
        this.payload.forEach((element, index) => {
          this.payload[index].tons = this.tons;
        });
        this.SendCalculate(this.payload);
        this.currentPlace = null;
        this.resultShow = true;
      }
    },

    calculateDistances(origins, destinations, facility) {
      const google = window.google;
      let p1 = new google.maps.LatLng(origins.lat, origins.lng);
      let p2 = new google.maps.LatLng(destinations.lat, destinations.lng);
      let service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [p1],
          destinations: [p2],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false,
        },
        (response) => {
          this.payload.push({
            //distance: response.rows[0].elements[0].distance.text,
            distance: response.rows[0].elements[0].distance.value,
            tons: this.tons,
            facility: facility,
          });
        }
      );
    },
  },
};
</script>
<style lang="scss">
#showResultComponents {
  .card {
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(130, 136, 139, 0.1);
    border-radius: 0;
  }
  nav.nav-tabs{
    border: none;
  }
  .nav-link.active {
    border-bottom: 2px solid #03613b;
    color: #03613b;
  }
  .nav-link.disabled{
    color: #82888b;
  }
  .nav-link {
    font-weight: 600;
    font-size: 14px;
    border: none;
    color: #000000;
  }
  .rowShowResult {
    padding: 20px;
    align-items: center;
  }
  .btn-transparentButton {
    color: #1f569f;
  }
}
</style>