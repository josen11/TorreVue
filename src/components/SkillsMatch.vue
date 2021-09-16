<template>
  <v-container fluid>
    <v-row dense>
      <!-- Overlay-->
      <v-col cols="12">
        <div class="text-center">
          <v-overlay :value="overlay">
            <v-progress-circular
              indeterminate
              size="64"
              @click="overlay = false"
            ></v-progress-circular>
          </v-overlay>
        </div>
      </v-col>
      <!-- You -->
      <v-col cols="12" md="5" sm="12" lg="5" xs="12">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <p style="font-size: 30px" class="mb-0">You</p>
          </v-col>
          <v-col cols="12">
            <v-card mx-auto outlined>
              <v-row>
                <v-col cols="12" class="mb-0 pb-0">
                  <v-autocomplete
                    v-model="idperson"
                    :items="people"
                    solo-inverted
                    flat
                    hide-details=true
                    :filter="customFilter"
                    item-text="name"
                    item-value="id"
                    label="Search you ..."
                    @change="getPersonSkills"
                    class="pb-0"
                  >
                    <template v-slot:item="data">
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="data.item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="data.item.id"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <div class="px-4">
                    <p style="font-size: 12px" class="mb-0" v-if="skills"> {{name}}  skills:</p> 
                    <p style="font-size: 12px" class="mb-0" v-else>Select a person to show the skills:</p> 
                    <v-chip-group column>
                      <v-chip small v-for="skill in skillsperson">
                        {{ skill.name }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!--Jobs-->
      <v-col cols="12" md="7" sm="12" lg="7" xs="12">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <p style="font-size: 30px" class="mb-0">Jobs</p>
          </v-col>
          <v-col cols="12">
            <v-card mx-auto outlined>
              <v-row>
                <v-col cols="12" class="mb-0 pb-0">
                  <v-autocomplete
                    v-model="idjob"
                    :items="jobs"
                    solo-inverted
                    flat
                    hide-details=true
                    :filter="customFilter"
                    item-text="name"
                    item-value="id"
                    label="Search jobs ..."
                    @change="getJobSkills"
                    class="pb-0"
                  >
                    <template v-slot:item="data">
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="data.item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="data.item.id"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <div class="px-4">
                    <p style="font-size: 12px" class="mb-0"> Skills:</p> 
                    <v-chip-group column>
                      <v-chip small v-for="skill in skillsjob">
                        {{ skill.name }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :color="color">
        <v-icon dark class="pr-5">{{ icon }}</v-icon>
        {{ error }}
        <v-spacer></v-spacer>
        <v-btn color="white" text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
//Importamos Axios
import axios from "axios";
import underscore from "vue-underscore";
//Nuestro codigo Vue
export default {
  //============== Data
  data() {
    return {
      people: [],
      skillsperson: [],
      skills:false,
      name:"",
      idperson: "",
      overlay: false,
      snackbar: false,
      color: "#2A3B4D",
      icon: "mdi-thumb-up",
      error: null,
      idjob:"",
      jobs:[],
      skillsjob:[]
    };
  },
  //============== Created
  created() {
    let me = this;
    me.selectpeople();
    me.selectjobs();
    // Add a request interceptor
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        me.overlay = true;
        return config;
      },
      function (error) {
        // Do something with request error
        me.overlay = false;
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause me function to trigger
        // Do something with response data
        me.overlay = false;
        //me.overlay=false;
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause me function to trigger
        // Do something with response error
        return Promise.reject(error);
        me.overlay = false;
      }
    );
  },
  //============== Computed
  computed: {},
  //============== Methods
  methods: {
    selectpeople() {
      let me = this;
      me.overlay = true;
      me.people = [];
      axios
        .post(
          "https://search.torre.co/people/_search/?offset=1&size=100&aggregate=true"
        )
        .then(function (response) {
            me.people = me.createJSONPeople(response.data.results);
            //console.log(me.people);
            me.overlay = false;
        })
        .catch(function (error) {
          console.log(error.response);
        });
    },
    selectjobs() {
      let me = this;
      me.overlay = true;
      me.jobs = [];
      axios
        .post(
          "https://search.torre.co/opportunities/_search/?offset=1&size=100&aggregate=true"
        )
        .then(function (response) {
            me.jobs = me.createJSONJob(response.data.results);
            me.overlay = false;
        })
        .catch(function (error) {
          console.log(error.response);
        });
    },
    createJSONPeople(data) {
      let me = this;
      let datafinal = [];
      data.forEach((item, index) => {
        let obj;
        obj = {
          id: item.username,
          name: item.name,
          skills: item.skills,
        };
        datafinal.push(obj);
      });
      return datafinal;
    },
    createJSONJob(data) {
      let me = this;
      let datafinal = [];
      data.forEach((item, index) => {
        let obj;
        obj = {
          id: item.id,
          name: item.objective,
          skills: item.skills,
        };
        datafinal.push(obj);
      });
      return datafinal;
    },
    getPersonSkills() {
      let me = this;
      let person = this.$_.findWhere(me.people, { id: me.idperson });
      me.skillsperson = person.skills;
      me.name= person.name.slice(0,person.name.indexOf(" "))+'\'s';
      me.skills=true;
    },
    getJobSkills() {
      let me = this;
      let job = this.$_.findWhere(me.jobs, { id: me.idjob });
      me.skillsjob = job.skills;
      //me.name= person.name.slice(0,person.name.indexOf(" "))+'\'s';
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.id.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
};
</script>
<style scoped>
* {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 300;
}
</style>