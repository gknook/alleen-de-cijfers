<template>
  <div class="home">
    <h1 class="font-extrabold text-6xl text-gray-800 mb-2">
      Alleen de
      <span class="font-mono text-blue-600 tracking-tighter">cijfers</span>
    </h1>
    <h2 class="text-gray-400 mb-4">
      Geen nieuws, geen bullshit, gewoon de cijfers vanaf het moment dat ze
      beschikbaar zijn
    </h2>
    <CasesToday
      :newCasesToday="newCases"
      :newCasesYesterday="newCasesYesterday"
    />
    <button v-on:click="getCovidData">Get Covid Reports</button>
    <!-- <div>{{ covidReports[0] }}</div>
    <p>Vandaag: {{ dateToday }}</p>
    <p>Gisterochtend: {{ dateYesterday }}.</p>
    <p>Testtijd: {{ dateTest }}</p>
    <p>{{ covidReports.length }} // {{ covidReportsToday.length }}</p>
    <p>All cases: {{ casesTotal }}</p>
    <p>New cases: {{ newCases }}</p>
    <p>Cases yesterday: {{ newCasesYesterday }}</p> -->
  </div>
</template>

<script>
// @ is an alias to /src
import CasesToday from "@/components/CasesToday.vue";

export default {
  name: "Home",
  components: {
    CasesToday
  },
  data() {
    return {
      covidReports: [],
      covidReportsToday: [],
      covidReportsYesterday: [],
      casesTotal: 0,
      newCases: 0,
      newCasesYesterday: 0,
      dateToday: new Date().getTime(),
      dateTest: new Date().getTime(),
      dateYesterday: new Date()
    };
  },
  computed: {},
  created() {
    this.setYesterday();
    this.setToday();
  },
  methods: {
    getCovidData() {
      fetch(
        // "https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.json"
        "./COVID-19_aantallen_gemeente_per_dag.json"
      )
        .then(response => response.json())
        .then(data => {
          this.covidReports = data;
          this.covidReportsToday = data.filter(
            cC => new Date(cC.Date_of_publication).getTime() >= this.dateToday
          );
          this.covidReportsYesterday = data.filter(
            cC =>
              new Date(cC.Date_of_publication).getTime() >= this.dateYesterday
          );
          this.dateTest = new Date(
            this.covidReports[0].Date_of_publication
          ).getTime();
          this.newCases = this.covidReportsToday.reduce(
            (acc, cases) => acc + cases.Total_reported,
            0
          );
          this.newCasesYesterday =
            this.covidReportsYesterday.reduce(
              (acc, cases) => acc + cases.Total_reported,
              0
            ) - this.newCases;
          this.casesTotal = this.covidReports.reduce(
            (acc, cases) => acc + cases.Total_reported,
            0
          );
        });
    },
    setToday() {
      this.dateToday = new Date(this.dateToday).setHours(0);
    },
    setYesterday() {
      this.dateYesterday = new Date().setDate(this.dateYesterday.getDate() - 1);
      console.log(this.dateYesterday);
      this.dateYesterday = new Date(this.dateYesterday).setHours(0);
    }
  }
};
</script>
