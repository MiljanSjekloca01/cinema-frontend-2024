<script setup lang="ts">
import router from '@/router';
import { AuthService} from '@/services/auth.service';
import { login } from '@/services/main.service';
import { ref } from 'vue';
import { isAuthenticated } from '@/services/auth.service';


const username = ref<string>("")
const password = ref<string>("")
const errorMessage = ref<string>("")



async function onLoginClicked(){
    try{
        const rsp = await login(username.value,password.value)
        AuthService.saveAuth(rsp.data)
        console.log(isAuthenticated.value)
        router.push({ path: "/admin-panel"})
    }catch(e: any){
        username.value = ""
        password.value = ""
        if(e.response.status === 500 && e.response){
          errorMessage.value = "Login failed"
        }else  errorMessage.value = e.message
    } 
}

</script>


<template>
  <div class="container d-flex justify-content-center mt-5">
    <div class="d-flex flex-column text-center p-5">
      <img src="../../assets/images/cinema2.png" alt="key-picture" class="mb-3">
      <h1 class="mb-3">Admin Panel</h1>


      <form @submit.prevent="onLoginClicked" @beforeinput="errorMessage = ''">
        <div class="form-group">
          <div class="input-group mb-3 input-group-lg">
            <span class="input-group-text">
              <i class="fa-solid fa-user"></i>
            </span>
            <input type="text" name="username" class="form-control" placeholder=". . ." required
              v-model="username">
            <span class="input-group-text">
              username
            </span>
          </div>
        </div>

        <div class="input-group mb-3 input-group-lg">
          <span class="input-group-text">password</span>
          <input id="password" type="password" class="form-control" placeholder=". . ." required
            v-model="password">
          <span class="input-group-text">
            <i class="fa-solid fa-lock"></i>
          </span>
        </div>
        <div class="d-grid">
          <button class="btn btn-light btn-block mb-2">Login</button>
        </div>
        <span class="text-warning" v-if="errorMessage.length > 0">* {{ errorMessage }}</span>
      </form>
    </div>
  </div>
</template>


<style scoped>
 
.form-control:focus{
  box-shadow: none;
}

img{
  align-self: center;
  height:150px;
  width:300px;
}

</style>
