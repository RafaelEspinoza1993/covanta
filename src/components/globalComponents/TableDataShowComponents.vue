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
        <td>Nombre</td>
        <td>{{ item.costPerMile }}</td>
        <td>facility pedir dexter</td>
        <td>{{ item.totalTransportationCost }}</td>
        <td>aaaa</td>
        <td>{{ item.disposalCostWithEis }}</td>
        <td>
          suma de Fees totalTransportationCost disposalCostWithEis pedir a
          dexter
        </td>
        <td>pedir a dexter de la tabla de los facility</td>
        <td>suma de los 4 valores (trans, fees, disposal, witness)</td>
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
      let response = [];
      switch (payload) {
        case 2:
          response = this.CalculateResult.covantaPriceList;
          break;
        case 3:
          response = this.CalculateResult.competionPriceList;
          break;

        default:
          response.push(this.CalculateResult.competionPriceList);
          response.push(this.CalculateResult.covantaPriceList);
          break;
      }
      console.log(response);
      return response;
    },
  },
};
</script>

<style>
</style>