<!--主页面-->
<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 q-mb-md">Keybaord Collection</h1>

    <div class="row q-mb-md items-center">
      <!-- 改进搜索栏 -->
      <div class="col-grow">
        <q-input
          v-model="searchQuery"
          filled
          placeholder="搜索键盘名称、制造商、配列、作者"
          clearable
          @clear="onClear"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
          <template v-slot:hint>
            已找到 {{ filteredKeybaord.length }} 个键盘
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

    <!-- 添加搜索结果提示 -->
    <div v-if="searchQuery && filteredKeybaord.length === 0" class="text-center q-pa-md">
      <q-icon name="search_off" size="48px" style="color: var(--secondary-color)" />
      <p class="text" style="color: var(--secondary-color)">未找到匹配的键盘</p>
    </div>

    <!-- 修改键帽展示网格，使用 draggable -->
    <draggable
      v-model="filteredKeyboard"
      class="row q-col-gutter-md"
      style="color: var(--secondary-color)"
      item-key="id"
      @start="drag=true"
      @end="onDragEnd"
      :group="{ name: 'keyboard' }"
    >
      <template #item="{ element: keyboard }">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card class="keyboard-card" style="background-color: var(--l9)">
            <div class="drag-handle">
              <q-icon name="drag_indicator" size="sm" class="cursor-move" />
            </div>
            <q-img
              :src="keyboard.image"
              class="keyboard-image"
              :ratio="1"
            />
            <q-card-section>
              <div class="text-h6">{{ keyboard.name }}</div>
              <div class="row justify-between">
                <div class="text-subtitle2">{{ keyboard.design }}</div>
                <div class="text-subtitle2">{{ keyboard.layout }}</div>
              </div>
              <div class="row justify-between">
                <div class="text-subtitle2">{{ keyboard.manufacturer }}</div>
                <div class="text-subtitle2">{{ keyboard.pcb }}</div>
              </div>
              <div class="text-subtitle2 text-right" >{{ keyboard.price }}</div>

            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                icon="zoom_in"
                flat
                round
                @click="showPreview(keyboard)"
                style="color: var(--secondary-color)"
              />
              <q-btn
                :icon="keyboard.isFavorite ? 'favorite' : 'favorite_border'"
                flat
                round
                @click="toggleFavorite(keyboard)"
                :color="keyboard.isFavorite ? 'red' : 'grey'"
              />
              <q-btn
                :icon="keyboard.isShopping ? 'shopping_cart' : 'add_shopping_cart'"
                flat
                round
                @click="toggleShopping(keyboard)"
                :color="keyboard.isShopping ? 'red' : 'grey'"
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
          <div class="text-h6" style="color: var(--secondary-color)">{{ selectedKeyboard?.name }}</div>
          <q-space />
          <q-btn style="color: var(--secondary-color)" icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-img
            :src="selectedKeyboard?.image"
            style="max-height: 80vh"
            fit="contain"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { keycapsStore } from 'src/store/keycaps'
import draggable from 'vuedraggable'

export default {
  name: 'PageIndex',
  components: {
    draggable
  },
  data () {
    return {
      searchQuery: '',
      keyboard: [],
      previewDialog: false,
      selectedKeyboard: null,
      sortOrder: 'asc',
      drag: false
    }
  },
  created() {
    // 修改这里的初始化逻辑
    // 总是使用 keycapsStore 中的最新数据
    this.keyboard = keycapsStore.getAllKeyboard()

    // 获取保存的排序顺序
    const savedOrder = localStorage.getItem('keyboardOrder')
    if (savedOrder) {
      // 获取保存的顺序
      const orderIds = JSON.parse(savedOrder).map(k => k.id)
      // 按保存的顺序重新排列新数据
      this.keyboard.sort((a, b) => {
        return orderIds.indexOf(a.id) - orderIds.indexOf(b.id)
      })
    }

    // 同步收藏状态
    const favorites = keycapsStore.getFavorites()
    this.keyboard = this.keyboard.map(keyboard => ({
      ...keyboard,
      isFavorite: favorites.some(f => f.id === keyboard.id)
    }))

    const shopping = keycapsStore.getShopping()
    this.keyboard = this.keyboard.map(keyboard => ({
      ...keyboard,
      isShopping: shopping.some(f => f.id === keyboard.id)
    }))
  },
  watch: {
    // 监听 keycaps 数组的变化，保存排序顺序
    keyboard: {
      handler(newKeyboard) {
        // 只保存 id 的顺序
        localStorage.setItem('keyboardOrder', JSON.stringify(newKeyboard))
      },
      deep: true
    }
  },
  computed: {
    filteredKeyboard: {
      get() {
        if (this.drag) return this.keyboard

        return this.keyboard.filter(keyboard => {
          const searchLower = this.searchQuery.toLowerCase()
          return keyboard.name.toLowerCase().includes(searchLower) ||
            keyboard.manufacturer.toLowerCase().includes(searchLower)
        }).sort((a, b) => {
          if (this.sortOrder === 'asc') {
            return a.id - b.id
          } else {
            return b.id - a.id
          }
        })
      },
      set(value) {
        this.keyboard = value
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
      this.selectedKeyboard = keycap
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
      const sortedKeyboard = [...this.keyboard].sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.id - b.id
        } else {
          return b.id - a.id
        }
      })
      this.keyboard = sortedKeyboard
      localStorage.setItem('keyboardOrder', JSON.stringify(sortedKeyboard))
    },
    // 添加拖拽结束后的处理方法
    onDragEnd() {
      this.drag = false
      // 保存新的顺序
      localStorage.setItem('keyboardOrder', JSON.stringify(this.keyboard))
    },
    // 添加新方法
    onClear() {
      this.searchQuery = ''
    },
    filterByManufacturer(manufacturer) {
      this.searchQuery = manufacturer
    },
    filterByDesign(design) {
      this.searchQuery = design
    },
    filterByLayout(layout) {
      this.searchQuery = layout
    }
  }
}
</script>

<style scoped>
.keyboard--card {
  transition: all 0.3s;
  height: 100%;
  position: relative; /* 为拖拽手柄定位 */
}
.keyboard--card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.keyboard-image {
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
