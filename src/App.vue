<template>
   <div id="app">
   <div class="navbar">
    <div class="container">
    <div class="navbar-content"><router-link class="header-logo" to="/">Блокнотик</router-link>
      <div class="button-burger" @click="drawer = !drawer"  :class="{active:drawer}"><span class="line line-1"></span><span class="line line-2"></span><span class="line line-3"></span></div>
      <div class="navbar-list__wrapper"  :class="{active:drawer}">
        <ul class="navbar-list">
          <li class="navbar-item"  @click="drawer = false" v-for="link in linkMenu" :key="link.title"><router-link class="navbar-link" :to="`${link.url}`">{{link.title}}</router-link></li>
          <li class="navbar-item" v-if="checkUser" @click="logout"><span class="navbar-link">Выйти</span></li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  <router-view/>
  </div>
 
</template>

<script>
export default {
  data(){
    return {
      drawer: false,
      
    }
  },
  computed:{
    checkUser(){
      return this.$store.getters.check_user
    },
    linkMenu(){
      if(this.checkUser){
        return [
          {title:'Домой',url:'/'},
           {title:'Записки', url:'/tasks'}
      ]}
      
      
      return [
         {title:'Вход',url:'/login'},
         {title:'Регистрация',url:'/registration'},
      ]
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
   
  }
}
</script>
<style lang="stylus">


</style>
