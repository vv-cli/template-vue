<script setup>
defineProps({
  // 按钮内容
  text: {
    type: [String, Array],
    default: '',
    required: true,
  },
  // 是否禁用
  disabled: {
    type: [Boolean, Array],
    default: false,
  },
  // 按钮类型
  type: {
    type: [String, Array],
    default: 'primary',
    validator: (val) => {
      const valType = typeof val;
      if (valType === 'string') {
        return ['primary', 'plain'].includes(val);
      }
      if (Array.isArray(val)) {
        return ![...new Set(val)].some((item) => !['primary', 'plain'].includes(item));
      }
      return false;
    },
  },
});

const emit = defineEmits(['firstClick', 'secondClick']);

/**
 * @description: 按钮点击事件回调
 * @param {*} index 按钮下标
 * @return {*}
 */
function handleClick(index) {
  const fnName = index === 0 ? 'firstClick' : 'secondClick';
  emit(fnName);
}
</script>

<template>
  <div class="footer-buttons flex-between-center">
    <template v-if="typeof text === 'string'">
      <van-button :type="type" class="btn" :disabled="disabled" @click="handleClick(0)">{{ text }}</van-button>
    </template>
    <template v-else>
      <van-button
        v-for="(name, index) in text"
        :key="name + index"
        :type="Array.isArray(type) ? type[index] || 'primary' : 'primary'"
        class="btn"
        :disabled="Array.isArray(disabled) ? disabled[index] ?? false : false"
        @click="handleClick(index)"
      >
        {{ name }}
      </van-button>
    </template>
  </div>
</template>

<style lang="less" scoped>
.footer-buttons {
  padding: 10px 15px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  height: 64px;
  border: 1px solid #fff;
  box-shadow: 0 -2px 2.667vw 0 rgba(51, 51, 51, 0.12);

  .btn {
    height: 100%;
    flex: 1;
    &:nth-of-type(2) {
      margin-left: 10px;
    }
  }

  :deep(.van-button--plain) {
    border: 1px solid var(--theme-color);
    color: var(--theme-color);
  }
}
</style>
