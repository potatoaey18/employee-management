import { provide, ref } from "vue";
import Pagination from "src/components/Pagination.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useQuasar } from "quasar";
import MainDialog from "../../../components/MainDialog.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";
import DeleteModal from "../components/DeleteModal.vue";

export default {
  components: {
    MainDialog,
    DeleteModal,
    Pagination,
  },

  setup() {
    const router = useRouter();

    let pageLoadingState = ref(false);

    // * REFERENCE TO THE FILTER INPUT
    const filter = ref(null);

    // * FOR FILTER KEYWORD
    let keyword = ref(null);

    // For pagination
    let pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });

    // Columns for table
    let columns = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: "name",
        sortable: true,
      },
      {
        name: "email",
        align: "left",
        label: "Email",
        field: "email",
      },
      {
        name: "role",
        align: "left",
        label: "Role",
        field: "role",
      },
      {
        name: "contact",
        align: "left",
        label: "Contact",
        field: "contact",
      },
      {
        name: "action",
        align: "right",
        label: "",
        field: "action",
        style: "width: 10%",
      },
    ];

    // * REFERENCE FOR ALL EMPLOYEES WITH COMPLETE DETAILS
    let employees = ref(null);

    // * REFERENCE FOR ALL EMPLOYEES WITH ONLY DETAILS THAT WILL BE DISPLAYED IN THE TABLE
    let filteredEmployees = ref([]);

    // * FUNCTION THAT WILL SET THE VALUE FOR filteredEmployees THAT WILL BE DISPLAYED IN THE TABLE
    const setFilteredEmployees = () => {
      filteredEmployees.value = employees.value.map((value) => {
        return {
          employee_id: value.employee_id,
          name: value.last_name + ", " + value.first_name,
          email: value.email,
          role: value.role,
          contact: value.contact,
        };
      });
    };

    // * GET LIST OF EMPLOYEES
    const getEmployees = async () => {
      pageLoadingState.value = true;
      await axios.get("/api/employees/").then((response) => {
        if (response.status == 200) {
          employees.value = response.data.data;
        }
        setFilteredEmployees();
      });
      pageLoadingState.value = false;
    };

    getEmployees();

    // * FUNCTION TO GO TO ANOTHER PAGE DISPLAYING ALL EMPLOYEE DETAILS
    const onRowClick = (event, props) => {
      const employeeId = props.employee_id;
      router.push({
        path: "view-employee",
        query: { id: employeeId }, // Pass the employee ID as a query parameter
      });
    };

    // * FUNCTION TO MOVE TO EDIT PAGE WITH THE SELECTED EMPLOYEE
    const editEmployee = (props) => {
      const employeeId = props.employee_id;
      router.push({
        path: "edit-employee",
        query: { id: employeeId }, // Pass the employee ID as a query parameter
      });
    };

    // * RESET/FETCH ALL DISPLAYED EMPLOYEES
    const fetchAll = async () => {
      keyword.value = null;
      await getEmployees();
      filter.value.focus();
      showNotify(true, "filter");
    };

    // * FILTER/SEARCH EMPLOYEES USING THE KEYWORD
    const searchEmployee = async () => {
      await getEmployees();
      filter.value.focus();
      if (keyword.value == null || keyword.value == "") {
        showNotify(true, "filter");
        return;
      }
      pageLoadingState.value = true;

      employees.value = employees.value.filter((value) => {
        return (
          value.last_name.toLowerCase().includes(keyword.value.toLowerCase()) ||
          value.first_name
            .toLowerCase()
            .includes(keyword.value.toLowerCase()) ||
          value.middle_name
            .toLowerCase()
            .includes(keyword.value.toLowerCase()) ||
          value.suffix_name
            .toLowerCase()
            .includes(keyword.value.toLowerCase()) ||
          value.email.toLowerCase().includes(keyword.value.toLowerCase()) ||
          value.role.toLowerCase().includes(keyword.value.toLowerCase())
        );
      });
      setFilteredEmployees();
      showNotify(true, "filter");
      pageLoadingState.value = false;
    };

    // * REFERENCE TO THE EMPLOYEE THAT WILL BE DELETED
    let employeeId = ref(null);

    // * FUNCTION FOR SHOWING DELETE MODAL
    const showDeleteModal = (props) => {
      employeeId.value = props.employee_id;
      ToggleMainDialogState();
    };

    // * FUNCTION FOR DELETE REQUEST
    const deleteEmployee = async () => {
      const data = { employee_id: employeeId.value };
      pageLoadingState.value = true;
      console.log(JSON.stringify(data));
      await axios
        .delete(
          "/api/employees/index.php/" + employeeId.value,
          { data: { employee_id: employeeId.value } },
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          if (response.status == 200) {
            await getEmployees();
            setFilteredEmployees();
          }
          ToggleMainDialogState();
          showNotify(response.status == 200, "delete");
          pageLoadingState.value = false;
        });
    };

    provide("deleteEmployee", deleteEmployee);

    // * FOR NOTIFICATIONS
    const $q = useQuasar();
    const showNotify = (status, action) => {
      let title = "";
      let message = "";

      if (action == "delete") {
        title = status ? "Success!" : "Failed!";
        message = status
          ? "The Employee was deleted successfully."
          : "Failed to delete Employee.";
      } else if (action == "filter") {
        title = "Filter Results " + employees.value.length;
      }

      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "onboarding-success-notif" : "onboarding-error-notif"
        }`,
        html: true,
        message: `<b>${title}</b><br>${message}`,
        actions: [
          {
            icon: "close",
            color: "black",
            size: "10px",
          },
        ],
      });
    };

    return {
      pagination,
      pageLoadingState,
      filter,
      employees,
      filteredEmployees,
      columns,
      keyword,
      employeeId,
      getEmployees,
      setFilteredEmployees,
      onRowClick,
      editEmployee,
      fetchAll,
      searchEmployee,
      showDeleteModal,
      showNotify,
    };
  },
};
