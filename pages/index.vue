<template>
  <v-container class="pa-10">
    <v-card class="mx-auto d-sm-none" flat>
      <v-card-text>
        <p class="text-h6">Bienvenido de nuevo <span class="font-weight-bold Azul500--text">{{
          $store.state.main.completeName }}</span></p>
        <p class="text-overline text-uppercase">Es un gusto tenerte aquí, ¿qué deseas hacer?</p>
      </v-card-text>
    </v-card>

    <v-row dense class="mt-5">
      <v-col v-for="item in items[$store.state.main.userRole - 1]" :key="item.title" cols="12" sm="6" md="4" lg="3">
        <ActionCard :title="item.title" :text="item.text" :to="item.to" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'getCookies',
  data() {
    return {
      completeName: this.$store.state.main.completeName,
      items: [
        [
          {
            title: 'Sistema',
            text: 'Ver el aplicativo y su funcionamiento',
            to: '/adminDashboard'
          },
          {
            title: 'Proveedores',
            text: '¡Crea nuevos proveedores ya!',
            to: '/newProvider'
          },
          // Add more items as needed
        ],
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
