<script setup lang="ts">
import { ElTransfer } from "element-plus";

// el-transfer 组件问题反馈
defineOptions({
  name: 'ElTransferDemo'
});

export interface CustomerTypeFieldVO {
  id?: number;
  customerTypeId: number;
  fieldName: string;
  fieldShowName: string;
  sort?: number;
  isDisabled?: number;
  //用于前端穿梭框，客户姓名缺省选中且不可更改
  disabled?: boolean;
}


const typeFieldEnableData = ref([])
const typeFieldData = ref<CustomerTypeFieldVO[]>([])
</script>

<template>
<el-transfer
      v-model="typeFieldEnableData"
      :props="{ label: 'fieldShowName', key: 'fieldName' }"
      filterable
      :filter-method="
        (query: string, item: CustomerTypeFieldVO) =>
          item.fieldShowName.toLowerCase().includes(query.toLowerCase()) ||
          item.fieldName.toLowerCase().includes(query.toLowerCase())
      "
      :titles="['未选字段', '已选-关联显示字段']"
      :render-content="(node: any, option: CustomerTypeFieldVO) => option.fieldShowName"
      filter-placeholder="客户类型名称"
      :data="typeFieldData"
    />
</template>

<style scoped lang="scss">

</style>