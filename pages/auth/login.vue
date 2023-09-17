<template>
  <div class="d-flex flex-row fill-height justify-center align-center ">

    <v-card :style="{
      backgroundColor: '#CB302E',
    }" class=" elevation-0 py-0 pl-0 pr-12 justify-center rounded-lg" width="500">
      <v-card-text :style="{
        backgroundColor: '#273043',
      }" class="ml-auto elevation-0 px-sm-16 py-16" width="200">
        <v-card-title class="mt-10 mb-4 Blanco500--text" style="font-size: 32px">
          Ingreso<br/> Administradores</v-card-title>
        <v-card-text class="px-0 pr-lg-16">
          <v-form @submit.prevent="login">
            <v-text-field v-model="user.email" type="email" label="Correo" id="email" required solo
              prepend-inner-icon="mdi-email-outline"></v-text-field>

            <v-text-field class="my-0" v-model="user.password" type="password" label="Contraseña" id="password" required
              solo prepend-inner-icon="mdi-account-key-outline"></v-text-field>

            <v-btn class="text-capitalize white--text elevation-5" type="submit" style="font-size: 18px" color="Rojo500"
              block>Iniciar Sesión
            </v-btn>
            <br />

            <Notification ref="notification" />
          </v-form>
        </v-card-text>
      </v-card-text>
    </v-card>

  </div>
</template>
<script>
export default {
  middleware: 'loginMiddleware',
  layout: 'primary',
  data() {
    return {
      user: { email: '', password: '' },
    }
  },
  methods: {
    showNotification(message, type, timeout) {
      this.$refs.notification.addToast({
        type: type, // 'success' or 'info', 'warn', 'error'
        // title: "Success",
        content: message, 
        // icon: "check_circle",
        timeout: timeout, // Time in milliseconds before the notification disappears (optional)
      });
    },

    async login() {
      try {
        let user = await this.$axios.$post('api/auth/login', this.user, {
          progress: false,
        })

        const token = user.accessToken
        const userRole = user.role
        const userEmail = user.email
        const userId = user.id
        const completeName = user.completeName
        const personId = user.personId

        const payload = {
          token: token,
          userRole: userRole,
          userEmail: userEmail,
          userId: userId,
          completeName: completeName,
          personId: personId
        }
        this.$store.commit('main/login', payload)
      }
      catch (e) {
        this.showNotification(e.response.data['error'], 'error', 4000)
      }
    },
  },
}
</script>

  