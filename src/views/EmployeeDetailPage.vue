<template>
  <v-card class="mx-auto mt-14" max-width="800" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-7">
          {{ employeeName }}
        </v-list-item-title>

        <v-list-item-subtitle class="text-subtitle-1 mb-3">
          <span class="font-weight-bold">Должность:</span>
          {{ currentEmployee.position }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-subtitle-1 mb-3">
          <span class="font-weight-bold">Оклад:</span>
          {{ currentEmployee.salary }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-subtitle-1 mb-3">
          <span class="font-weight-bold">Дата выхода на работу:</span>
          {{ currentEmployee.workStartDay }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-subtitle-1 mb-3">
          <span class="font-weight-bold">Ставка:</span>
          {{ currentEmployee.stake }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-subtitle-1 mb-3">
          <span class="font-weight-bold">Трудовая книжка сдана:</span>
          {{ currentEmployee.isWorkBookSubmitted ? "да" : "нет" }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  fullName: string;
  position: string;
  isWorkBookSubmitted: boolean;
  salary: string;
  workStartDay: string;
  stake: string;
}

interface EmployeeData {
  employees: Employee[];
  currentEmployee: Employee | undefined;
}

export default Vue.extend({
  name: "employee-detail-page",
  data(): EmployeeData {
    return {
      employees: [],
      currentEmployee: {
        id: "",
        lastName: "",
        firstName: "",
        fullName: "",
        position: "",
        isWorkBookSubmitted: false,
        salary: "",
        workStartDay: "",
        stake: "",
      },
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    employeeName() {
      return (
        this.currentEmployee.lastName +
        " " +
        this.currentEmployee.firstName +
        " " +
        this.currentEmployee.fullName
      );
    },
  },
  methods: {
    initialize() {
      if (localStorage.getItem("employees")?.length) {
        const employees = localStorage.getItem("employees");
        if (employees) {
          this.employees = JSON.parse(employees);

          const employeeId = this.$route.params.id;

          this.currentEmployee = this.employees.find(
            (employee) => employee.id === employeeId
          );
        }
      }
    },
  },
});
</script>

<style scoped></style>
