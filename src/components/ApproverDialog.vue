<template>
  <div class="approver-dialog">
    <van-dialog
      v-bind="$attrs"
      title="选择审批人"
      show-cancel-button
      :before-close="handleBeforeClose"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <van-checkbox-group v-if="multiple" v-model="checked" shape="square">
        <van-checkbox
          v-for="(item, index) in list"
          :key="item[checkedKey] || index"
          :name="item[checkedKey]"
          label-position="left"
        >
          <div class="approver-wrapper">
            <div class="approver-name">{{ item.approverName }}</div>
            <div class="approver-unit">{{ item.unit }}</div>
          </div>
        </van-checkbox>
      </van-checkbox-group>
      <van-radio-group v-else v-model="checked" shape="square">
        <van-radio
          v-for="(item, index) in list"
          :key="item[checkedKey] || index"
          :name="item[checkedKey]"
          label-position="left"
        >
          <div class="approver-wrapper">
            <div class="approver-name">{{ item.approverName }}</div>
            <div class="approver-unit">{{ item.unit }}</div>
          </div>
        </van-radio>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script setup>
import { showToast } from 'vant';

const props = defineProps({
  // 是否开启多选
  multiple: { type: Boolean, default: false },
  // 选中项的唯一标识字段
  checkedKey: { type: String, required: true },
  // 数据列表
  list: { type: Array, default: () => [], required: true },
});
const emits = defineEmits(['confirm']);

const checked = ref([]);

/**
 * @description: 弹窗关闭前钩子
 * @param {String}
 * @return {*}
 */
function handleBeforeClose(action) {
  if (action === 'confirm' && checked.value.length <= 0) {
    showToast('请至少选择一个审批人');
    return false;
  }
  return true;
}

/**
 * @description: 弹窗确认回调
 * @return {*}
 */
function handleConfirm() {
  const { multiple, checkedKey, list } = props;
  if (multiple) {
    emits(
      'confirm',
      checked.value.map((outer) => list.find((inner) => inner[checkedKey] === outer)),
    );
  } else {
    emits(
      'confirm',
      list.find((item) => item[checkedKey] === checked.value),
    );
  }
}

/**
 * @description: 弹窗取消回调
 * @return {*}
 */
function handleCancel() {
  checked.value = [];
}
</script>

<style lang="less" scoped>
.approver-dialog {
  .approver-wrapper {
    height: 40px;
    padding: 15px 15px 12px;

    .approver-name {
      font-size: 16px;
      color: #000;
      line-height: 24px;
    }
    .approver-unit {
      font-size: 13px;
      color: #999;
      line-height: 20px;
    }
  }
  :deep(.van-dialog) {
    .van-dialog__footer {
      box-shadow: 0 -2px 2.667vw 0 rgba(51, 51, 51, 0.12);
    }
    .van-dialog__header {
      box-shadow: 0 1px 2.667vw 0 rgba(51, 51, 51, 0.12);
    }
  }
  :deep(.van-checkbox),
  :deep(.van-radio) {
    border-bottom: 1px solid #e5e5e5;
    &:last-of-type {
      border-bottom: none;
    }
    .van-checkbox__icon,
    .van-radio__icon {
      margin-right: 15px;
      .van-icon {
        font-size: 12px;
      }
    }
    .van-checkbox__label,
    .van-radio__label {
      flex: 1;
    }
  }
}
</style>
