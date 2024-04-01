<template>
  <div class="row">
    <div class="col-12  q-mb-sm">
      <div class="row items-center">
        <span class="text-h4 text-bold text-grey-10">Add Stock</span>
        <span class="text-h6 text-bold text-grey-10 q-mx-sm">|</span>
        <q-breadcrumbs gutter="none">
          <template v-slot:separator>
            <q-icon size="1em" name="chevron_right" color="blue-10" />
          </template>
          <q-breadcrumbs-el label="Home" icon="home" class="text-h6 text-blue-10" to="/homepage"/>
          <q-breadcrumbs-el label="Stock" class="text-h6 text-blue-10" to="/stock"/>
          <q-breadcrumbs-el label="Add" class="text-h6 text-grey-10"/>
        </q-breadcrumbs>

      </div>
    </div>
    <div class="col-12 q-mb-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="row">
            <div class="col-12 q-mb-sm">
              <div class="row">
                <div class="col-12 col-sm-6 q-mb-md q-pr-sm">
                  <div class="input-group row items-center">
                    <label class="col-12 col-sm-3 text-bold" for="">Material :</label>
                    <q-input class="col-12 col-sm-9" rounded outlined dense v-model="filterMaterialText" @keyup.enter="onSearch()"/>
                  </div>
                </div>
                <div class="col-12 col-sm-6 q-mb-md self-end">
                  <q-btn unelevated rounded color="blue-10" class="my-btn text-bolder vertical-bottom h-40 q-px-sm" :size="'md'" @click="onSearch()">
                    <i class="fa-solid fa-search" aria-hidden="true" role="img"></i>
                    <span class="q-pl-sm text-capitalize text-weight-bold">Search</span>
                  </q-btn>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row justify-end">
                <q-btn unelevated rounded color="green-7" class="my-btn text-bolder vertical-bottom q-my-sm h-40" :size="'md'" @click="onDialogAddMaterial.open()">
                  <i class="fa-regular fa-plus" aria-hidden="true" role="img"></i>
                  <span class="q-pl-sm text-capitalize text-weight-bold">Material</span>
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
                :filter="setfilter"
                v-model:pagination="pagination" 
                :loading="tableloading"
                :loading-label="'กำลังโหลดข้อมูล...'" 
                :no-data-label="'ไม่พบข้อมูล'" 
                virtual-scroll
                row-key="index"
              >
                <template v-slot:body="props">
                  <q-tr id="tr-inputqty" :props="props">
                    <q-td key="Material" :props="props">
                      {{ props.row.Material }}
                    </q-td>
                    <q-td v-for="(row, indexLocation) in props.row.Locations" :key="`${row.Location}`" :props="props" :id="`inputqty-${props.row.Index}-${indexLocation}`">
                      <q-input rounded outlined dense type="number" v-model.number="row.QTY" @change="onCalSummary()" @keydown="handleTabKey(props.row.Index, indexLocation, $event)"/>
                    </q-td>
                    <q-td key="Summary" :props="props">
                      <q-input rounded outlined dense type="number" v-model.number="props.row.Summary" disable/>
                    </q-td>
                  </q-tr>
                </template>
              </q-table> 
            </div>
            <!-- <div class="row col-12 q-pt-md justify-end">
              <q-pagination 
                flat 
                class="my-page" 
                v-model="pagination.page" 
                :max-pages="6" 
                :max="pagesNumber" 
                size="md"
                direction-links 
                color="red-7" 
              />
            </div> -->
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12">
      <div class="row justify-end ">
        <div class="q-gutter-sm ">
          <q-btn unelevated rounded none color="blue-grey-3" class="my-btn text-bolder vertical-bottom q-my-sm h-40" :size="'md'" @click="onAction('cancel')">
            <span class="q-pt-xs text-capitalize text-weight-bold">Cancel</span>
          </q-btn>
          <q-btn unelevated rounded color="green-7" class="my-btn text-bolder vertical-bottom q-my-sm h-40" :size="'md'" @click="onAction('save')">
            <i class="fa-regular fa-floppy-disk" aria-hidden="true" role="img"></i>
            <span class="q-pl-sm q-pt-xs text-capitalize text-weight-bold">Save</span>
          </q-btn>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="onDialogAddMaterial.active" persistent>
    <q-card class="">
      <q-card-section class="row items-center">
        <div class="col-12 q-mb-sm">
          <div class="input-group row items-center">
            <label class="col-12 col-sm-3 text-bold req" for="">Material :</label>
            <q-input class="col-12 col-sm-9" rounded outlined dense type="text" v-model="onDialogAddMaterial.materialCode" @keyup.enter="onDialogAddMaterial.search()">
              <template v-slot:after>
                <q-btn round dense flat icon="search" @click="onDialogAddMaterial.search()"/>
              </template>
            </q-input>
            <small class="col-12 text-negative text-bold" v-show="onDialogAddMaterial.showRequired">*Please enter Material</small>
          </div>
        </div>
        <div class="col-12 q-mb-sm">
          <div class="input-group row items-center">
            <label class="col-12 col-sm-3 text-bold" for="">Product Code :</label>
            <q-input class="col-12 col-sm-9" rounded outlined dense readonly type="text" v-model="onDialogAddMaterial.ProductCode"/>
          </div>
        </div>
        <div class="col-12 q-mb-sm">
          <label class="text-bold" for="">Description :</label>
          <q-input rounded outlined dense readonly type="textarea" v-model="onDialogAddMaterial.Description"/>
        </div>
      </q-card-section>
      <q-card-actions align="center" class="text-primary">
        <q-btn unelevated rounded color="green-7" class="my-btn text-bolder vertical-bottom h-40" :size="'sm'" @click="onDialogAddMaterial.add()">
          <span class="q-pt-xs text-capitalize text-weight-bold">add</span>
        </q-btn>
        <q-btn unelevated rounded color="blue-grey-3" class="my-btn text-bolder vertical-bottom h-40" :size="'sm'" v-close-popup>
          <span class="q-pt-xs text-capitalize text-weight-bold">cancel</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { ref, reactive, onMounted, computed  } from "vue";
import axios from "axios";

import { useStore } from 'vuex'
const store = useStore()

import { useQuasar } from 'quasar';
const $q = useQuasar();

import { useRouter, useRoute } from 'vue-router';
const $route = useRoute();
const $router = useRouter();

// Table Configuration
const tableloading = ref(false);
const customHeaderStyle = { fontSize: '20px', fontWeight: 'bold', textAlign: 'center', whiteSpace: 'nowrap', color: '#7f8fa6', backgroundColor: 'rgb(246, 246, 246)' }
const columns = ref([
  { name: 'Material', align: 'left', label: 'Material', field: 'Material', sortable: false, headerStyle: customHeaderStyle, style: { fontSize: '20px', whiteSpace: 'nowrap', color: '#333', minWidth: "150px" }},
  { name: 'Summary', align: 'center', label: 'Summary', field: 'Summary', sortable: false, headerStyle: customHeaderStyle, style: { fontSize: '20px', whiteSpace: 'nowrap', color: '#333', minWidth: "150px"}}
])
const listData = ref([])
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: listData.value.length,
});
const pagesNumber = computed(() => Math.ceil(listData.value.length / pagination.value.rowsPerPage));

// Filter
const setfilter = ref('')
const filterMaterialText = ref('')
const onSearch = ()=>{
  setfilter.value = filterMaterialText.value
}

// Raw data
const locationsList = reactive([])
const rawData = ref([])

// function onClickAction(){
//   listData.value = store.getters.stock;
// }


//popup
const onDialog = reactive({
  OkBox: async (Title, Msg, Func) => {
    openDialogComponent({ type: 1, title: Title, message: Msg }, Func)
  },
  ConfirmBox: async (Title, Msg, label, req, Func) => {
    openDialogComponent({ type: 2, title: Title, message: Msg, fieldlabel: label, reqfield: req }, Func)
  },
})
function openDialogComponent(propsOption, callback){
  $q.dialog({
    component: 'custom-dialog',
    componentProps: propsOption
  }).onOk(async(data) => {
    if(callback){ await callback(data)}
  })
}

const onDialogAddMaterial = reactive({
  active: false,
  materialCode: '',
  showRequired: false,
  rawMaterial: null,
  ProductCode: '',
  Description: '',
  open:()=>{
    onDialogAddMaterial.materialCode = ''
    onDialogAddMaterial.rawMaterial = ''
    onDialogAddMaterial.ProductCode = ''
    onDialogAddMaterial.Description = ''
    onDialogAddMaterial.active = true
  },
  add:()=>{
    if (onDialogAddMaterial.materialCode === '') {
      onDialogAddMaterial.showRequired = true
      setTimeout(() => {
        onDialogAddMaterial.showRequired = false
      }, 3000);
    } else {
      pushNewMaterial(onDialogAddMaterial.rawMaterial)
      onDialogAddMaterial.active = false
    }
  },
  search:async()=>{
    const data = await onGetMaterial(onDialogAddMaterial.materialCode) || null
    if (data === null) {
      onDialog.OkBox('Warning', `This material is not found.`, async () => {
        onDialogAddMaterial.materialCode = ''
      })
    }
    onDialogAddMaterial.rawMaterial = data
    onDialogAddMaterial.ProductCode = data? data.ProductCode: ''
    onDialogAddMaterial.Description = data? data.Description: ''
  },
  close:()=>{
    onDialogAddMaterial.active = false
  }
})

async function onGetMaterial(materialCode){
  const response = await axios.post('/master/material/get',{Material: materialCode}).then((result) => {
    return result.data;
  }).catch((err) => {
    console.log(err);
    return 
  });
  return response
}

function pushNewMaterial(data){
  const findDupData = listData.value.findIndex(item => item.Material === data.Material)
  if (findDupData >= 0) {
    onDialog.OkBox('Warning', `Duplicate material`, async () => {})
  }else{
    let newItem = {
      Index: listData.value.length,
      Material: data.Material,
      ProductCode: data.ProductCode,
      Locations: locationsList.value.map(itemLocation => {
        return {
          Location: itemLocation,
          QTY: null
        } 
      }),
      Summary: null
    }
    listData.value.push(newItem)
  }
}

async function onGetAddStockData(){
  const response = await axios.get('/stock').then((result) => {
    return result.data;
  }).catch((err) => {
    console.log(err);
    return []
  });
  rawData.value = response
  listData.value = changeFomatdata(response)
}

function changeFomatdata(data) {  
  const allLocations = data.map(item => {return item.Location})
  const sortUniqueLocations = allLocations.filter((item, pos)=>{
    return allLocations.indexOf(item) == pos;
  }).sort()

  locationsList.value = sortUniqueLocations

  const setNewFormat = {}
  let count = 0
  data.map((item, index) => {
    const material = item['Material']
    let newItem = {
      Index: null,
      Material: material,
      ProductCode: item['ProductCode'],
      Locations: sortUniqueLocations.map(itemLocation => {
        return {
          Location: itemLocation,
          QTY: (item["Location"] === itemLocation)? item['QTY']:null
        } 
      }),
      Summary: 0
    }

    if (!setNewFormat[material]) {
      setNewFormat[material] = newItem;
      setNewFormat[material]['Index'] = count
      count++
    }else{
      let matLocations = setNewFormat[material]["Locations"]
      let indexLocation = matLocations.findIndex(itemLocation => itemLocation.Location === item["Location"])
      if (indexLocation >= 0) {
        matLocations[indexLocation]['QTY'] = item['QTY']
      }
    }
  })
  const formattedArray = Object.keys(setNewFormat).map(key => setNewFormat[key]);
  return formattedArray
}

async function onSetColumn(){
  let newColumn = [{ name: 'Material', align: 'left', label: 'Material', field: 'Material', sortable: false, headerStyle: customHeaderStyle, style: { fontSize: '20px', whiteSpace: 'nowrap', color: '#333', minWidth: "150px" } },]
  locationsList.value.map(item => {
    newColumn.push({ name: item, align: 'center', label: item, field: item, sortable: false, headerStyle: customHeaderStyle, style: { fontSize: '20px', whiteSpace: 'nowrap', color: '#333', minWidth: "150px" } },);
  })
  newColumn.push({ name: 'Summary', align: 'center', label: 'Summary', field: 'Summary', sortable: false, headerStyle: customHeaderStyle, style: { fontSize: '20px', whiteSpace: 'nowrap', color: '#333', minWidth: "150px" } })
  columns.value = newColumn
}


const onCalSummary = ()=>{
  listData.value.forEach(item => {
    let summary = 0;
    item.Locations.forEach(location => { summary += Number(location.QTY); });
    item.Summary = summary;
  })
}

const handleTabKey = (rowIndex, cellIndex, event) => {
  // if (event.key === 'Tab') {
  //   event.preventDefault();
  //   const nextRow = rowIndex === listData.value.length - 1 ? 0 : rowIndex + 1;
  //   const nextColumn = rowIndex === listData.value.length - 1 ? (cellIndex + 1) % locationsList.value.length : cellIndex;
  //   console.log('current',rowIndex, cellIndex);
  //   console.log('next', nextRow,nextColumn);
  //   const nextInput = document.querySelector(`tr#tr-inputqty:nth-child(${nextRow + 1}) td:nth-child(${nextColumn + 2}) input`);
  //   console.log(nextInput);
  //   if (nextInput) {
  //     nextInput.focus();
  //   }
  // }
  if (event.key === 'Tab') {
    event.preventDefault();
    findNextInput(rowIndex, cellIndex)
  }

  async function findNextInput(currentRow, currentCell){
    const nextRow = currentRow === listData.value.length - 1 ? 0 : currentRow + 1;
    const nextColumn = currentRow === listData.value.length - 1 ? (currentCell + 1) % locationsList.value.length : currentCell;
    const nextInput = document.querySelector(`tr#tr-inputqty:nth-child(${nextRow + 1}) td:nth-child(${nextColumn + 2}) input`);
    if (nextInput) {
      return nextInput.focus();
    }else{
      findNextInput(nextRow,nextColumn)
    }
  }
};

async function onAction(action){
  switch (action) {
    case 'cancel':
      $router.push('/stock');
      break;
    case 'save':
      await onPostData()
      break;
  
    default:
      break;
  }
}

async function onPostData(){
  let bodySend = await setBodyData(listData.value)
  onDialog.OkBox('Success', `Please check in console.`, async () => {
    store.dispatch('onAddStock',bodySend)
    $router.push('/stock')
  })
  console.log("------------ Commit ------------\n", bodySend);
}

const setBodyData = async(data)=>{
  let newBody = []
  data.map( item => {
    item.Locations.map(itemLocation => {
      if (itemLocation.QTY !== null) {
        newBody.push({
          Material: item.Material,
          Location: itemLocation.Location,
          QTY: itemLocation.QTY
        })
      }
    })
  })
  return newBody
}


onMounted(async() => {
  $q.loading.show();
  await onGetAddStockData()
  await onSetColumn()
  await onCalSummary()
  $q.loading.hide();
})



</script>

<style lang="scss" scoped></style>
