<template>
    <div>
        <IncomeExpenseCard :income="income" :expense="expense" />
        <UserPieChart :active-users="activeUsers" :inactive-users="inactiveUsers" />
    </div>
</template>
  
<script>
import IncomeExpenseCard from '@/components/IncomeExpenseCard.vue'; // Update the path
import UserPieChart from '@/components/userPieChart.vue'; // Update the path
export default {
    components: {
        IncomeExpenseCard, UserPieChart
    },
    data() {
        return {
            income: 1000, // Replace with your income data
            expense: 500, // Replace with your expense data
            activeUsers: 50, // Replace with your actual data
            inactiveUsers: 30, // Replace with your actual data
        };
    },
};
</script>
  