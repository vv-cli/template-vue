<template>
  <div class="w-view">
    <header ref="header" class="w-header van-safe-area-top">
      <slot name="header"> </slot>
    </header>

    <div ref="subHeader" class="w-sub-header">
      <slot name="sub-header"> </slot>
    </div>

    <section :style="`height: calc(100vh - ${reduceHeight}px);`" class="w-content">
      <slot> </slot>
    </section>

    <footer ref="footer" class="w-footer van-safe-area-bottom">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script setup>
defineOptions({
  name: 'WView',
});

const slots = useSlots();
const reduceHeight = ref(0);
const header = ref(null);
const subHeader = ref(null);
const footer = ref(null);

onMounted(() => {
  calcReduceHeight();
});

/**
 * @description: 计算content之外的高度
 * @return {*}
 */
function calcReduceHeight() {
  const list = [
    { exist: !!slots.header, dom: header.value },
    { exist: !!slots['sub-header'], dom: subHeader.value },
    { exist: !!slots.footer, dom: footer.value },
  ];
  reduceHeight.value = list.reduce((initial, cur) => {
    console.log(cur);
    return initial + (cur.exist ? cur.dom.offsetHeight ?? 0 : 0);
  }, 0);
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
}
</style>
