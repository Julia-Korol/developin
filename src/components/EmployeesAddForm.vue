<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Добавить сотрудника</span>
    </v-card-title>

    <v-card-text>
      <employees-form @submit="save" id="employeesForm"></employees-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Отмена </v-btn>
      <v-btn type="submit" form="employeesForm" color="blue darken-1" text>
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import EmployeesForm from "./EmployeesForm.vue";

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

export default Vue.extend({
  components: { EmployeesForm },
  name: "employee-form",
  methods: {
    save(formData: Employee) {
      this.$emit("saveData", formData);
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped></style>
