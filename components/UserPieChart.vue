<template>
    <div>
        <v-card class="user-status-pie-chart">
            <v-card-title class="headline">User Status</v-card-title>
            <v-card-text>
                <vue-chartjs-pie :data="chartData" :options="chartOptions" width="200" height="200"></vue-chartjs-pie>
            </v-card-text>
        </v-card>
    </div>
</template>
  
<script>
import { Pie } from "vue-chartjs";

export default {
    extends: Pie,
    data() {
        return {
            chartData: {
                labels: ["Active Users", "Inactive Users"],
                datasets: [
                    {
                        backgroundColor: ["#00796b", "#e57373"], // Colors for active and inactive
                        data: [activeUsers, inactiveUsers], // Replace with your user data
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: "bottom",
                },
            },
        };
    },
    props: {
        activeUsers: Number,
        inactiveUsers: Number,
    },
    watch: {
        activeUsers(newActiveUsers, oldActiveUsers) {
            this.chartData.datasets[0].data[0] = newActiveUsers;
            this.updateChart();
        },
        inactiveUsers(newInactiveUsers, oldInactiveUsers) {
            this.chartData.datasets[0].data[1] = newInactiveUsers;
            this.updateChart();
        },
    },
    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    },
};
</script>
  
<style scoped>
.user-status-pie-chart {
    max-width: 400px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.headline {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
  