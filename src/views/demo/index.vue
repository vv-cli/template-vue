<script setup>
defineOptions({
  name: 'DemoPage',
});
const $router = useRouter();

function goBack() {
  $router.push({
    name: 'Test',
  });
}
</script>

<template>
  <div style="height: 100px" class="div"></div>
  <van-button type="primary" size="large" @click="goBack">Go Test</van-button>
</template>

<style scoped lang="less">
.div {
  width: 200px;
}
</style>
