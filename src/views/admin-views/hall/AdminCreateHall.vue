<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { HallModel } from '@/models/hall.model';
import { HallService } from '@/services/hall.service';

const router = useRouter();
const hall = ref<any>({
    name: "",
    capacity: 0,
    projectionType: "2D"
})


async function createHall(hall: HallModel){
    await HallService.createHall(hall).then(rsp => {
        router.push({ path: "/admin-panel/hall"})
    })
}


function validationCheck(hall: HallModel) {
    const { name, capacity, projectionType,} = hall;
    
    const isInvalidName = name === '' || name.length < 2;
    const isInvalidCapacity = capacity <= 0;
    const isInvalidProjectionType = projectionType !== "2D" && projectionType !== "3D"
    

    return isInvalidName || isInvalidCapacity || isInvalidProjectionType;
}

</script>

<template>
    <div class="container">
        <h1 class="h3 text-center">Create Hall</h1>
        <form>
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
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="/admin-panel/hall">
            <i class="fa-solid fa-rotate-left"></i> 
            Return to Halls List
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="createHall(hall)" :disabled="validationCheck(hall)">
            <i class="fa-solid fa-download"></i>
            Create
        </button>
    </div>
</template>
