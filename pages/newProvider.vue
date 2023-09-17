<template>
    <v-container>
        <v-row>
            <v-col>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="Azul500" dark class="mb-2" v-bind="attrs" v-on="on">
                            Agregar Proveedor
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="d-flex justify-center">
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4" lg="6">
                                        <v-text-field v-model="provider.name" label="Nombre Perona/Empresa"
                                            id="name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="6">
                                        <v-text-field v-model="provider.documentNumber" label="Cedula"
                                            id="documentNumber"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="6">
                                        <v-text-field v-model="provider.rucNumber" label="Ruc"
                                            id="rucNumber"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="6">
                                        <v-text-field v-model="provider.email" label="Email" id="email"
                                            type="email"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="6">
                                        <v-text-field v-model="provider.password" label="Contraseña"
                                            id="password"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4" lg="6" v-if="editedIndex !== -1">
                                        <v-select v-model="provider.status" :items="statusItems" label="Estado"
                                            id="status" />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-text>
                            <Alert :message="message" :type="type" v-if="message" />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancelar
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                {{ btnName }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <Table :title="title" :headers="headers" :items="providers" :reload="listProviders" :editItem="editItem" class="mt-3"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    // middleware: "adminAuth",
    data() {
        return {
            // variables
            editedIndex: -1,
            message: "",
            type: "",
            token: this.$store.state.main.token,
            // dialogs
            dialog: false,
            // headers declaration for data table
            headers: [
                { text: "Email", value: "email" },
                // { text: "Contraseña", value: "password" },
                { text: "Nombre", value: "provider.name" },
                { text: "Cedula", value: "provider.documentNumber" },
                { text: "RUC", value: "provider.rucNumber" },
                { text: "Estado", value: "status" },
                { text: "Acciones", value: "actions", sortable: false },
            ],
            // items for ddl status
            statusItems: [
                { text: "Activo", value: true },
                { text: "Inactivo", value: false },
            ],
            // title of the table
            title: "Proveedores",
            //variables for list of complex
            provider: {
                name: "",
                documentNumber: "",
                rucNumber: "",
                email: "",
                password: "",
                status: "",
            },
            // reinitialize variables used to close the modal card
            defaultProvider: {
                name: "",
                documentNumber: "",
                rucNumber: "",
                email: "",
                password: "",
                status: "",
            },
        };
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nuevo Proveedor" : "Editar Proveedor";
        },
        btnName() {
            return this.editedIndex === -1 ? "Crear" : "Editar";
        },
        providers() {
            return this.$store.state.provider.providers;
        },
    },
    created() {
        this.listProviders();
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.providers.indexOf(item);
            this.provider = Object.assign({}, item);
            this.provider.name = item.provider.name
            this.provider.documentNumber = item.provider.documentNumber
            this.provider.rucNumber = item.provider.rucNumber
            this.dialog = true;
        },
        save() {
            if (this.editedIndex > -1) {
                //Edit data
                this.editProvider();
            } else {
                // Create new data
                this.addProvider();
            }
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.provider = Object.assign({}, this.defaultProvider);
                this.editedIndex = -1;
            });
            this.listProviders();
        },

        // API METHODS
        listProviders() {
            this.$store.dispatch("provider/getProviders", this.$store.state.main.token)
        },
        addProvider() {
            const payload = { token: this.token, provider: this.provider };
            this.$store.dispatch("provider/addProvider", payload).then(() => this.close());
        },
        editProvider() {
            const payload = { token: this.token, provider: this.provider };
            console.log('payload', payload)
            this.$store.dispatch("provider/editProvider", payload).then(() => this.close());
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
    },
};
</script>