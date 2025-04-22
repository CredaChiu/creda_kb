<template>
  <div class="keycap-colors-container">
    <div class="keycap-color-sample">
      <div class="color-sample-title">键帽颜色</div>
      <div class="color-samples">
        <div
          v-for="(color, index) in extractedColors"
          :key="index"
          class="color-sample"
          :style="{ backgroundColor: color }"
          :title="color"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeycapColorExtractor',
  props: {
    imageSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      extractedColors: []
    }
  },
  watch: {
    imageSrc: {
      immediate: true,
      handler(newSrc) {
        if (newSrc) {
          this.extractColorsFromImage(newSrc);
        }
      }
    }
  },
  methods: {
    extractColorsFromImage(src) {
      // 使用Canvas API分析图片并提取主要颜色
      this.extractedColors = ['#555555', '#eeeeee', '#777777', '#cccccc', '#999999']; // 默认颜色

      // 创建一个新的图像对象
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // 处理跨域问题

      // 当图片加载完成后分析颜色
      img.onload = () => {
        // 创建一个画布元素
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置画布大小
        const maxSize = 200; // 限制分析大小以提高性能
        let width = img.width;
        let height = img.height;

        // 等比缩放到适当大小
        if (width > height && width > maxSize) {
          height = Math.round(height * (maxSize / width));
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round(width * (maxSize / height));
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;

        // 在画布上绘制图像
        ctx.drawImage(img, 0, 0, width, height);

        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, width, height).data;

        // 使用颜色量化算法提取主要颜色
        const extractedColors = this.extractDominantColors(imageData, 5);

        // 更新组件的颜色数组
        if (extractedColors.length > 0) {
          this.extractedColors = extractedColors;
        }
      };

      // 处理加载错误
      img.onerror = () => {
        console.error('Error loading image for color extraction');
      };

      // 开始加载图片
      // 处理图片路径
      let fullPath = src;

      // 如果是相对路径，转换为绝对路径
      if (src.startsWith('public/')) {
        fullPath = src.replace('public/', '/');
      }

      // 添加时间戳防止缓存
      img.src = fullPath + '?t=' + new Date().getTime();
    },

    // 从图像数据中提取主要颜色
    extractDominantColors(imageData, colorCount) {
      // 创建颜色数量统计
      const colorMap = {};
      const pixelCount = imageData.length / 4; // 总像素数
      const skipPixels = Math.max(1, Math.floor(pixelCount / 10000)); // 采样率，提高性能

      // 遍历每个像素，每4个值为一个像素(RGBA)
      for (let i = 0; i < imageData.length; i += 4 * skipPixels) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];

        // 跳过透明像素
        if (a < 128) continue;

        // 跳过接近白色和黑色的背景像素
        if (this.isBackgroundColor(r, g, b)) continue;

        // 量化颜色以减少变化
        const quantizedR = Math.round(r / 16) * 16;
        const quantizedG = Math.round(g / 16) * 16;
        const quantizedB = Math.round(b / 16) * 16;

        // 创建颜色键
        const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;

        // 增加颜色计数
        if (colorMap[colorKey]) {
          colorMap[colorKey].count++;
          // 计算颜色的饱和度和亮度
          colorMap[colorKey].saturation += this.calculateSaturation(r, g, b);
          colorMap[colorKey].brightness += this.calculateBrightness(r, g, b);
        } else {
          colorMap[colorKey] = {
            color: `#${this.componentToHex(quantizedR)}${this.componentToHex(quantizedG)}${this.componentToHex(quantizedB)}`,
            count: 1,
            r: quantizedR,
            g: quantizedG,
            b: quantizedB,
            saturation: this.calculateSaturation(r, g, b),
            brightness: this.calculateBrightness(r, g, b)
          };
        }
      }

      // 将颜色转换为数组
      let colors = Object.values(colorMap);

      // 计算平均饱和度和亮度
      colors.forEach(color => {
        color.saturation /= color.count;
        color.brightness /= color.count;
      });

      // 按出现频率排序
      colors.sort((a, b) => b.count - a.count);

      // 选取前20个频率最高的颜色
      colors = colors.slice(0, 20);

      // 尝试找到底色（通常是频率高且亮度低的颜色）
      const baseColors = colors.filter(c => c.brightness < 0.6).sort((a, b) => b.count - a.count);
      const baseColor = baseColors.length > 0 ? baseColors[0].color : colors[0].color;

      // 尝试找到字符颜色（通常是饱和度高或亮度高的颜色）
      const textColors = colors.filter(c => c.brightness > 0.7 || c.saturation > 0.7)
        .filter(c => c.color !== baseColor)
        .sort((a, b) => (b.saturation + b.brightness) - (a.saturation + a.brightness));
      const textColor = textColors.length > 0 ? textColors[0].color : '#FFFFFF';

      // 尝试找到点缀颜色（饱和度高但不是字符颜色的颜色）
      const accentColors = colors.filter(c =>
        c.color !== baseColor &&
        c.color !== textColor &&
        c.saturation > 0.4
      ).sort((a, b) => b.saturation - a.saturation);

      // 组合结果
      const result = [baseColor, textColor];

      // 添加点缀颜色
      for (let i = 0; i < Math.min(3, accentColors.length); i++) {
        result.push(accentColors[i].color);
      }

      // 如果点缀颜色不足，添加其他频率高的颜色
      while (result.length < colorCount && colors.length > result.length) {
        const nextColor = colors.find(c => !result.includes(c.color));
        if (nextColor) {
          result.push(nextColor.color);
        } else {
          break;
        }
      }

      return result;
    },

    // 将颜色分量转换为十六进制
    componentToHex(c) {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    },

    // 计算颜色的饱和度 (0-1)
    calculateSaturation(r, g, b) {
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      if (max === 0) return 0;

      return (max - min) / max;
    },

    // 计算颜色的亮度 (0-1)
    calculateBrightness(r, g, b) {
      return (r + g + b) / (3 * 255);
    },

    // 检查是否为背景颜色（非常浅或非常深的颜色）
    isBackgroundColor(r, g, b) {
      const brightness = this.calculateBrightness(r, g, b);
      const saturation = this.calculateSaturation(r, g, b);

      // 跳过非常浅的颜色（接近白色）
      if (brightness > 0.95 && saturation < 0.1) return true;

      // 跳过非常深的颜色（接近黑色）
      if (brightness < 0.05) return true;

      return false;
    }
  }
}
</script>

<style scoped>
.keycap-colors-container {
  margin-top: 8px;
}

.keycap-color-sample {
  display: flex;
  flex-direction: column;
}

.color-sample-title {
  font-size: 0.9rem;
  margin-bottom: 4px;
  color: inherit;
}

.color-samples {
  display: flex;
  gap: 6px;
}

.color-sample {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-sample:hover {
  transform: scale(1.1);
}

.color-sample-label {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.8);
  pointer-events: none;
  font-weight: bold;
}
</style>
