<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
    <div class="container">
      <a class="navbar-brand" href="#">My Vue App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
              aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <form class="d-flex text-lg-end" style="width: 100%" role="search">
          <div class="col"></div>
          <div class="col-md-auto">
            <button class="btn btn-outline-success" type="button">Login</button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'header-app',
}
</script>