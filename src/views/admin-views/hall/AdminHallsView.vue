<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../../services/main.service";
import type { HallModel } from "../../../models/hall.model";
import { HallService } from "@/services/hall.service";


const halls = ref<HallModel[]>()
HallService.getAllHalls().then(rsp => {
    halls.value = rsp.data
})

async function removeThisHall(id: number){
    await HallService.deleteHallById(id).then(rsp => {
        halls.value = halls.value?.filter(h => h.hallId !== id )
    }) 

}


</script>

<template>

<div v-if="halls && halls.length > 0">   
    <h1 class="h3 text-center m-4">Cinema Halls</h1>
    <table class="table table-hover text-center">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Capacity</th>
        <th scope="col">Projection Type</th>
        <th scope="col">Created At</th>
        <th scope="col">Updated At</th>
        <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="h in halls">
        <th scope="row">{{ h.hallId }}</th>
        <td>{{ h.name }}</td>
        <td>{{ h.capacity }}</td>
        <td>{{ h.projectionType }}</td>
        <td>{{ formatDate(h.createdAt) }}</td>
        <td>{{ formatDate(h.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-1"
                    :to="`/admin-panel/hall/edit/${h.hallId}`">
                    <i class="fa-solid fa-pencil"></i>
                </RouterLink>
                
                <button type="button" class="btn btn-sm btn-danger m-1"
                    @click="removeThisHall(h.hallId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
    </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" to="/admin-panel/create/hall">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Hall
    </RouterLink>
</div> 

<div v-else-if="halls?.length == 0">
    <div class="mb-3">Add New Hall To Cinema</div>    
    <RouterLink class="btn btn-md btn-danger" to="/admin-panel/create/hall">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Hall
    </RouterLink>
</div>

<div v-else>Halls are being loaded... Please wait</div>

<RouterLink class="btn btn-md btn-secondary mt-3" to="/admin-panel">
    <i class="fa-solid fa-rotate-left"></i>
    Return to Admin Panel
</RouterLink>

</template>

<style scoped>

.table{
    overflow: auto;
}


</style>