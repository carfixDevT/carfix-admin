<template>
    <v-card elevation="8" style="border-radius: 16px">
        <v-toolbar style="background-color: #122566" dark>
            <v-row>
                <v-col>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                </v-col>
                <v-col>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                        hide-details></v-text-field>
                </v-col>
            </v-row>
        </v-toolbar>
        <v-data-table style="background-color: #e7e9f0" :headers="headers" :items="items" :search="search" elevation="6"
            :header-props="{
                'sort-by-text': 'Filtrar por',
            }" :footer-props="{
    'items-per-page-all-text': 'Todos',
    'items-per-page-text': 'Filas por página',
}">
            <!-- Changing color status -->
            <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="getColor(item.status)" dark>
                    {{ (item.status === true || item.status === "1") ? 'Activo' : 'Inactivo' }}
                </v-chip>
            </template>
            <!-- Table Actions -->
            <template v-slot:no-data>
                <v-btn color="Azul500" outlined class="text-capitalize" @click="reload">
                    Recargar
                </v-btn>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small color="Azul500"  @click="editItem(item)">
                    mdi-file-edit-outline
                </v-icon>
                <!-- <v-icon small color="Rojo500" @click="editItem(item)">
                    mdi-delete-forever
                </v-icon> -->
            </template>
        </v-data-table>
    </v-card>
</template>
  
<script>
export default {
    props: {
        headers: { type: Array },
        items: { type: Array },
        title: { type: String },
        reload: { type: Function },
        editItem: { type: Function },
        assignItem: { type: Function },
        deleteItem: { type: Function },
    },
    data() {
        return {
            search: '',
            text: 'Filtrar por',
        }
    },
    methods: {
        getColor(status) {
            if (status === true || status === "1") {
                return 'green'
            } else {
                return 'red'
            }
        },
    },
}
</script>
  