import axios from "axios";
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const employeeId = ref(route.query.id);

    let isLoading = ref(false);

    // * FORM VALUES
    let form = ref({
      last_name: "",
      first_name: "",
      middle_name: "",
      suffix_name: "",
      sex: "",
      birthday: "",
      contact: "",
      email: "",
      role: "",
    });

    const roles = ref([
      {
        label: "Project Manager",
        value: "Project Manager",
      },
      {
        label: "Assistant Manager",
        value: "Assistant Manager",
      },
      {
        label: "Software Developer",
        value: "Software Developer",
      },
      {
        label: "Human Resources",
        value: "Human Resources",
      },
      {
        label: "Secretary",
        value: "Secretary",
      },
      {
        label: "UI/UX Design",
        value: "UI/UX Design",
      },
      {
        label: "Junior Staffer",
        value: "Junior Staffer",
      },
      {
        label: "Trainee",
        value: "Trainee",
      },
    ]);
    // * FUNCTION TO RETURN TO PREVIOUS PAGE
    const goBack = () => {
      router.go(-1);
    };

    // * FUNCTION TO GET SELECTED EMPLOYEE FOR EDITING
    const getEmployee = async () => {
      form.value = await axios
        .get("http://localhost/todo-application/API.php?id=" + employeeId.value)
        .then((response) => {
          return response.data.data;
        });
    };

    // * CALL getEmployee function when employeeId parameter is set to a value
    if (employeeId.value) onMounted(getEmployee);

    // * FUNCTION FOR ADDING EMPLOYEE
    const addEmployee = () => {
      isLoading.value = true;
      axios
        .post("/api/employees/", JSON.stringify(form.value), {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          isLoading.value = false;
          console.log(response.status);
          if (response.status == 200) {
            showNotify(true, "create");
            router.push("employees");
          } else {
            showNotify(false, "create");
          }
        });
    };

    // * FUNCTION FOR EDITING EMPLOYEE
    const editEmployee = () => {
      // * ADD EMPLOYEE_ID TO THE FORM VALUE FOR PUT REQUEST
      form.value.employee_id = employeeId;
      isLoading.value = true;
      axios
        .put(
          "/api/employees/index.php/" + employeeId.value,
          JSON.stringify(form.value),
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          isLoading.value = false;
          console.log(response);
          if (response.status == 200) {
            showNotify(true, "edit");
            router.push("employees");
          } else {
            showNotify(false, "edit");
          }
        });
    };

    // * FUNCTION FOR NOTIFICATIONS
    const $q = useQuasar();
    const showNotify = (success, action) => {
      let title = "";
      let message = "";

      // * HEN NEW TODO IS CREATED
      if (action == "create") {
        title = success ? "Success!" : "Failed!";
        message = success
          ? "The Employee was added successfully."
          : "Failed to add employee.";
      }
      // * WHEN TODO DETAILS IS EDITED
      else if (action == "edit") {
        title = success ? "Success!" : "Failed!";
        message = success
          ? "The Employee detail was added updated successfully."
          : "Failed to update Employee detail.";
      }

      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          success ? "onboarding-success-notif" : "onboarding-error-notif"
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
      roles,
      isLoading,
      form,
      employeeId,
      goBack,
      getEmployee,
      addEmployee,
      editEmployee,
      showNotify,
    };
  },
};
