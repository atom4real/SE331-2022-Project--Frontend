<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>

    <h3>
      We have an issue, please try again
      <a href="#" @click="$router.go(-1)">click here</a> to try again.
    </h3>
  </div>
</template>
