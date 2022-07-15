<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="employeesList"
      sort-by="firstName"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="addNewEmployeeDialog" max-width="800px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Добавить сотрудника
              </v-btn>
            </template>

            <employees-add-form
              ref="form"
              @saveData="saveNewEmployee"
              @close="close"
            ></employees-add-form>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Удалить сотрудника?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Отмена</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteEmployeeConfirm"
                  >Удалить</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #item.lastName="{ item }">
        <router-link :to="`/employee/${item.id}`">{{
          item.lastName
        }}</router-link>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editEmployee(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteEmployee(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Обновить </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="editEmployeeDialog" max-width="800px">
      <employees-edit-form
        :currentEmployee="editedEmployee"
        @saveData="saveEditedEmployee"
        @close="close"
        ref="form"
      ></employees-edit-form>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";
import EmployeesEditForm from "@/components/EmployeesEditForm.vue";
import EmployeesAddForm from "@/components/EmployeesAddForm.vue";

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
  dialogDelete: boolean;
  editEmployeeDialog: boolean;
  addNewEmployeeDialog: boolean;
  headers: [
    {
      text: string;
      align: string;
      sortable: boolean;
      value: string;
    },
    { text: string; value: string },
    { text: string; value: string },
    { text: string; value: string },
    { text: string; value: string; sortable: boolean }
  ];
  employeesList: Employee[];
  editedIndex: number;
  editedEmployee: Employee | null;
  defaultItem: Employee;
}

export default Vue.extend({
  components: { EmployeesEditForm, EmployeesAddForm },
  name: "employees-page",
  data(): EmployeeData {
    return {
      dialogDelete: false,
      addNewEmployeeDialog: false,
      editEmployeeDialog: false,
      headers: [
        {
          text: "Фамилия",
          align: "start",
          sortable: false,
          value: "lastName",
        },
        { text: "Имя", value: "firstName" },
        { text: "Отчество", value: "fullName" },
        { text: "Должность", value: "position" },
        { text: "Изменить", value: "actions", sortable: false },
      ],
      employeesList: [],
      editedIndex: -1,
      editedEmployee: {
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
      defaultItem: {
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

  watch: {
    editEmployeeDialog(val) {
      val || this.close();
    },
    addNewEmployeeDialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      if (localStorage.getItem("employees")?.length) {
        const employees: Employee[] | null | string =
          localStorage.getItem("employees");

        if (employees) {
          this.employeesList = JSON.parse(employees);
        }
      }

      localStorage.setItem("employees", JSON.stringify(this.employeesList));
    },

    localStorageParse() {
      localStorage.setItem("employees", JSON.stringify(this.employeesList));
      const employees = localStorage.getItem("employees");

      if (employees) {
        this.employeesList = JSON.parse(employees);
      }
    },

    editEmployee(item: Employee) {
      this.editedIndex = this.employeesList.indexOf(item);
      this.editedEmployee = item;
      this.editEmployeeDialog = true;
    },

    deleteEmployee(item: Employee) {
      this.editedIndex = this.employeesList.indexOf(item);
      this.editedEmployee = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteEmployeeConfirm() {
      this.employeesList.splice(this.editedIndex, 1);
      this.localStorageParse();
      this.closeDelete();
    },

    close() {
      this.addNewEmployeeDialog = false;
      this.editEmployeeDialog = false;
      this.$nextTick(() => {
        this.editedEmployee = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedEmployee = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    saveNewEmployee(formData: Employee) {
      this.employeesList.push({
        ...formData,
        id: uuidv4(),
      });
      this.localStorageParse();
      this.close();
    },

    saveEditedEmployee(formData: Employee) {
      Object.assign(this.employeesList[this.editedIndex], {
        ...formData,
        id: uuidv4(),
      });
      this.localStorageParse();
      this.close();
    },
  },
});
</script>
