<template>
    <v-card class="income-expense-card">
        <v-card-title class="headline">Income and Expenses</v-card-title>
        <v-card-text>
            <div class="income-section">
                <div class="income-label">Income:</div>
                <div class="income-amount">{{ income }}</div>
            </div>
            <div class="expense-section">
                <div class="expense-label">Expenses:</div>
                <div class="expense-amount">{{ expense }}</div>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
export default {
    props: {
        income: Number,
        expense: Number,
    },
};
</script>
  
<style scoped>
.income-expense-card {
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

.income-section,
.expense-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.income-label,
.expense-label {
    font-weight: bold;
}

.income-amount,
.expense-amount {
    color: #00796b;
    /* Adjust color as needed */
}
</style>
  