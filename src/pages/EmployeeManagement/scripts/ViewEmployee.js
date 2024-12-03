import axios from "axios";
import { nextTick, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default {
  setup() {
    let employee = ref({
      employee_id: null,
      last_name: null,
      first_name: null,
      middle_name: null,
      suffix_name: null,
      sex: null,
      birthday: null,
      contact: null,
      email: null,
      role: null,
    });

    const router = useRouter();
    const route = useRoute();
    const employeeId = ref(route.query.id);

    const goBack = () => {
      router.go(-1);
    };

    const getEmployee = async () => {
      employee.value = await axios
        .get("/api/employees?id=" + employeeId.value)
        .then((response) => {
          return response.data.data;
        });
    };

    if (employeeId.value) onMounted(getEmployee);

    return {
      employeeId,
      employee,
      getEmployee,
      goBack,
    };
  },
};
