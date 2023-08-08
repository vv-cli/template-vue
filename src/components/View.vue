<template>
  <div class="w-view">
    <header ref="headerRef" class="w-header van-safe-area-top">
      <slot name="header"> </slot>
    </header>

    <div ref="subHeaderRef" class="w-sub-header">
      <slot name="sub-header"> </slot>
    </div>

    <section :style="`height: calc(100vh - ${reduceHeight}vw);`" class="w-content">
      <slot> </slot>
    </section>

    <footer ref="footerRef" class="w-footer van-safe-area-bottom">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script setup>
import { pxToVw } from 'utils';

defineOptions({
  name: 'WView',
});

const slots = useSlots();
const reduceHeight = ref(0);
const headerRef = ref(null);
const subHeaderRef = ref(null);
const footerRef = ref(null);

onMounted(() => {
  calcReduceHeight();
});

/**
 * @description: 计算content之外的高度
 * @return {*}
 */
function calcReduceHeight() {
  const list = [
    { exist: !!slots.header, dom: headerRef.value },
    { exist: !!slots['sub-header'], dom: subHeaderRef.value },
    { exist: !!slots.footer, dom: footerRef.value },
  ];
  reduceHeight.value = pxToVw(
    list.reduce((initial, cur) => {
      return initial + (cur.exist ? cur.dom.offsetHeight ?? 0 : 0);
    }, 0),
  );
}
</script>

<style lang="less" scoped>
.w-view {
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .w-content {
    overflow: hidden scroll;
  }

  .w-footer {
    box-shadow: 0 -2px 2.667vw 0 rgba(51, 51, 51, 0.12);
    position: relative;
  }
}
</style>
