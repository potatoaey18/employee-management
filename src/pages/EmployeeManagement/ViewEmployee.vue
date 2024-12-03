<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="view-employee q-pt-lg q-px-lg">
      <!-- * FOR ARROW BACK -->
      <div class="row q-px-sm q-py-md">
        <div class="flex justifty-start items-center onboarding-text-accent-0">
          <q-btn
            @click="goBack()"
            round
            dense
            flat
            icon="arrow_back"
            class="onboarding-text-accent-1"
          />
          <h5 class="text-24 text-semibold q-my-none q-ml-md">
            Employee Details
          </h5>
        </div>
      </div>
      <div
        class="onboarding-main-scroll standard-scroll padding-top-bottom-lg q-mb-xl"
      >
        <div v-if="employeeId" class="q-px-sm row">
          <div class="col-auto q-mr-md text-16 text-bold">
            <p>Employee ID</p>
            <p>Last Name</p>
            <p>First Name</p>
            <p>Middle Name</p>
            <p>Suffix Name</p>
            <p>Sex</p>
            <p>Date of Birth</p>
            <p>Contact Number</p>
            <p>Email</p>
            <p>Role</p>
          </div>
          <div class="col-auto text-16">
            <p>{{ employee.employee_id }}</p>
            <p>{{ employee.last_name }}</p>
            <p>{{ employee.first_name }}</p>
            <p>{{ employee.middle_name ? employee.middle_name : "-" }}</p>
            <p>{{ employee.suffix_name ? employee.suffix_name : "-" }}</p>
            <p>{{ employee.sex }}</p>
            <p>{{ employee.birthday }}</p>
            <p>(+63)&nbsp;&nbsp;&nbsp;&nbsp;{{ employee.contact }}</p>
            <p>{{ employee.email }}</p>
            <p>{{ employee.role }}</p>
          </div>
        </div>
        <div v-else class="q-px-sm q-py-md row">No Result</div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scope>
@import url("./styles/ViewEmployee.scss");
</style>

<script src="./scripts/ViewEmployee.js"></script>
