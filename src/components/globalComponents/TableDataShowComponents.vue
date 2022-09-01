<template>
  <div id="TablaShowData">
    <table class="table table-hover">
      <thead>
        <tr>
          <th></th>
          <th scope="col">Company</th>
          <th scope="col">Mileage</th>
          <th scope="col">Facility</th>
          <th scope="col">Trans</th>
          <th scope="col">Fees</th>
          <th scope="col">Disposal</th>
          <th scope="col">TF&D</th>
          <th scope="col">Witness</th>
          <th scope="col">TFD&W</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in ShowTableSelected(type)" :key="index">
          <td>
            <b-form-radio
              class="m-0 remember"
              v-model="check"
              :value="item"
            ></b-form-radio>
          </td>
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
          <td><i class="fa fa-pencil"></i><i class="fa fa-trash"></i></td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["type"],
  data() {
    return {
      check: [],
    };
  },
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

<style lang="scss">
#TablaShowData {
  font-size: 15px;
  thead {
    background: #e7e5e5;
  }
  .nav-link.active {
    color: #03613b !important;
  }
}
</style>