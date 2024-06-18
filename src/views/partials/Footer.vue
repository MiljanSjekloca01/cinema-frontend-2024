<script setup lang="ts">

</script>

<template>
   <div class="container">
  <footer class="pt-5 pb-2">
    <div class="row">
      <div class="col-12 col-md-6 mb-4 d-flex justify-content-center align-items-center">
        <ul class="nav">
          <li class="nav-item mx-2"><RouterLink to="/" class="nav-link p-0 text-muted">Home</RouterLink></li>
          <li class="nav-item mx-2"><RouterLink to="/" class="nav-link p-0 text-muted">Ratings Information</RouterLink></li>
          <li class="nav-item mx-2"><RouterLink to="/" class="nav-link p-0 text-muted">RealD 3D</RouterLink></li>
          <li class="nav-item mx-2"><RouterLink to="/" class="nav-link p-0 text-muted">Jobs</RouterLink></li>
          <li class="nav-item mx-2"><RouterLink to="/" class="nav-link p-0 text-muted">About</RouterLink></li>
        </ul>
      </div>
      <div class="col-md-5 offset-md-1 mb-3">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Stay updated with the latest movies and events at our cinema</p>
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" class="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
            <button class="btn btn-outline-warning" type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top align-items-center">
      <p>© 2024 CinePrime, Miljan Sjekloca - All rights reserved.</p>
      <ul class="d-flex list-unstyled">
        <li><a class="link-light mx-3 fs-3" href="#"><i class="fa-brands fa-instagram"></i></a></li>
        <li><a class="link-light mx-3 fs-3" href="#"><i class="fa-brands fa-facebook"></i></a></li>
        <li><a class="link-light mx-3 fs-3" href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
      </ul>
    </div>
  </footer>
</div>
</template>
  
<style scoped>



</style>