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
            <p>{{ state }}</p>
          </v-overlay>
        </div>
      </v-col>
      <!-- You -->
      <v-col cols="12" md="5" sm="12" lg="5" xs="12">
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12"
            lg="12"
            xs="12"
            class="d-flex justify-center my-0 py-0"
          >
            <p style="font-size: 30px" class="mb-0">You</p>
          </v-col>
          <!--<v-col class="d-flex justify-center my-0 py-0">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn rounded dark v-bind="attrs" v-on="on" @click="matchSkills"
                  ><v-icon>mdi-abacus</v-icon>
                </v-btn>
              </template>
              <span>Match!!</span>
            </v-tooltip>
          </v-col>-->
          <v-col
            cols="12"
            md="12"
            sm="12"
            lg="12"
            xs="12"
            class="d-flex justify-center"
          >
            <v-card mx-auto outlined>
              <v-row class="pa-4">
                <v-col
                  cols="11"
                  md="11"
                  sm="11"
                  lg="11"
                  xs="11"
                  class="d-flex justify-center"
                >
                  <!-- -->
                  <v-autocomplete
                    v-model="idperson"
                    :items="people"
                    solo-inverted
                    flat
                    hide-details="true"
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
                <v-col
                  cols="1"
                  md="1"
                  sm="1"
                  lg="1"
                  xs="1"
                  class="d-flex justify-center"
                >
                  <v-btn
                    x-small
                    fab
                    dark
                    class="mt-2"
                    @click.stop="openDialog1"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="450"
                    v-model="dialog1"
                  >
                    <v-card>
                      <v-toolbar dark>Add a new people by username</v-toolbar>
                      <v-card-text>
                        <v-form ref="form1" v-model="validForm1">
                          <!-- lazy-validation-->
                          <v-row class="pa-4">
                            <v-col
                              cols="10"
                              md="10"
                              sm="10"
                              lg="10"
                              xs="10"
                              class="d-flex justify-center"
                            >
                              <v-text-field
                                label="Username"
                                v-model="username"
                                placeholder="jotasen11"
                                :rules="[validatePersoninList, rules.required]"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="1"
                              md="1"
                              sm="1"
                              lg="1"
                              xs="1"
                              class="d-flex justify-center"
                            >
                              <v-btn
                                x-small
                                fab
                                dark
                                class="mt-4"
                                @click="addPerson"
                              >
                                <v-icon dark> mdi-plus </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog1 = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
                <!-- All Skill after matched-->
                <v-col cols="12" md="12" sm="12" lg="12" xs="12">
                  <div class="px-4">
                    <p style="font-size: 12px" class="mb-0" v-if="skills">
                      {{ name }} skills:
                    </p>
                    <p style="font-size: 12px" class="mb-0" v-else>
                      Select a person to show the skills:
                    </p>
                    <v-chip-group column>
                      <v-chip
                        small
                        :dark="skill.dark"
                        :outlined="skill.outlined"
                        v-for="skill in skillspersonfinal"
                        :key="skill.index"
                      >
                        {{ skill.skill }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-col>
                <!-- All Skill-->
                <!--<v-col cols="12" md="12" sm="12" lg="12" xs="6">
                  <div class="px-4">
                    
                    <v-chip-group column>
                      <v-chip small v-for="skill in skillsperson" :key="skill.index">
                        {{ skill.name }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-col>-->
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!--Jobs-->
      <v-col cols="12" md="7" sm="12" lg="7" xs="12">
        <v-row>
          <v-col cols="12" class="d-flex justify-center my-0 py-0">
            <p style="font-size: 30px" class="mb-0">Job(s)</p>
          </v-col>
          <!-- <v-col class="d-flex justify-center my-0 py-0">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn rounded dark v-bind="attrs" v-on="on" @click="matchSkills"
                  ><v-icon>mdi-abacus</v-icon>
                </v-btn>
              </template>
              <span>Match!!</span>
            </v-tooltip>
          </v-col>-->
          <v-col cols="12">
            <v-card mx-auto outlined>
              <v-row class="pa-4">
                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                  lg="12"
                  xs="12"
                  class="d-flex justify-center"
                >
                  <v-autocomplete
                    v-model="idjob"
                    :items="jobs"
                    solo-inverted
                    flat
                    chips
                    multiple
                    hide-details="true"
                    :filter="customFilter"
                    item-text="name"
                    item-value="id"
                    label="Search jobs ..."
                    @change="getJobSkills"
                    class="pb-0"
                    @input="searchInput = null"
                    :search-input.sync="searchInput"
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
                    <template v-slot:selection="data">
                      <v-chip
                        small
                        dense
                        class="mb-1 mt-1"
                        close
                        @click:close="remove(data.item)"
                      >
                        <span>{{ data.item.name }}</span>
                      </v-chip>
                    </template>
                  </v-autocomplete>
                </v-col>
                <!--<v-col
                  cols="1"
                  md="1"
                  sm="1"
                  lg="1"
                  xs="1"
                  class="d-flex justify-center"
                >
                  <v-btn x-small fab dark class="mt-2">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                     <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="450"
                    v-model="dialog1"
                  >
                    <v-card>
                      <v-toolbar dark>Add a new job by id</v-toolbar>
                      <v-card-text>
                        <v-form ref="form2" v-model="validForm2">

                          <v-row class="pa-4">
                            <v-col
                              cols="10"
                              md="10"
                              sm="10"
                              lg="10"
                              xs="10"
                              class="d-flex justify-center"
                            >
                              <v-text-field
                                label="Job id"
                                v-model="jobid"
                                placeholder="ZWX4kDvW"
                                :rules="[validateJobinList, rules.required]"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="1"
                              md="1"
                              sm="1"
                              lg="1"
                              xs="1"
                              class="d-flex justify-center"
                            >
                              <v-btn
                                x-small
                                fab
                                dark
                                class="mt-4"
                                @click="addJob"
                              >
                                <v-icon dark> mdi-plus </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog1 = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>-->
                <!-- All Skills after matched-->
                <v-col cols="12" md="12" sm="12" lg="12" xs="6">
                  <div class="px-4">
                    <p style="font-size: 12px" class="mb-0">Skills:</p>
                    <v-chip-group column>
                      <v-chip
                        small
                        :dark="skill.dark"
                        :outlined="skill.outlined"
                        v-for="skill in skillsjobfinal"
                        :key="skill.index"
                      >
                        {{ skill.skill }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-col>
                <!--All Skills
                <v-col>
                  <div class="px-4">
                    <v-chip-group column>
                      <v-chip
                        small
                        v-for="skill in skillsjob"
                        :key="skill.index"
                      >
                        {{ skill }}
                      </v-chip>
                    </v-chip-group>
                  </div> </v-col
                >-->
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :color="color">
        {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
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
      skillspersonfinal: [],
      skills: false,
      name: "",
      idperson: "",
      overlay: false,
      snackbar: false,
      color: "#2A3B4D",
      icon: "mdi-thumb-up",
      error: null,
      errorMessages: "",
      idjob: [],
      jobs: [],
      skillsjob: [],
      skillsjobunique:[],
      skillsjobfinal: [],
      state: "",
      dialog1: false,
      dialog2: false,
      username: "",
      jobid: "",
      validForm1: false,
      switch1: true,
      rules: {
        required: (v) => !!v || "This field is required",
      },
      searchInput: null,
    };
  },
  //============== Created
  created() {
    let me = this;
    me.selectpeople();
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
  computed: {
    //============== Computed
  },
  //============== Methods
  methods: {
    //Nice use Method as Custom rule
    //https://stackoverflow.com/questions/58445957/how-to-add-custom-validation-which-calls-an-api-in-vuetify-forms
    validatePersoninList() {
      let me = this;
      let person = this.$_.findWhere(me.people, { id: me.username });
      if (person == null) return true;
      else return "Person is already added";
    },
    validateJobinList() {
      let me = this;
      let job = this.$_.findWhere(me.jobs, { id: me.jobid });
      if (job == null) return true;
      else return "Job is already added";
    },
    validateForm1() {
      this.$refs.form1.validate();
    },
    validateForm2() {
      this.$refs.form2.validate();
    },
    clearForm1() {
      //Great solution to avoid vue-warm
      // https://stackoverflow.com/questions/61334724/vuetify-refs-form-reset-and-refs-form-resetvalidation-giving-errors
      if (this.$refs["form1"]) this.$refs.form1.reset();
    },
    clearForm2() {
      if (this.$refs["form2"]) this.$refs.form1.reset();
    },
    openDialog1() {
      let me = this;
      me.dialog1 = true;
      me.clearForm1();
    },
    openDialog2() {
      let me = this;
      me.dialog2 = true;
      me.clearForm2();
    },
    selectpeople() {
      let me = this;
      me.overlay = true;
      me.state = "Retrieving people data (100 items) ...";
      me.people = [];
      axios
        .post(
          "https://search.torre.co/people/_search/?offset=1&size=50&aggregate=true"
        )
        .then(function (response) {
          me.people = me.createJSONPeople(response.data.results);
          //console.log(me.people);
          me.selectjobs();
        })
        .catch(function (error) {
          console.log(error.response);
        });
    },
    selectjobs() {
      let me = this;
      me.overlay = true;
      me.state = "Retrieving jobs data (500 items) ...";
      me.jobs = [];
      axios
        .post(
          "https://search.torre.co/opportunities/_search/?offset=1&size=50&aggregate=true"
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
    addPerson() {
      let me = this;
      me.validateForm1();
      if (me.validForm1 == true) {
        me.addPersonFromAPI();
      }
    },
    addPersonFromAPI() {
      let me = this;
      me.overlay = true;
      me.state = "Retrieving person data ...";
      //Nice https://www.youtube.com/watch?v=hbcnZ_GokBA
      var config = {
        method: "get",
        //url: "https://bio.torre.co/api/bios/jotasen11",
        url: "http://localhost:8080/api/bios/" + me.username,
        responsetype: "document",
      };
      axios(config)
        .then(function (response) {
          const jsonfinal = JSON.parse(JSON.stringify(response.data));
          me.people.push({
            id: jsonfinal.person.publicId,
            name: jsonfinal.person.name,
            skills: jsonfinal.strengths,
          });
          me.color = "#2A3B4D";
          me.icon = "mdi-thumb-up";
          me.error = "New person added";
          me.snackbar = true;
        })
        .catch(function (error) {
          me.error = "Username invalid";
          me.color = "#E53935";
          me.icon = "mdi-alert";
          me.snackbar = true;
        });
      me.overlay = false;
    },
    getPersonSkills() {
      let me = this;
      let person = this.$_.findWhere(me.people, { id: me.idperson });
      me.skillsperson = person.skills;
      me.name = person.name.slice(0, person.name.indexOf(" ")) + "'s";
      me.skills = true;
      me.matchSkills();
    },
    getJobSkills() {
      let me = this;
      me.skillsjob = [];
      me.skillsjobunique = [];
      me.idjob.forEach((element) => {
        let job = this.$_.findWhere(me.jobs, { id: element });
        job.skills.forEach((j) => {
          me.skillsjob.push(j.name);
        });
      });
      console.log("All skills");
      console.log(me.skillsjob);
     
      me.skillsjobunique= me.uniqueValues(me.skillsjob);
      console.log("All unique skills");
      console.log(me.skillsjobunique);
      me.matchSkills();
    },
    JSONtoArray(datajson) {
      let array = [];
      datajson.forEach((item, index) => {
        array.push(item.name);
      });
      return array;
    },
    matchSkills() {
      let me = this;
      me.skillspersonfinal = [];
      me.skillsjobfinal = [];
      //Convertimos array simple los array json de skills.
      let array1 = this.JSONtoArray(me.skillsperson);
      //let array2 = this.JSONtoArray(me.skillsjob);

      //Identificamos los que no cumplen entre persona y trabajo, dejando los missed de persona
      let missedskillsperson = this.$_.difference(array1, me.skillsjobunique);
      //Identificamos los que no cumplen entre trabajo y persona, dejando los misssed de trabajo
      let missedskillsjob = this.$_.difference(me.skillsjobunique, array1);

      //Identificamos los que coinciden de persona
      let matchedskillsperson = this.$_.difference(array1, missedskillsperson);
      //Identificamos los que coinciden de job
      let matchedskillsjob = this.$_.difference(me.skillsjobunique, missedskillsjob);

      // consolidamos skill personas final
      matchedskillsperson.forEach((element) =>
        me.skillspersonfinal.push({
          skill: element,
          dark: true,
          outlined: false,
          color: "black",
        })
      );
      missedskillsperson.forEach((element) =>
        me.skillspersonfinal.push({
          skill: element,
          dark: false,
          outlined: true,
          color: "white",
        })
      );

      // consolidamos skill jobs final
      matchedskillsjob.forEach((element) =>
        me.skillsjobfinal.push({
          skill: element,
          dark: true,
          outlined: false,
          color: "black",
        })
      );
      missedskillsjob.forEach((element) =>
        me.skillsjobfinal.push({
          skill: element,
          dark: false,
          outlined: true,
          color: "white",
        })
      );

      //Nice Join o array in ES6
      //me.skillspersonfinal = [...me.matchedskillsperson, ...missedskillsperson]
    },
    //:dark="true" :color="black" :outlined="false"
    getstyleskill(item, data) {
      let me = this;
      if (data.indexOf(item)) return true;
      else return false;
    },
    getcolorskill(item, data) {
      let me = this;
      if (me.data.indexOf(item)) return "back";
      else return "white";
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.id.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    remove(item) {
      let me = this;
      const index1 = this.idjob.indexOf(item.id);
      if (index1 >= 0) this.idjob.splice(index1, 1);
      me.getJobSkills();
    },
    //Nice https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    uniqueValues(data) {
      let unique= data.filter(this.onlyUnique);
      return unique;
    }
  },
};
</script>
<style scoped>
* {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 300;
}
</style>