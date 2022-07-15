<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Редактировать сотрудника</span>
    </v-card-title>

    <v-card-text>
      <employees-form
        @submit="save"
        :currentEmployee="currentEmployee"
        id="employeesEditForm"
      ></employees-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Отмена </v-btn>
      <v-btn type="submit" form="employeesEditForm" color="blue darken-1" text>
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

interface EmployeeFormData {
  formData: Employee;
  inputRules: [(v: string) => string | boolean];
  stakeItems: string[];
  menu: boolean;
}

export default Vue.extend({
  name: "employee-form",
  components: { EmployeesForm },
  props: {
    currentEmployee: {
      type: Object,
    },
  },
  data(): EmployeeFormData {
    return {
      formData: {
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
      inputRules: [(v) => !!v || "Поле обязательно для заполнения"],
      stakeItems: ["полная", "половина"],
      menu: false,
    };
  },
  mounted() {
    this.formData = this.currentEmployee;
  },
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
