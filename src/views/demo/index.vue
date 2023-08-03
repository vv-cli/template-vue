<script setup>
import { showToast } from 'vant';
import { View, FooterButtons, ProcessTracking } from 'components';

defineOptions({
  name: 'DemoPage',
});

const activeTabIndex = ref(0);
const processList = reactive({
  value: [
    {
      approvalNodeName: '张三',
      content: '当前报账单需完成【影像扫描】，才可进入下一审批节点',
      operateType: '审批中',
      employeeName: '李四',
      approvalOperateType: '审批中',
      operateTime: '2023-07-12 14:05:44',
    },
    {
      approvalNodeName: '张三',
      content: '当前报账单需完成【影像扫描】，才可进入下一审批节点',
      operateType: '审批中',
      employeeName: '李四',
      approvalOperateType: '审批中',
      operateTime: '2023-07-12 14:05:44',
    },
    {
      approvalNodeName: '张三',
      content: '当前报账单需完成【影像扫描】，才可进入下一审批节点',
      operateType: '审批中',
      employeeName: '李四',
      approvalOperateType: '审批中',
      operateTime: '2023-07-12 14:05:44',
    },
  ],
});
</script>

<template>
  <View>
    <template #header>
      <van-nav-bar
        title="Demo"
        left-arrow
        :border="false"
        @click-left="showToast('返回')"
        @click-right="showToast('退出')"
      >
        <template #right>
          <van-icon name="cross" />
        </template>
      </van-nav-bar>
    </template>

    <div class="content">
      <van-tabs ref="tabRef" v-model:active="activeTabIndex" scrollspy sticky offset-top="44">
        <van-tab title="基本信息">
          <div style="height: 300px">基本信息</div>
        </van-tab>
        <van-tab title="明细信息">
          <div style="height: 300px">明细信息</div>
        </van-tab>
        <van-tab title="流程跟踪">
          <ProcessTracking :list="processList.value" />
        </van-tab>
      </van-tabs>
    </div>

    <template #footer>
      <FooterButtons
        :text="['不同意', '同意']"
        :type="['plain', 'primary']"
        @first-click="showToast('不同意')"
        @second-click="showToast('同意')"
      />
    </template>
  </View>
</template>

<style scoped lang="less"></style>
