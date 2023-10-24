<template>
    <v-card class="rounded-xl pa-4 shadow-xl" color="Azul500" dark @click="redirect(to)" min-width="180" min-height="250"
        max-height="250">
        <v-card-title class="align-center">
            <v-avatar tile size="35" class="mr-2">
                <img src="~/assets/img/cfx-red.svg" />
            </v-avatar>
            <span class="text-h6 font-weight-bold">{{ title }}</span>
        </v-card-title>

        <v-card-text class="text-caption font-weight-bold Cyan500--text p-2">
            {{ text }}
        </v-card-text>
        <v-divider class="mx-5"></v-divider>
        <v-card-actions>
            <v-btn class="mt-2 white--text" :to="to" outlined small>
                Ver
                <v-icon right dark>mdi-arrow-right-bold-hexagon-outline</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
  
<script>
export default {
    props: {
        title: { type: String },
        text: { type: String },
        to: { type: String },
    },
    methods: {
        redirect(to) {
            this.$router.push(to);
        },
    },
};
</script>
  
<style lang="scss" scoped></style>
  