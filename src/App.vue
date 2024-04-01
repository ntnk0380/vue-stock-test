<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-blue-10 text-white" height-hint="64">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-h5">
          Stock Test
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" class="bg-white" elevated :width="250">
      <q-scroll-area class="fit">
        <q-list padding class="text-blue-10">
          <q-list padding class="text-blue-10 menu-nav">
            <div v-for="L1 in Menulist" :key="L1.text">
              <q-item v-if="L1.submenu === undefined" v-ripple clickable :to="L1.url" active-class="my-menu-link">
                <q-item-section avatar>
                  <q-icon size="20px" :name="L1.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ L1.text }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-expansion-item v-else :content-inset-level="0.5" expand-separator>
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-icon size="20px"  :name="L1.icon" />
                  </q-item-section>
                  <q-item-section>{{ L1.text }}</q-item-section>
                </template>
                <q-item v-for="L2 in L1.submenu" :key="L2.text" @click="onOpen(L2.text, L2.url)" clickable active-class="my-menu-link">
                  <q-item-section>
                    <q-item-label> - {{ L2.text }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>
            </div>
          </q-list>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="q-px-md q-py-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    const Menulist = ref([
      { icon: 'fa-solid fa-boxes-stacked', text: 'Stock', url: '/stock' },
    ]);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      Menulist
    };
  },
};
</script>

<style scoped>
.q-toolbar {
  min-height: 70px
}
</style>
