<template>
  <div class="color-filter-container q-mb-md">
    <div class="text-subtitle1 q-mb-sm">按颜色筛选</div>
    
    <!-- 颜色类型选择器 -->
    <div class="color-type-selector q-mb-sm">
      <q-btn-toggle
        v-model="colorType"
        toggle-color="primary"
        :options="[
          {label: '全部', value: 'all'},
          {label: '底色', value: 'base'},
          {label: '字符色', value: 'text'},
          {label: '点缀色', value: 'accent'}
        ]"
        dense
        unelevated
        class="full-width"
      />
    </div>
    
    <!-- 颜色筛选花瓷 -->
    <div class="color-filter-chips">
      <q-chip
        v-for="color in filteredColors"
        :key="color.value"
        :selected="selectedColors.includes(color.value)"
        :color="color.selected ? 'primary' : ''"
        :text-color="color.selected ? 'white' : ''"
        clickable
        @click="toggleColor(color.value)"
        class="color-chip"
      >
        <q-avatar :style="{ backgroundColor: color.color }"></q-avatar>
        {{ color.label }}
      </q-chip>
    </div>
    
    <!-- 清除按钮 -->
    <div class="q-mt-sm" v-if="selectedColors.length > 0">
      <q-btn flat dense size="sm" color="primary" label="清除筛选" @click="clearFilters" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorFilter',
  props: {
    keycaps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedColors: [],
      colorType: 'all', // 默认显示所有颜色类型
      colorMap: [
        // 红色系
        { value: 'red', label: '红色', color: '#e53935', type: ['base', 'text', 'accent'] },
        { value: 'crimson', label: '深红', color: '#d32f2f', type: ['base', 'accent'] },
        { value: 'burgundy', label: '酒红', color: '#8b0000', type: ['base'] },
        { value: 'coral', label: '珊瑚红', color: '#ff7043', type: ['text', 'accent'] },
        
        // 橙色系
        { value: 'orange', label: '橙色', color: '#ff9800', type: ['text', 'accent'] },
        { value: 'amber', label: '琥珀', color: '#ffa000', type: ['text', 'accent'] },
        
        // 黄色系
        { value: 'gold', label: '金色', color: '#ffd700', type: ['text', 'accent'] },
        { value: 'yellow', label: '黄色', color: '#ffeb3b', type: ['text', 'accent'] },
        
        // 绿色系
        { value: 'green', label: '绿色', color: '#4caf50', type: ['base', 'text', 'accent'] },
        { value: 'teal', label: '青绿', color: '#009688', type: ['base', 'accent'] },
        { value: 'mint', label: '薄荷绿', color: '#00bfa5', type: ['text', 'accent'] },
        { value: 'olive', label: '橄榄绿', color: '#827717', type: ['base', 'text'] },
        { value: 'lime', label: '青柠', color: '#cddc39', type: ['text', 'accent'] },
        { value: 'neon-green', label: '霓虹绿', color: '#76ff03', type: ['text'] },
        
        // 蓝色系
        { value: 'blue', label: '蓝色', color: '#2196f3', type: ['base', 'text', 'accent'] },
        { value: 'navy', label: '藏青', color: '#3d5a80', type: ['base'] },
        { value: 'cyan', label: '青色', color: '#00bcd4', type: ['text', 'accent'] },
        { value: 'sky', label: '天蓝', color: '#03a9f4', type: ['text', 'accent'] },
        { value: 'indigo', label: '靛蓝', color: '#3f51b5', type: ['base', 'accent'] },
        
        // 紫色系
        { value: 'purple', label: '紫色', color: '#9c27b0', type: ['base', 'accent'] },
        { value: 'violet', label: '紫罗兰', color: '#673ab7', type: ['base', 'accent'] },
        { value: 'lavender', label: '薰衣草', color: '#b39ddb', type: ['text', 'accent'] },
        { value: 'magenta', label: '洋红', color: '#e91e63', type: ['text', 'accent'] },
        
        // 粉色系
        { value: 'pink', label: '粉色', color: '#e91e63', type: ['text', 'accent'] },
        { value: 'rose', label: '玫瑰', color: '#f06292', type: ['text', 'accent'] },
        { value: 'blush', label: '腮红', color: '#f8bbd0', type: ['text', 'accent'] },
        
        // 棕色系
        { value: 'brown', label: '棕色', color: '#795548', type: ['base', 'text'] },
        { value: 'coffee', label: '咖啡', color: '#6d4c41', type: ['base'] },
        { value: 'tan', label: '棕褐', color: '#d7ccc8', type: ['text'] },
        
        // 灰色系
        { value: 'black', label: '黑色', color: '#212121', type: ['base'] },
        { value: 'grey', label: '灰色', color: '#9e9e9e', type: ['text'] },
        { value: 'silver', label: '银色', color: '#bdbdbd', type: ['text'] },
        { value: 'white', label: '白色', color: '#f5f5f5', type: ['text'] },
        
        // 特殊分类
        { value: 'dark', label: '暗色', color: '#424242', type: ['base'] },
        { value: 'bright', label: '亮色', color: '#bbdefb', type: ['text'] },
        { value: 'pastel', label: '柔和', color: '#f8bbd0', type: ['text', 'accent'] },
        { value: 'neon', label: '霓虹', color: '#76ff03', type: ['text', 'accent'] },
        { value: 'earth', label: '大地色', color: '#8d6e63', type: ['base'] },
        { value: 'warm', label: '暖色', color: '#ff7043', type: ['text', 'accent'] },
        { value: 'cool', label: '冷色', color: '#4fc3f7', type: ['base', 'text', 'accent'] },
        { value: 'contrast', label: '对比色', color: '#7e57c2', type: ['base', 'text', 'accent'] },
        { value: 'monochrome', label: '单色', color: '#757575', type: ['base', 'text'] },
        { value: 'halloween', label: '万圣节', color: '#ff5722', type: ['base', 'text', 'accent'] }
      ]
    }
  },
  computed: {
    // 根据颜色类型筛选颜色
    filteredColors() {
      // 从所有键帽中提取颜色分类
      const allCategories = new Set();
      this.keycaps.forEach(keycap => {
        if (keycap.colorCategory && Array.isArray(keycap.colorCategory)) {
          keycap.colorCategory.forEach(cat => allCategories.add(cat));
        }
      });
      
      // 根据选择的颜色类型筛选
      let filteredMap = this.colorMap;
      if (this.colorType !== 'all') {
        filteredMap = this.colorMap.filter(color => 
          color.type && color.type.includes(this.colorType)
        );
      }
      
      // 只返回在键帽中实际使用的颜色
      return filteredMap
        .filter(color => allCategories.has(color.value))
        .map(color => ({
          ...color,
          selected: this.selectedColors.includes(color.value)
        }));
    }
  },
  methods: {
    toggleColor(color) {
      if (this.selectedColors.includes(color)) {
        this.selectedColors = this.selectedColors.filter(c => c !== color);
      } else {
        this.selectedColors.push(color);
      }
      this.$emit('filter-change', this.selectedColors);
    },
    clearFilters() {
      this.selectedColors = [];
      this.$emit('filter-change', this.selectedColors);
    }
  }
}
</script>

<style scoped>
.color-filter-container {
  border-radius: 8px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.03);
}

.color-filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.color-chip {
  transition: all 0.2s;
}

.color-chip:hover {
  transform: translateY(-2px);
}

.color-type-selector {
  margin-top: 8px;
}
</style>
