<!--主页面-->
<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 q-mb-md">Keycaps Collection</h1>

    <div class="row q-mb-md items-center">
      <!-- 改进搜索栏 -->
      <div class="col-grow">
        <q-input
          v-model="searchQuery"
          filled
          placeholder="搜索键帽名称或制造商"
          clearable
          @clear="onClear"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
          <template v-slot:hint>
            已找到 {{ filteredKeycaps.length }} 个键帽
          </template>
          <!-- 添加搜索建议 -->
          <template v-slot:after>
            <q-btn-dropdown flat dense style="color: var(--secondary-color)" label="快速筛选">
              <q-list>
                <q-item clickable v-close-popup style="color: var(--secondary-color)" @click="filterByManufacturer('GMK')">
                  <q-item-section>
                    <q-item-label>GMK</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup style="color: var(--secondary-color)" @click="filterByManufacturer('JTK')">
                  <q-item-section>
                    <q-item-label>JTK</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup style="color: var(--secondary-color)" @click="searchQuery = ''">
                  <q-item-section>
                    <q-item-label>显示全部</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </template>
        </q-input>
      </div>

      <!-- 修改按钮样式 -->
      <!-- 添加 flat 属性使背景透明 -->
      <div class="col-auto q-ml-md">
        <q-btn
          flat
          style="color: var(--secondary-color)"
          class="sort-btn"
          @click="toggleSort"
        >
          <q-icon
            :name="sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'"
            class="q-mr-sm"
          />
          ID {{ sortOrder === 'asc' ? '升序' : '降序' }}
        </q-btn>
      </div>
    </div>

    <!-- 添加颜色筛选组件 -->
    <color-filter :keycaps="keycaps" @filter-change="handleColorFilter" />

    <!-- 添加搜索结果提示 -->
    <div v-if="searchQuery && filteredKeycaps.length === 0" class="text-center q-pa-md">
      <q-icon name="search_off" size="48px" style="color: var(--secondary-color)" />
      <p class="text" style="color: var(--secondary-color)">未找到匹配的键帽</p>
    </div>

    <!-- 修改键帽展示网格，使用 draggable -->
    <draggable
      v-model="filteredKeycaps"
      class="row q-col-gutter-md"
      style="color: var(--secondary-color)"
      item-key="id"
      @start="drag=true"
      @end="onDragEnd"
      :group="{ name: 'keycaps' }"
    >
      <template #item="{ element: keycap }">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card class="keycap-card" style="background-color: var(--l9)">
            <div class="drag-handle">
              <q-icon name="drag_indicator" size="sm" class="cursor-move" />
            </div>
            <q-img
              :src="keycap.image"
              class="keycap-image"
              :ratio="1"
            />
            <q-card-section>
              <div class="text-h6">{{ keycap.name }}</div>
              <div class="text-subtitle2">{{ keycap.manufacturer }}</div>
              <keycap-color-extractor :image-src="keycap.image" />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                icon="zoom_in"
                flat
                round
                @click="showPreview(keycap)"
                style="color: var(--secondary-color)"
              />
              <q-btn
                :icon="keycap.isFavorite ? 'favorite' : 'favorite_border'"
                flat
                round
                @click="toggleFavorite(keycap)"
                :color="keycap.isFavorite ? 'red' : 'grey'"
              />
              <q-btn
                :icon="keycap.isShopping ? 'shopping_cart' : 'add_shopping_cart'"
                flat
                round
                @click="toggleShopping(keycap)"
                :color="keycap.isShopping ? 'red' : 'grey'"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </draggable>

    <!-- 添加预览对话框 -->
    <q-dialog v-model="previewDialog">
      <q-card class="preview-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6" style="color: var(--secondary-color)">{{ selectedKeycap?.name }}</div>
          <q-space />
          <q-btn style="color: var(--secondary-color)" icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-img
            :src="selectedKeycap?.image"
            style="max-height: 80vh"
            fit="contain"
          />
        </q-card-section>

        <q-card-section>
          <div class="row items-center">
            <div class="col-12 col-sm-6">
              <div class="text-subtitle1">制造商: {{ selectedKeycap?.manufacturer }}</div>
            </div>
            <div class="col-12 col-sm-6">
              <keycap-color-extractor v-if="selectedKeycap" :image-src="selectedKeycap.image" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { keycapsStore } from 'src/store/keycaps'
import draggable from 'vuedraggable'
import KeycapColorExtractor from 'src/components/KeycapColorExtractor.vue'
import ColorFilter from 'src/components/ColorFilter.vue'

export default {
  name: 'PageIndex',
  components: {
    draggable,
    KeycapColorExtractor,
    ColorFilter
  },
  data () {
    return {
      searchQuery: '',
      keycaps: [],
      previewDialog: false,
      selectedKeycap: null,
      sortOrder: 'asc',
      drag: false,
      selectedColors: []
    }
  },
  created() {
    // 修改这里的初始化逻辑
    // 总是使用 keycapsStore 中的最新数据
    this.keycaps = keycapsStore.getAllKeycaps()

    // 获取保存的排序顺序
    const savedOrder = localStorage.getItem('keycapsOrder')
    if (savedOrder) {
      // 获取保存的顺序
      const orderIds = JSON.parse(savedOrder).map(k => k.id)
      // 按保存的顺序重新排列新数据
      this.keycaps.sort((a, b) => {
        return orderIds.indexOf(a.id) - orderIds.indexOf(b.id)
      })
    }

    // 同步收藏状态
    const favorites = keycapsStore.getFavorites()
    this.keycaps = this.keycaps.map(keycap => ({
      ...keycap,
      isFavorite: favorites.some(f => f.id === keycap.id)
    }))

    const shopping = keycapsStore.getShopping()
    this.keycaps = this.keycaps.map(keycap => ({
      ...keycap,
      isShopping: shopping.some(f => f.id === keycap.id)
    }))
  },
  watch: {
    // 监听 keycaps 数组的变化，保存排序顺序
    keycaps: {
      handler(newKeycaps) {
        // 只保存 id 的顺序
        localStorage.setItem('keycapsOrder', JSON.stringify(newKeycaps))
      },
      deep: true
    }
  },
  computed: {
    filteredKeycaps: {
      get() {
        if (this.drag) return this.keycaps

        return this.keycaps.filter(keycap => {
          // 文本搜索筛选
          const searchLower = this.searchQuery.toLowerCase()
          const textMatch = keycap.name.toLowerCase().includes(searchLower) ||
                 keycap.manufacturer.toLowerCase().includes(searchLower)

          // 颜色筛选
          let colorMatch = true
          if (this.selectedColors.length > 0) {
            colorMatch = this.selectedColors.some(color =>
              keycap.colorCategory && keycap.colorCategory.includes(color)
            )
          }

          return textMatch && colorMatch
        }).sort((a, b) => {
          if (this.sortOrder === 'asc') {
            return a.id - b.id
          } else {
            return b.id - a.id
          }
        })
      },
      set(value) {
        this.keycaps = value
      }
    }
  },
  methods: {
    toggleFavorite (keycap) {
      keycap.isFavorite = !keycap.isFavorite
      if (keycap.isFavorite) {
        keycapsStore.addToFavorites(keycap)
      } else {
        keycapsStore.removeFromFavorites(keycap.id)
      }
    },
    toggleShopping (keycap) {
      keycap.isShopping = !keycap.isShopping
      if (keycap.isShopping) {
        keycapsStore.addToShopping(keycap)
      } else {
        keycapsStore.removeFromShopping(keycap.id)
      }
    },
    // 添加预览方法
    showPreview(keycap) {
      this.selectedKeycap = keycap
      this.previewDialog = true
    },
    // 修改 toggleSort 方法
    toggleSort() {
      if (this.sortOrder === 'asc') {
        this.sortOrder = 'desc'
      } else if (this.sortOrder === 'desc') {
        this.sortOrder = 'asc'
      }

      // 应用新的排序并保存
      const sortedKeycaps = [...this.keycaps].sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.id - b.id
        } else {
          return b.id - a.id
        }
      })
      this.keycaps = sortedKeycaps
      localStorage.setItem('keycapsOrder', JSON.stringify(sortedKeycaps))
    },
    // 添加拖拽结束后的处理方法
    onDragEnd() {
      this.drag = false
      // 保存新的顺序
      localStorage.setItem('keycapsOrder', JSON.stringify(this.keycaps))
    },
    // 添加新方法
    onClear() {
      this.searchQuery = ''
    },
    filterByManufacturer(manufacturer) {
      this.searchQuery = manufacturer
    },
    // 处理颜色筛选变化
    handleColorFilter(selectedColors) {
      this.selectedColors = selectedColors
    }
  }
}
</script>

<style scoped>
.keycap-card {
  transition: all 0.3s;
  height: 100%;
  position: relative; /* 为拖拽手柄定位 */
}
.keycap-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.keycap-image {
  height: 200px;
  object-fit: cover;
}

.drag-handle {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: move;
}

/* 拖拽时的样式 */
.sortable-ghost {
  opacity: 0.5;
}

.sortable-drag {
  cursor: move;
}

/* 颜色显示样式 */
.color-display {
  display: flex;
  align-items: center;
}

.color-info {
  font-size: 0.8rem;
  margin-left: 10px;
}

.color-code {
  font-family: monospace;
}

/* 键帽预览样式 */
.keycap-preview {
  display: flex;
  gap: 5px;
}

.q-key {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 1px solid;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1);
}

.shift-key {
  width: 40px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 1px solid;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1);
}

/* 预览对话框中的颜色显示 */
.preview-color-display {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.preview-keycap-display {
  display: flex;
  gap: 8px;
  margin-right: 15px;
}

.preview-q-key {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  border: 1.5px solid;
  box-shadow: 0 3px 5px rgba(0,0,0,0.15);
}

.preview-shift-key {
  width: 55px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  border: 1.5px solid;
  box-shadow: 0 3px 5px rgba(0,0,0,0.15);
}

.preview-color-info {
  font-size: 0.9rem;
}

.preview-card {
  min-width: 1100px;
  max-width: 200vw;
  min-height: 100px;
  max-height: 90vh;
}

.sort-btn {
  height: 56px; /* 与搜索框高度对齐 */
}
</style>
