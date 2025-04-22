<!--主布局-->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: var(--primary-color)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"

          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Menu
        </q-toolbar-title>

        <q-toolbar-title>Keycaps Collection</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background-color: var(--accent-color)"
    >
      <q-list>
        <q-item clickable to="/" style="color: var(--primary-color)">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>首页</q-item-section>
        </q-item>

        <q-item clickable to="/keycaps" style="color: var(--primary-color)">
          <q-item-section avatar>
            <q-icon name="keyboard" />
          </q-item-section>
          <q-item-section>Keycaps</q-item-section>
        </q-item>

        <q-item clickable to="/keyboard" style="color: var(--primary-color)">
          <q-item-section avatar>
            <q-icon name="keyboard" />
          </q-item-section>
          <q-item-section>Keyboard</q-item-section>
        </q-item>

        <q-expansion-item
          icon="favorite"
          label="我的收藏"
          clickable to="/favorites"
          default-closed
        >
          <q-list padding>
            <q-item clickable to="/favorites/Keyboard">
              <q-item-section avatar>
                <q-icon name="keyboard" />
              </q-item-section>
              <q-item-section>Keyboard</q-item-section>
            </q-item>

            <q-expansion-item icon="keyboard"
                              label="Keycaps"
                              clickable to="/favorites/keycaps"
                              default-closed>
              <q-list padding>
                <q-item clickable to="/favorites/jtk">
                  <q-item-section avatar>
                    <q-icon name="keyboard" />
                  </q-item-section>
                  <q-item-section>JTK</q-item-section>
                </q-item>

                <q-item clickable to="/favorites/gmk">
                  <q-item-section avatar>
                    <q-icon name="keyboard" />
                  </q-item-section>
                  <q-item-section>GMK</q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>

          </q-list>
        </q-expansion-item>

        <q-expansion-item
          icon="shopping_cart"
          label="我的追踪"
          clickable to="/following"
          default-closed
        >
          <q-list padding>
            <q-item clickable to="/following/Keyboard">
              <q-item-section avatar>
                <q-icon name="keyboard" />
              </q-item-section>
              <q-item-section>Keyboard</q-item-section>
            </q-item>

            <q-item clickable to="/following/Keycaps">
              <q-item-section avatar>
                <q-icon name="keyboard" />
              </q-item-section>
              <q-item-section>Keycaps</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
.q-drawer {
  .q-item {
    &:hover {
      background-color: var(--secondary-color) !important;
      color: white !important;
    }
  }
}
</style>
