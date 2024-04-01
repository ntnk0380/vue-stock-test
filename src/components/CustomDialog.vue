<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="min-width: 380px; max-width: 80vw;">
      <q-card-section class="q-py-sm">
        <div class="text-h5 text-weight-bold">{{ props.title }}</div>
      </q-card-section>
      <q-card-section class="q-py-sm" v-if="props.type === 1">
        <div class="text-weight-bold" v-html="props.message"></div>
      </q-card-section>
      <q-card-section class="q-py-sm" v-else-if="props.type === 2">
        <div class="text-weight-bold" v-html="props.message"></div>
        <label for="" class="text-bold" :class="{ 'req': props.reqfield }">{{ props.fieldlabel }} :</label>
        <q-input rounded outlined dense type="textarea" v-model="description" autofocus />
        <small class="text-negative text-bold" v-show="reqshow">{{ props.reqtext }}</small>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn unelevated rounded color="blue-grey-3" class="my-btn text-bolder vertical-bottom h-40" :size="'sm'" @click="onDialogCancel" v-show="props.type === 2"> <!-- @click="onDialog.onClickClose()" -->
          <span class="q-pt-xs text-capitalize text-weight-bold">{{ props.cancellabel }}</span>
        </q-btn>
        <q-btn unelevated rounded color="green-7" class="my-btn text-bolder vertical-bottom h-40" :size="'sm'" @click="onOKClick"><!-- @click="onDialog.onClickOk()" -->
          <span class="q-pt-xs text-capitalize text-weight-bold">{{ props.oklabel }}</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted, computed } from 'vue';
import { useDialogPluginComponent } from 'quasar'

const props = defineProps({
  type: { type: Number, default: 2 }, // 1: Ok , 2: Confirm
  title: { type: String, default: '' },
  message: { type: String, default: '' }, 
  fieldlabel: { type: String, default: '' },
  reqfield: { type: Boolean, default: false }, 
  reqtext: { type: String, default: 'This field is Require !' }, 
  callback: { type: Function, default() {
    return 'Default function'
  }},
  oklabel: { type: String, default: 'Ok' },
  cancellabel: { type: String, default: 'Cancel' },
})

const reqshow = ref(false)
const description = ref('')

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOKClick () {
  if ((props.reqfield && props.type === 2) && description.value === '') {
    reqshow.value = true
    setTimeout(() => {
      reqshow.value = false
    }, 3000);
  }else{
    onDialogOK(description.value)
  }
}
</script>