<template>
  <v-form ref="form" lazy-validation @submit.prevent="save">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.firstName"
            :rules="inputRules"
            label="Имя"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.lastName"
            :rules="inputRules"
            label="Фамилия"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.fullName"
            label="Отчество"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.position"
            :rules="inputRules"
            label="Должность"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="formData.salary"
            :rules="inputRules"
            label="Оклад"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-checkbox
            v-model="formData.isWorkBookSubmitted"
            label="Трудовая книжка сдана"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            :items="stakeItems"
            v-model="formData.stake"
            :rules="inputRules"
            label="Ставка (полная, половина)"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="formData.workStartDay"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.workStartDay"
                label="Дата выхода на работу"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="formData.workStartDay" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Отменить
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(formData.workStartDay)"
              >
                Сохранить
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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

interface EmployeeFormData {
  formData: Employee;
  inputRules: [(v: string) => string | boolean];
  stakeItems: string[];
  menu: boolean;
}

export default Vue.extend({
  name: "employee-form",
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
    if (this.currentEmployee) {
      this.formData = this.currentEmployee;
    }
  },
  methods: {
    save() {
      const isValid = this.$refs.form?.validate();
      if (isValid) {
        this.$emit("submit", this.formData);
        this.$refs.form?.resetValidation();
      }
    },
  },
});
</script>

<style scoped></style>
