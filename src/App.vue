<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      :width="200"
      permanent
      expand-on-hover
      dark
    >
      <v-list dense nav>
        <v-list-item link :to="{path:'/match'}">
          <v-list-item-icon>
            <v-icon>mdi-abacus</v-icon>
          </v-list-item-icon>
          <v-list-item-title><span>Skills Match</span></v-list-item-title>
        </v-list-item>
        <v-list-item link :to="{path:'/roadmap'}">
          <v-list-item-icon>
            <v-icon>mdi-flag-checkered</v-icon>
          </v-list-item-icon>
          <v-list-item-title><span>Skills Roadmap</span></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
    <!-- color="#2A3B4D" -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark>
      <v-chip class="ma-2" large outlined>
        <v-icon left large class="ma-5"> mdi-abacus </v-icon>
        <span style="font-size: 30px" class="mr-3">Skills Match and Plan <small>v1.0</small>  </span>
      </v-chip>
      <v-spacer />
    </v-app-bar>
    <v-content class="grey lighten-5">
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
          <!--<loader></loader>-->
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer>
      <v-spacer></v-spacer>
      <div>
        JProjects - Torre Technical Test &copy; {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    dialog: false,
    drawer: null,
    right: null,
  }),
};
</script>
<style scoped>
* {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 300;
}
.titulo {
  font-size: 20px;
}
.my-input input {
  text-transform: uppercase;
}
</style>
