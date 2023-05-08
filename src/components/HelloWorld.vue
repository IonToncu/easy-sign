<template>
  <div class="group rectangleFolder">
      <button 
        class="btn btn-primary" 
        data-bs-target="#collapseTarget" 
        data-bs-toggle="collapse">
        Bootstrap collapse
      </button>
    <div class="collapse py-2" id="collapseTarget">
      This is the toggle-able content!
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#rectangleFolder {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 260px;
  height: 350px;
  border-radius: 15px;
  background: #012029;
  background-blend-mode: normal;
}

#group {
  position: absolute;
  left: 871px;
  top: 594px;
  width: 260px;
  height: 350px;
}

</style>
