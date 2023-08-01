<script setup>
defineOptions({
  name: 'TestPage',
});
const $router = useRouter();

function goBack() {
  $router.back();
}
</script>

<template>
  <van-button type="primary" size="large" @click="goBack">返回</van-button>
</template>
