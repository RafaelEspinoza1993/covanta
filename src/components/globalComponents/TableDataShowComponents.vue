<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Company</th>
        <th scope="col">Mileage</th>
        <th scope="col">Facility</th>
        <th scope="col">Trans</th>
        <th scope="col">Fees</th>
        <th scope="col">Disposal</th>
        <th scope="col">TF&D</th>
        <th scope="col">Witness</th>
        <th scope="col">TFD&W</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in ShowTableSelected(type)" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.costPerMile }}</td>
        <td>{{ item.facility }}</td>
        <td>{{ item.totalTransportationCost }}</td>
        <td>{{ item.fees }}</td>
        <td>{{ item.disposalCostWithEis }}</td>
        <td>{{ item.tfd }}</td>
        <td>
          {{ item.witnessFee }}
        </td>
        <td>{{ item.tfdw }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["type"],
  computed: {
    ...mapGetters("showresult", ["AllFacility", "CalculateResult"]),
  },
  methods: {
    ShowTableSelected(payload) {
      let response;
      switch (payload) {
        case 2:
          response = this.CalculateResult.covantaPriceList;
          break;
        case 3:
          response = this.CalculateResult.competionPriceList;
          break;

        default:
          response = this.CalculateResult.competionPriceList.concat(
            this.CalculateResult.covantaPriceList
          );
          break;
      }
      return response;
    },
  },
};
</script>

<style>
</style>