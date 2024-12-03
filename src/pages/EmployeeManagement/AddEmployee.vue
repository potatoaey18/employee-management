<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="add-employee q-pt-lg q-px-lg">
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
            Adding New Employee
          </h5>
        </div>
      </div>
      <div
        class="onboarding-main-scroll standard-scroll padding-top-bottom-lg q-mb-xl"
      >
        <q-form @submit.prevent="employeeId ? editEmployee() : addEmployee()">
          <div>
            <label class="text-weight-medium">Last Name <span>*</span></label>
            <q-input
              dense
              borderless
              v-model="form.last_name"
              placeholder="Enter last name"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Field must not be empty',
              ]"
              hide-bottom-space
              class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
            />
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium">First Name <span>*</span></label>
            <q-input
              dense
              borderless
              v-model="form.first_name"
              placeholder="Enter first name"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Field must not be empty',
              ]"
              hide-bottom-space
              class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
            />
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium">Middle Name</label>
            <q-input
              dense
              borderless
              v-model="form.middle_name"
              placeholder="Enter middle name"
              hide-bottom-space
              class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
            />
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium">Suffix Name</label>
            <q-input
              dense
              borderless
              v-model="form.suffix_name"
              placeholder="Enter suffix name"
              hide-bottom-space
              class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
            />
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium">Sex</label>
            <div class="q-px-md">
              <q-radio
                v-model="form.sex"
                val="Male"
                label="Male"
                class="q-mr-lg"
              />
              <q-radio v-model="form.sex" val="Female" label="Female" />
            </div>
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium">Date Input <span>*</span></label>
            <q-input
              dense
              readonly
              borderless
              v-model="form.birthday"
              placeholder="YYYY-MM-DD"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || '']"
              hide-bottom-space
              mask="####-##-##"
              class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
              ref="dateInput"
            >
              <template v-slot:append>
                <q-icon
                  name="event"
                  class="cursor-pointer onboarding-text-accent-0"
                >
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="form.birthday"
                      @update:model-value="
                        () => {
                          $refs.qDateProxy.hide();
                          $refs.dateInput.resetValidation();
                        }
                      "
                      mask="YYYY-MM-DD"
                      color="teal"
                      text-color="accent-1"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium"
              >Contact Number <span>*</span></label
            >
            <q-input
              dense
              borderless
              v-model="form.contact"
              placeholder="####-###-###"
              :rules="[(val) => (val !== null && val !== '') || '']"
              hide-bottom-space
              mask="####-###-###"
              prefix="(+63)"
              class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
            />
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium"
              >Email Address <span>*</span></label
            >
            <q-input
              dense
              borderless
              v-model="form.email"
              placeholder="Enter email address"
              :rules="[
                (val) => (val !== null && val !== '') || '',
                (val, rules) =>
                  rules.email(val) || 'Please enter a valid email address',
              ]"
              ref="emailInput"
              lazy-rules="ondemand"
              @blur="() => $refs.emailInput.validate()"
              @focus="() => $refs.emailInput.resetValidation()"
              hide-bottom-space
              class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 q-mt-sm"
            />
          </div>
          <div class="q-my-md">
            <label class="text-weight-medium">Role <span>*</span></label>
            <q-select
              class="onboarding-border-radius-10 onboarding-border-accent-0 onboarding-select-field standard q-mt-sm"
              dense
              borderless
              v-model="form.role"
              :label="form.role == null || form.role == '' ? 'Select Role' : ''"
              emit-value
              map-options
              :options="roles"
              :rules="[(val) => (val !== null && val !== '') || '']"
              hide-bottom-space
              :popup-content-class="
                DarkMode
                  ? 'onboarding-option-style-dark'
                  : 'onboarding-option-style-light'
              "
              options-selected-class="selected-class"
              transition-show="scale"
              transition-hide="scale"
            />
          </div>
          <div class="q-pt-md">
            <q-btn
              :loading="isLoading"
              rounded
              dense
              flat
              no-caps
              type="submit"
              label="Save Employee"
              class="onboarding-border-accent-0 text-white onboarding-bg-accent-0 q-px-md"
            />
          </div>
        </q-form>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scope>
@import url("./styles/AddEmployee.scss");
</style>

<script src="./scripts/AddEmployee.js"></script>
