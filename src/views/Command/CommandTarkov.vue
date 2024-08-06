<template>
    <n-tabs type="line" animated class="px-4">
        <n-tab-pane name="min" tab="命令">
           
            

        </n-tab-pane>
        <n-tab-pane name="items" tab="物品">
            <n-table :single-line="false" striped>
                <tbody>
                    <th>
                        Id
                    </th>
                    <th>
                        Name
                    </th>
                    <tr v-for="(value, index) in localesZhCNItems" :key="index">
                        <td>
                            {{ value._id }}
                        </td>
                        <td>
                            {{ value._props.Name }}
                        </td>
                    </tr>
                </tbody>
            </n-table>
        </n-tab-pane>
    </n-tabs>
</template>

<script setup lang="ts">
import { localesZhCNItems } from "@assets/tarkov/index"

</script>

<style scoped></style>
