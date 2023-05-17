<template>
    <div class="profile">
      <h1>{{ user }}</h1>
    </div>
</template>


<script>
import store from '@/store';

export default {
  name: 'UserProfileView',
  data() {
    return {
      user: this.$store.name,
    }
  },
}
</script>