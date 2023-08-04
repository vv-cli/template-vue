<template>
  <div class="attachment-list">
    <div v-for="item in list" :key="item.attachmentId" class="attachment-row">
      <div class="thumb-container">
        <img class="file-image" :src="typeToImg(item.fileType)" />
      </div>
      <div class="right">
        <div class="title">{{ item.attacheType }}{{ item.fileName }}</div>
        <div class="other">
          <div v-if="item.uploadDate" class="time">上传时间：{{ item.uploadDate }}</div>
          <div class="actions">
            <div class="preview" @click="showToast('预览')">预览</div>
            <div class="download" @click="showToast('下载')">下载</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showToast } from 'vant';

defineProps({
  list: { type: Array, default: () => [], required: true },
});

/**
 * @description: 通过文件类型获取对应展示图片
 * @param {*} fileType 文件类型
 * @return {*}
 */
function typeToImg(fileType) {
  let imgName = '';
  switch (fileType) {
    case '.doc':
    case '.docx':
      imgName = 'word.png';
      break;
    case '.xls':
    case '.xlsx':
      imgName = 'excel.png';
      break;
    case '.ppt':
    case '.pptx':
    case '.pdf':
      imgName = 'ppt.png';
      break;
    case '.rar':
      imgName = 'rar.png';
      break;
    case '.zip':
      imgName = 'zip.png';
      break;
    case '.txt':
      imgName = 'txt.png';
      break;
    default:
      imgName = 'photo.png';
      break;
  }
  return new URL(`../assets/images/${imgName}`, import.meta.url).href;
}
</script>

<style lang="less" scoped>
.attachment-list {
  background-color: #fff;
  margin-bottom: 15px;

  .attachment-row {
    margin-left: 10px;
    width: calc(100% - 10px);
    display: flex;
    padding: 10px 0 10px 0;
    position: relative;

    &:after {
      position: absolute;
      content: '';
      width: 360px;
      bottom: 0px;
      left: 5px;
      border-bottom: 1px solid #e5e5e5;
    }
    .thumb-container {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
    }
    .right {
      width: calc(100% - 32px - 5px - 15px);
      padding-right: 15px;
      .title {
        font-size: 16px;
        line-height: 24px;
        color: #333;
        word-break: break-all;
      }
      .other {
        margin-top: 5px;
        display: inline-flex;
        justify-content: flex-end;
        width: 100%;
        line-height: 21px;
        font-size: 14px;
        .time {
          font-size: 13px;
          line-height: 21px;
          color: #999;
          display: inline-flex;
          align-items: flex-end;
          width: 69%;
        }
        .actions {
          display: inline-flex;
          justify-content: flex-end;
          width: 31%;
          & > div:first-child {
            margin-right: 30px;
            &:last-child {
              margin-right: 0px;
            }
          }
          .preview,
          .download {
            display: inline-flex;
            align-items: flex-end;
            color: var(--theme-color);
          }
        }
      }
    }
  }
}
</style>
