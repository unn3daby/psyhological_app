<template>
  <div class="relative">
    <table>
      <thead>
        <tr>
          <th>head1</th>
          <th>head2</th>
          <th>head3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>123</td>
          <td>123</td>
          <td>123</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type Button from 'primevue/button';

const columns = ref([{ field: 'field1', header: 'A' }, { field: 'field2', header: 'B' }]);
const products = ref([{ code: 1, name: '123' }, { code: 1, name: '123' }]);

// const editableColsIndexes = ref(new Set());
const btns = ['right', 'bottom'];

function onCellEditComplete(event: any) {
  const { data, newValue, field } = event;
  data[field] = newValue;
}

function onAdd(type: string) {
  switch (type) {
    case 'right': {
      columns.value.push({ field: 'field', header: 'Название столбца' });
      break;
    }
    case 'bottom': {
      products.value.push({ code: 1, name: 'Yfadlkmasdklmas' });
      break;
    }
    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.floating-button {
  position: absolute;
}

.floating-button.right {
  right: 0;
  top: 50%;
  transform: translateY(-50%) translateX(125%);
}

.floating-button.bottom {
  left: 50%;
  bottom: 0;
  transform: translateY(125%) translateX(-50%);
}
</style>
