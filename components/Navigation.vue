<template>
    <div>
        <v-navigation-drawer v-model="leftDrawer" :mini-variant="miniVariant" :clipped="clipped" app fixed>
            <v-list height="90px">
                <v-list-item class="px-2">
                    <v-list-item-avatar tile size="35" class="ml-1 my-5" v-if="miniVariant">
                        <img src="~/assets/img/cfx-red.svg" />
                    </v-list-item-avatar>
                    <img width="75%" src="~/assets/img/Logo.svg" class="mx-auto py-2 my-2" />
                    <!-- 
                    <v-btn icon @click.stop="miniVariant = !miniVariant" class="d-none d-lg-block">
                        <v-icon color="primary">mdi-chevron-left</v-icon>
                    </v-btn> -->
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item v-for="item in items[$store.state.main.userRole - 1]" :key="item.title" :to="item.to" router
                    exact>
                    <v-list-item-action>
                        <v-icon color="Azul500">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title> {{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <v-list nav router dense>
                    <v-list-item exact @click="() => logout()">
                        <v-list-item-action>
                            <v-icon color="Azul500">mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> Cerrar Sesion</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="clipped" fixed app height="90">
            <v-app-bar-nav-icon @click.stop="leftDrawer = !leftDrawer" class="d-lg-none" />
            <v-btn icon @click.stop="miniVariant = !miniVariant" class="d-none d-lg-block">
                <v-icon color="Rojo300">mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
            <v-toolbar-title class="d-none d-sm-block ml-5">
                <div class="mt-2 text-h6">Bienvenido de nuevo <span class="font-weight-bold Azul500--text">{{
                    $store.state.main.completeName }}</span></div>
                <div class="mb-2 text-overline text-uppercase">Es un gusto tenerte aqui, que deseas hacer?</div>

            </v-toolbar-title>

            <v-spacer />
            <v-btn icon @click.stop="rightDrawer = !rightDrawer" class="mr-2 mr-md-8" v-if="userRole === 3">
                <v-icon color="Azul500">mdi-cart</v-icon>
            </v-btn>
            <v-btn icon @click.stop="rightDrawer = !rightDrawer" class="mr-2 mr-md-8" v-if="userRole === 3">
                <v-icon color="Azul500">mdi-cart</v-icon>
            </v-btn>
        </v-app-bar>

    </div>
</template>

<script>
export default {
    middleware: 'getCookies',
    data() {
        this.pk = process.env.STRIPE_PK;
        return {
            userRole: this.$store.state.main.userRole,
            clipped: false,
            miniVariant: true,
            fixed: false,
            rightDrawer: false,
            leftDrawer: true,
            items: [
                [
                    {
                        icon: 'mdi-home-circle',
                        title: 'Inicio',
                        to: '/',
                    },
                    {
                        icon: 'mdi-view-dashboard',
                        title: 'Tablero',
                        to: '/adminDashboard',
                    },
                    {
                        icon: 'mdi-account-plus',
                        title: 'Nuevos Proveedores',
                        to: '/newProvider',
                    },

                ],
                [
                    {
                        icon: 'mdi-home-circle',
                        title: 'Inicio',
                        to: '/',
                    },
                    {
                        icon: 'mdi-view-dashboard',
                        title: 'Tablero',
                        to: '/providerDashboard',
                    },
                    {
                        icon: 'mdi-account-details',
                        title: 'Perfil',
                        to: '/profile',
                    },
                    {
                        icon: 'mdi-table',
                        title: 'Stock',
                        to: '/stock',
                    },
                    {
                        icon: 'mdi-map-marker',
                        title: 'Ubicaciones',
                        to: '/warehouse',
                    },
                    {
                        icon: 'mdi-account-wrench',
                        title: 'Ordenes',
                        to: '/orders',
                    },

                ],
                [
                    {
                        icon: 'mdi-apps',
                        title: 'Inicio',
                        to: '/',
                    },
                    {
                        icon: 'mdi-cart-outline',
                        title: 'Compara Ya',
                        to: '/buyNow',
                    },
                    {
                        icon: 'mdi-account-details',
                        title: 'Perfil',
                        to: '/profile',
                    },
                    {
                        icon: 'mdi-map-marker',
                        title: 'Direcciones',
                        to: '/locations',
                    },
                    {
                        icon: 'mdi-text-box-multiple-outline',
                        title: 'Mis Pedidos',
                        to: '/myOrders',
                    },
                ],
            ],
            // data for online payments
            lineItems: [
                {
                    price: "",
                    quantity: 1,
                },
            ],
            successURL:
                process.client &&
                `${window.location.origin}${window.location.pathname}?state=success`,
            cancelURL:
                process.client &&
                `${window.location.origin}${window.location.pathname}?state=error`,

            redirectState: "",

        }
    },
    methods: {
        logout() {
            this.$store.commit('main/logout')
        },
        openMenu() {
            this.leftDrawer = !this.leftDrawer
            this.miniVariant = false
        },
        deleteProduct(item) {

            // let product = {
            //     name: item.product.name,
            //     text: item?.product?.name + ' ' + item?.product?.description,
            //     price: parseInt(this.products.cost) + parseInt(item?.cost)
            // }
            this.$store.dispatch('cart/removeItems', item.name)
        },
        payOnline() {
            const totalAmount = this.cartProduct.reduce((total, item) => total + item.price, 0)
            let item = {
                quantity: totalAmount,
                description: 'Pago por Servicio'
            }
            this.priceProductStripe(item);
        },

        // stripe price creation
        async priceProductStripe(item) {
            try {
                let price = await this.$axios.$post("api/payment/payments", item, {
                    headers: { "x-access-token": this.$store.state.main.token },
                    progress: false,
                });
                if (price.priceId) {
                    this.lineItems[0].price = price.priceId;
                    this.$refs.checkoutRef.redirectToCheckout();
                } else {
                    this.message = price.message;
                    this.snackbar = true;
                    this.color = "red darken-3";
                }
            } catch (e) {
                this.message = e.response.data.message;
                this.type = "error";
            }
        },
    },
    computed: {
        cartProduct() {
            return this.$store.state.cart.cart
        }
    }
}
</script>
