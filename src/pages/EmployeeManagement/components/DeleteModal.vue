<template>
  <div class="full-width flex justify-center q-mb-md">
    <div class="onboarding-border-radius-10 width-auto q-pa-sm">
      <q-icon
        name="iconfont icon-report-fill"
        class="onboarding-text-accent-0"
        size="30px"
      />
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-9 modal-header">
      <h4
        :class="`text-semibold text-24 q-my-none ${
          $q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-lg'
        }`"
      >
        Are you sure you want <br />
        to delete this Employee?
      </h4>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p class="text-16 text-weight-light q-pb-sm">
        By confirming, this employee will be deleted. <br />
        This process cannot be undone.
      </p>
    </div>
  </div>
  <div class="row justify-around q-mt-lg text-16">
    <div class="col-1"></div>
    <div class="col-4">
      <div
        @click="closeDialog()"
        :class="`cursor-pointer onboarding-text-accent-1 text-white full-width q-py-sm q-mb-s onboarding-border-accent-0
        onboarding-border-radius-${$q.screen.width < 768 ? '10' : '50'}`"
      >
        Cancel
      </div>
    </div>
    <div class="col-4">
      <q-btn
        @click="deleteEmployee"
        :loading="btnLoadingState"
        flat
        no-caps
        label="Yes"
        dense
        :class="`text-16 onboarding-bg-accent-0 onboarding-text-accent-1 text-white full-width q-py-sm q-mb-s
        onboarding-border-radius-${$q.screen.width < 768 ? '10' : '50'}`"
      />
    </div>

    <div class="col-1"></div>
  </div>
</template>
<script>
import { ref, inject } from "vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";

export default {
  setup() {
    let btnLoadingState = ref(false);

    const deleteEmployee = inject("deleteEmployee");

    const closeDialog = () => {
      ToggleMainDialogState();
    };

    return {
      deleteEmployee,
      closeDialog,
      btnLoadingState,
    };
  },
};
</script>
