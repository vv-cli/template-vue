<template>
  <van-steps direction="vertical" :active="0" class="process-tracking">
    <van-step v-for="(item, index) in list" :key="index">
      <template #active-icon>
        <div class="dot"></div>
      </template>
      <div class="line title-line flex-between">
        <div class="title-name">{{ item.approvalNodeName }}</div>
        <div class="titile-type">{{ item.approvalOperateType }}</div>
        <div class="time">{{ item.operateTime }}</div>
      </div>
      <div class="line node-line flex-left">
        <div>{{ item.employeeName }}</div>
        <div>{{ item.operateType }}</div>
      </div>
      <div class="content">
        {{ item.content }}
      </div>
    </van-step>
  </van-steps>
</template>

<script setup>
defineProps({
  list: { type: Array, default: () => [], required: true },
});
</script>

<style lang="less" scoped>
.process-tracking {
  font-size: 14px;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--theme-color);
  }
  .line {
    margin-bottom: 10px;
  }
  .title-line {
    .title-name {
      width: 110px;
      color: #666;
    }
    .title-type {
      flex: 1;
      margin: 0 10px;
    }
    .time {
      font-size: 12px;
      color: #999;
      width: 120px;
    }
  }
  .node-line {
    font-size: 16px;
    color: #000;
    & > div:first-child {
      margin-right: 10px;
    }
  }
  .content {
    margin-bottom: 10px;
    color: #666;
  }
}
</style>
