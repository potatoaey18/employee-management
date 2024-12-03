<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="employees q-pt-lg q-px-lg">
      <div v-if="!pageLoadingState">
        <!-- * HEADER AND BUTTON TO GO TO CREATE TODO PAGE -->
        <div class="row q-px-sm q-py-md justify-between">
          <h6 class="text-24 text-semibold q-my-none onboarding-text-accent-0">
            Employees
          </h6>
          <q-btn
            @click="$router.push({ name: 'add-employee' })"
            dense
            flat
            no-caps
            label="Add Employee"
            class="onboarding-button onboarding-border-accent-0 text-white onboarding-bg-accent-0 q-px-md"
          />
        </div>

        <!-- * FILTER AND PAGINATION -->
        <div class="row q-px-sm q-py-md justify-between">
          <div class="flex items-center">
            <div class="text-14 onboarding-text-accent-1 q-mr-md">Filters:</div>
            <div class="flex justify-end">
              <q-input
                class="minmax-width onboarding-border-radius-50 onboarding-border-accent-0 onboarding-input-field use-input height-31 q-px-md q-mr-md"
                dense
                borderless
                v-model="keyword"
                debounce="500"
                @update:model-value="searchEmployee"
                placeholder="Search"
                ref="filter"
                @keydown.enter="searchEmployee()"
                ><template v-slot:append>
                  <q-icon
                    v-if="keyword"
                    name="close"
                    @click="fetchAll()"
                    class="cursor-pointer onboarding-text-accent-0"
                  />
                  <q-icon
                    @click="searchEmployee()"
                    class="onboarding-text-accent-0 cursor-pointer"
                    :class="!keyword && 'disabled'"
                    name="search"
                  /> </template
              ></q-input>
            </div>
          </div>
          <div class="flex items-center">
            <div
              class="text-14 onboarding-text-accent-1 q-mr-md"
              :class="$q.screen.width < 767 && 'hidden'"
            ></div>
            <Pagination
              v-model:pagination="pagination"
              :numRows="filteredEmployees"
            />
          </div>
        </div>

        <!-- * TABLES -->
        <div class="onboarding-main-scroll table-scroll">
          <!-- row-key = "range_type" example -->
          <q-table
            :rows="filteredEmployees"
            :columns="columns"
            v-model:pagination="pagination"
            row-key="employee_id"
            class="onboarding-table gt-xs"
            flat
            @row-click="onRowClick"
            :separator="none"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <div class="table-menu">
                  <q-btn
                    icon="more_vert"
                    class="onboarding-text-primary onboarding-text-hover-accent-1"
                    flat
                    round
                    dense
                    @click.stop
                  >
                    <q-menu
                      class="menu-container"
                      anchor="top left"
                      self="top right"
                    >
                      <q-list
                        dense
                        class="q-py-md onboarding-border-accent-0 onboarding-border-radius-8"
                      >
                        <q-item
                          clickable
                          v-close-popup
                          class="menu-list"
                          @click.stop="editEmployee(props.row)"
                        >
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          class="menu-list"
                          @click.stop="showDeleteModal(props.row)"
                        >
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </q-td>
            </template>
            <!-- * DISPLAY NO RESULTS IF THERE ARE NO EMPLOYEES -->
            <template v-if="!filteredEmployees.length" v-slot:bottom-row>
              <q-tr>
                <q-td colspan="100%" class="text-center">
                  No Data Available
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <q-inner-loading
        class="absolute-center onboarding-bg-primary text-20 full-width full-height onboarding-text-accent-0"
        :showing="pageLoadingState"
      />
      <MobileFilter :searchVisible="true" />
      <MainDialog :content="$options.components.DeleteModal" />
    </div>
  </transition>
</template>

<style lang="scss" scope>
@import url("./styles/Employees.scss");
</style>

<script src="./scripts/Employees.js"></script>
