<template>
  <img src="@/assets/demo.png" alt="" class="mb-0" height="500px"/>
  <!--<Bar
    :chart-options="chartOptions"
    :chart-data="ShowData()"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />-->
</template>
  
 <!--<script>
import { Bar } from "vue-chartjs/legacy";
import { mapGetters } from "vuex";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    };
  },
  computed: {
    ...mapGetters("showresult", ["CalculateResult"]),
  },
  methods: {
    ShowData() {
      let label = [];
      label.push(this.CalculateResult.competionPriceList[0].facility);
      label.push(this.CalculateResult.competionPriceList[1].facility);
      return {
        labels: [label],
        datasets: [
          { label: label[0], backgroundColor: "#f87979", data: [40, 20] },
          { label: label[1], backgroundColor: "#f87979", data: [40, 20] },
        ],
      };
    },
  },
};
</script>
-->
  