<template>
  <div>
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
              <div class="card">
                <BarShow/>
              </div>
            </div>
            <div class="col-9">
              <div class="card">
                <b-tabs content-class="mt-3">
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
    <!--<gmap-map :center="center" :zoom="12" style="width: 100%; height: 400px">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TableDataShow from "@/components/globalComponents/TableDataShowComponents.vue";
import BarShow from "@/components/globalComponents/barComponents.vue"
export default {
  name: "GoogleMap",
  components: {
    TableDataShow,
    BarShow
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
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      const origins = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      };
      this.payload = [];
      this.AllFacility.competitionFacility.forEach((element, index) => {
        if (index < 2) {
          let destinations = {
            lat: element.latitude,
            lng: element.longitude,
          };
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
.rowShowResult {
  padding: 20px;
  align-items: center;
}
</style>