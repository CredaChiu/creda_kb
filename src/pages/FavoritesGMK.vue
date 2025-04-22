<template>
    <q-page class="q-pa-md">
      <h1 class="text-h4 q-mb-md">GMK Collection</h1>
      
      <div class="row q-col-gutter-md">
        <div
          v-for="keycap in gmkKeycaps"
          :key="keycap.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card class="keycap-card">
            <q-img 
              :src="keycap.image" 
              class="keycap-image"
              :ratio="1"
            />
            <q-card-section>
              <div class="text-h6">{{ keycap.name }}</div>
              <div class="text-subtitle2">{{ keycap.manufacturer }}</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                icon="favorite"
                flat
                round
                color="red"
                @click="removeFavorite(keycap)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { keycapsStore } from 'src/store/keycaps'
  
  export default {
    name: 'PageFavoritesGMK',
    data () {
      return {
        jtkKeycaps: []
      }
    },
    created () {
      this.loadJTKFavorites()
    },
    methods: {
      loadJTKFavorites () {
        // 获取所有收藏，并筛选出 JTK 的键帽
        const favorites = keycapsStore.getFavorites()
        this.jtkKeycaps = favorites.filter(keycap => 
          keycap.manufacturer.toLowerCase() === 'jtk'
        )
      },
      removeFavorite (keycap) {
        keycapsStore.removeFromFavorites(keycap.id)
        this.loadJTKFavorites()
      }
    }
  }
  </script>
  
  <style scoped>
  .keycap-card {
    transition: all 0.3s;
    height: 100%;
  }
  
  .keycap-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
  
  .keycap-image {
    height: 200px;
    object-fit: cover;
  }
  </style> 