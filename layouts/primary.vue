<template>
    <v-app class="background-container">
        <v-app-bar app color="transparent" class="rounded-navbar mt-3 rounded-lg shadow">
            <v-toolbar-title>
                <img src="~/assets/img/Logo.svg" alt="Carfix logo" />
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
            <Nuxt />
        </v-main>
        <Footer />
    </v-app>
</template>
  
<script>
export default {
    middleware: 'getCookies',
    name: 'PrimaryLayout',
    data() {
        return {
        }
    },
}
</script>
<style lang="css" scoped>
.background-container {
    background-image: url('~/assets/img/background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.rounded-navbar {
    /* background-color: rgba(255, 255, 255, 0.8); */
    width: 80%;
    margin: 0 auto;
    position: absolute;
    /* background-color: #273043 !important; */
    background-color: #fff !important;
}
</style>
  