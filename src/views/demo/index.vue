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
      <div class="interval-line"></div>
    </template>

    <div class="content">
      <van-tabs ref="tabRef" v-model:active="activeTabIndex" scrollspy sticky :offset-top="pxToVw(48, true)">
        <van-tab title="基本信息">
          <div style="height: 300px">基本信息</div>
        </van-tab>
        <van-tab title="明细信息">
          <div style="height: 300px">明细信息</div>
        </van-tab>
        <van-tab title="附件">
          <AttachmentList :list="attachList.value" />
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

<script setup>
import { showToast } from 'vant';
import { pxToVw } from 'utils';
import { View, FooterButtons, ProcessTracking, AttachmentList } from 'components';

defineOptions({
  name: 'DemoPage',
});

const activeTabIndex = ref(0);
const attachList = reactive({
  value: [
    {
      fileName: 'demo_xls.xls',
      uploadDate: '2023-07-20 11:24:53',
      attachmentId: 111,
      fileType: '.xls',
    },
    {
      fileName: 'demo_ppt.ppt',
      uploadDate: '2023-07-20 11:25:38',
      attachmentId: 222,
      fileType: '.ppt',
    },
    {
      fileName: 'demo_rar.rar',
      uploadDate: '2023-07-20 11:26:46',
      attachmentId: 333,
      fileType: '.rar',
    },
    {
      fileName: 'demo_doc.doc',
      uploadDate: '2023-07-20 11:27:02',
      attachmentId: 444,
      fileType: '.doc',
    },
    {
      fileName: 'demo_zip.zip',
      uploadDate: '2023-07-20 11:27:02',
      attachmentId: 555,
      fileType: '.zip',
    },
    {
      fileName: 'demo_txt.txt',
      uploadDate: '2023-07-20 11:27:02',
      attachmentId: 666,
      fileType: '.txt',
    },
    {
      fileName: 'demo_png.png',
      uploadDate: '2023-07-20 11:27:02',
      attachmentId: 777,
      fileType: '.png',
    },
    {
      fileName: 'demo_jpg.jpg',
      uploadDate: '2023-07-20 11:27:02',
      attachmentId: 888,
      fileType: '.jpg',
    },
  ],
});
const processList = reactive({
  value: [
    {
      approvalNodeName: '张三',
      content: '这是具体流程内容',
      operateType: '审批中',
      employeeName: '李四',
      approvalOperateType: '审批中',
      operateTime: '2023-07-12 14:05:44',
    },
    {
      approvalNodeName: '张三',
      content: '这是具体流程内容',
      operateType: '审批中',
      employeeName: '李四',
      approvalOperateType: '审批中',
      operateTime: '2023-07-12 14:05:44',
    },
    {
      approvalNodeName: '张三',
      content: '这是具体流程内容',
      operateType: '审批中',
      employeeName: '李四',
      approvalOperateType: '审批中',
      operateTime: '2023-07-12 14:05:44',
    },
  ],
});
</script>

<style scoped lang="less">
.interval-line {
  height: 5px;
  background-color: #f5f5f5;
}
</style>
