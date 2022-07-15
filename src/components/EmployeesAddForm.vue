<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Добавить сотрудника</span>
    </v-card-title>

    <v-card-text>
      <v-form ref="form" lazy-validation>
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
                <v-date-picker
                  v-model="formData.workStartDay"
                  no-title
                  scrollable
                >
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
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Отмена </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Сохранить </v-btn>
    </v-card-actions>
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

interface EmployeeFormData {
  formData: Employee;
  inputRules: [(v: any) => string | boolean];
  stakeItems: string[];
  menu: boolean;
}

export default Vue.extend({
  name: "employee-form",
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
  methods: {
    save() {
      const isValid = this.$refs.form?.validate();
      if (isValid) {
        this.$emit("saveData", this.formData);
      }
    },
    close() {
      this.$refs.form?.resetValidation();
      this.$emit("close");
    },
  },
});
</script>

<style scoped></style>
