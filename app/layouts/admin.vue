<template>
  <v-app >
    <no-ssr><notifications group="admin" /></no-ssr>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
    <v-img src="/images/sidebar.jpg" width="100%" height="100%" position="center center">
    
      <v-layout
      class="fill-height" 
      pt-0
      :class="{'pl-3 pr-3': !miniVariant}"
      :style="{background: backgroudColor}"
      column
      >

          <v-flex
          class="menu-scroll"
          >
            <div class="avatar text-xs-center" :class="{'pa-3':!miniVariant}">
              
              <v-avatar v-if="!miniVariant"
                  color="grey lighten-4"
                >
                  <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                </v-avatar>
                <h1 v-if="!miniVariant" class="text-xs-center white--text" >{{whoami}}</h1>
                <v-flex v-else style="width:80px">
                  <h1  class="text-xs-center pt-3 display-2 white--text"> {{ whoami.substring(0,1) }} </h1>
                </v-flex>
            </div>
            <v-divider class="mt-4"/>
            <v-list>
                <v-list-tile
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.to"
                  router
                  exact
                >
                  <v-list-tile-action>
                    <v-icon class="white--text ">{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content >
                    <v-list-tile-title class=" white--text font-weight-bold"  v-text="item.title" />
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
          </v-flex>

      </v-layout>
    </v-img>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-right="clipped"
      fixed
      app
    >
      <v-btn icon @click="miniVariant = !miniVariant" class="hidden-md-and-down"><v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon></v-btn> 
      <v-btn icon @click="drawer = !drawer" class="black--text hidden-lg-and-up" > <v-icon>menu</v-icon> </v-btn>
      <v-spacer />
      <v-btn
        icon
        @click="logout"
      >
        <v-icon title="Cerrar sesión">call_missed_outgoing</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      backgroudColor: 'rgba(100,100,100,0.1)',
      items: [
        {
          icon: 'apps',
          title: 'Inicio',
          to: '/admin'
        },
        {
          icon: 'description',
          title: 'Noticias',
          to: '/admin/noticias'
        },
        {
          icon: 'filter_vintage',
          title: 'Culturas',
          to: '/admin/cultura'
        },
        {
          icon: 'nature_people',
          title: 'Atractivos',
          to: '/admin/atractivo'
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  methods:{
    async logout() {
            try {
                await this.$store.dispatch('logout')
            } catch (e) {
                this.$notify({
                    group: 'admin',
                    title: 'Error',
                    type: 'error',
                    text: 'No se pudo cerrar sesion'
                });
            }
        },
  },
  computed:{
    whoami(){
      if(this.$store.state.authUser)
        return this.$store.state.authUser.name      
    }
  }
}
</script>
<style scoped lang="stylus">
  @import '../assets/style/admin'
</style>
