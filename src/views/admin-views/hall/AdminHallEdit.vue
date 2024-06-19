<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/services/format.service';
import type { HallModel } from '@/models/hall.model';
import { HallService } from '@/services/hall.service';

const route = useRoute()
const router = useRouter();
const id = Number.parseInt(route.params.id as any)
const hall = ref<HallModel>()
var oldHallData: HallModel;

HallService.getHallById(id).then(rsp => {
    hall.value = rsp.data
    oldHallData = { ...rsp.data };
})

async function updateEditedHall(hall: HallModel){
    await HallService.updateHallById(id,hall).then(rsp => {
        router.push({ path: "/admin-panel/hall"})
    })
}


function validationCheck(hall: HallModel) {
    const { name, capacity, projectionType,} = hall;
    
    const isInvalidName = name === '' || name.length < 2;
    const isInvalidCapacity = capacity <= 0;
    const isInvalidProjectionType = projectionType !== "2D" && projectionType !== "3D"
    
    const isUnedited = (
        name === oldHallData.name &&
        capacity === oldHallData.capacity &&
        projectionType === oldHallData.projectionType
    )

    return isInvalidName || isInvalidCapacity || isInvalidProjectionType || isUnedited;
}

</script>

<template>
    <div v-if="hall" class="container">
        <h1 class="h3 text-center">Edit Hall</h1>
        <form >
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input type="number" class="form-control" id="id" disabled :value="hall.hallId">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="hall.name">
            </div>
            <div class="mb-3">
                <label for="capacity" class="form-label">Capacity</label>
                <input type="number" class="form-control" id="capacity" v-model="hall.capacity">
            </div>
            <div class="mb-3">
                <label for="projectionType" class="form-label">Projection Type</label>
                <select class="form-select" aria-label="Default select example" v-model="hall.projectionType">
                    <option :value="'2D'">2D</option>
                    <option :value="'3D'">3D</option>
                </select>
            </div> 
            <div class="mb-3">
                <label for="createdAt" class="form-label">Created At:</label>
                <input type="text" class="form-control" id="createdAt" disabled :value="formatDate(hall.createdAt)">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(hall.updatedAt)">
            </div>
          
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="/admin-panel/hall">
            <i class="fa-solid fa-rotate-left"></i> 
            Return to Halls List
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="updateEditedHall(hall)" :disabled="validationCheck(hall)">
            <i class="fa-solid fa-download"></i>
            Save
        </button>
    </div>
</template>