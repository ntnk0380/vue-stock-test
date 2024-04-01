<template>
  <div class="row">
    <div class="col-12  q-mb-sm">
      <div class="row items-center">
        <span class="text-h4 text-bold text-grey-10">Stock</span>
        <span class="text-h6 text-bold text-grey-10 q-mx-sm">|</span>
        <q-breadcrumbs gutter="none">
          <template v-slot:separator>
            <q-icon size="1em" name="chevron_right" color="blue-10" />
          </template>
          <q-breadcrumbs-el label="Home" icon="home" class="text-h6 text-blue-10" to="/homepage"/>
          <q-breadcrumbs-el label="Stock" class="text-h6 text-grey-10"/>
        </q-breadcrumbs>
      </div>
    </div>
    <div class="col-12 q-mb-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <div class="row justify-end">
                <q-btn unelevated rounded color="green-7" class="my-btn text-bolder vertical-bottom q-my-sm h-40" :size="'md'" to="/stock/add">
                  <i class="fa-regular fa-plus" aria-hidden="true" role="img"></i>
                  <span class="q-pl-sm text-capitalize text-weight-bold">Stock</span>
                </q-btn>
              </div>
            </div>
            <div class="col-12">
              <q-table
                :table-header-style="{ backgroundColor: 'red' }" 
                table-header-class="head_table"
                class="no-shadow outlined table-scroll my-table" 
                flat 
                bordered
                wrap-cells 
                hide-pagination 
                :rows="listData"
                :columns="columns" 
                v-model:pagination="pagination" 
                :loading="tableloading"
                :loading-label="'กำลังโหลดข้อมูล...'" 
                :no-data-label="'ไม่พบข้อมูล'" 
                virtual-scroll
              ></q-table> 
            </div>
            <div class="row col-12 q-pt-md justify-end">
              <q-pagination 
                flat 
                class="my-page" 
                v-model="pagination.page" 
                :max-pages="6" 
                :max="pagesNumber" 
                size="md"
                direction-links 
                color="blue-10" 
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed  } from "vue";

import { useStore } from 'vuex'
const store = useStore()

// Table Configuration
const tableloading = ref(false);
const customHeaderStyle = { fontSize: '20px', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap', color: '#7f8fa6', backgroundColor: 'rgb(246, 246, 246)' }
const columns = [
  { name: 'Material', align: 'center', label: 'Material.', field: 'Material', sortable: false, headerStyle: customHeaderStyle, style: { fontSize: '20px', whiteSpace: 'nowrap', color: '#333' } },
  { name: 'Location', align: 'center', label: 'Location', field: 'Location', sortable: false, headerStyle: customHeaderStyle, style: { fontSize: '20px', whiteSpace: 'nowrap', color: '#333' } },
  { name: 'QTY', align: 'center', label: 'QTY', field: 'QTY', sortable: false, headerStyle: customHeaderStyle, style: { fontSize: '20px', whiteSpace: 'nowrap', color: '#333' } },
];
const listData = ref(store.getters.stock)
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});
const pagesNumber = computed(() => Math.ceil(listData.value.length / pagination.value.rowsPerPage));


onMounted(async() => {
  // store.dispatch('onActionGetStock')
  // listData.value = store.getters.stock;
})



</script>

<style lang="scss" scoped></style>
