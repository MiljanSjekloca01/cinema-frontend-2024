<script setup lang="ts">
import { ref } from "vue";
import { formatDate, pureDateString } from "../../../services/main.service";
import type { ProjectionModel } from "../../../models/projection.model";
import { ProjectionService } from "../../../services/projection.service";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const projections = ref<ProjectionModel[]>()


const today = new Date();
today.setHours(0, 0, 0, 0);

const maxDate = new Date(today);
maxDate.setDate(maxDate.getDate() + 45);

const date = ref<Date>(today);

async function onDateChange(){
    await ProjectionService.getAllProjectionsOnDate(date.value).then(rsp => {
    projections.value = rsp.data
    console.log(rsp);
 })
}

onDateChange();

async function removeThisProjection(id: number){
    await ProjectionService.deleteProjectionById(id).then(rsp => {
        projections.value = projections.value?.filter(p => p.projectionId !== id )
    }) 

}



</script>

<template>

<div class="d-flex justify-content-center align-items-center flex-column">
    <h1 class="text-light h3 m-3">Projections for day </h1>
    <Datepicker 
      class="datepicker"
      v-model="date"
      :format="pureDateString"
      :enable-time-picker="false"
      :min-date="new Date()"
      :max-date="maxDate"
      dark
      @update:model-value="onDateChange"
    />
  </div>

<div v-if="projections && projections.length > 0">   
    <h1 class="h3 text-center m-4 text-info">Cinema Projections</h1>
    <table class="table table-hover text-center">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Hall Name</th>
        <th scope="col">Movie Title</th>
        <th scope="col">Starts At</th>
        <th scope="col">Ends At</th>
        <th scope="col">Projection Date</th>
        <th scope="col">Type</th>
        <th scope="col">Created At</th>
        <th scope="col">Updated At</th>
        <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="p in projections">
        <th scope="row">{{ p.projectionId }}</th>
        <td>{{ p.hall.name }}</td>
        <td>{{ p.movie.title }}</td>
        <td>{{ p.startsAt }}</td>
        <td>{{ p.endsAt }}</td>
        <td>{{ p.projectionDate }}</td>
        <td>{{ p.hall.projectionType }}</td>
        <td>{{ formatDate(p.createdAt) }}</td>
        <td>{{ formatDate(p.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-1"
                    :to="`/projection/${p.projectionId}`">
                    <i class="fa-solid fa-pencil"></i>
                </RouterLink>
                
                <button type="button" class="btn btn-sm btn-danger m-1"
                    @click="removeThisProjection(p.projectionId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
    </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" to="/projection/new">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Projection
    </RouterLink>
</div> 

<div v-else-if="projections?.length == 0" class="text-center m-5">
    <div class="mb-3 fs-3">Add First Projection for day</div>    
    <RouterLink class="btn btn-md btn-danger m-3" to="/projection/new">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Projection
    </RouterLink>
</div>

<div v-else>Projections are being loaded... Please wait</div>

<RouterLink class="btn btn-md btn-secondary mt-3" to="/admin-panel">
    <i class="fa-solid fa-rotate-left"></i>
    Return to Admin Panel
</RouterLink>

</template>

<style scoped>

.datepicker{
    max-width:400px;
}

.table{
    overflow: auto;
}


</style>