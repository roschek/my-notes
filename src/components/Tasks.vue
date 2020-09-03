<template>
    <div>
<section>
          <ul>
              <li v-for='task in tasks' :key="task.id" :class="{completed:task.completed}" class="task-item container container--small">
                  
                  <div class="ui-card ui-card--shadow task-info">
                      <span class="button-close cross" @click="deleteCard(task.id)"></span>
                    <p class="ui-title-1 center">{{task.title}}</p>
                    <input class="ui-checkbox" type="checkbox" v-model='task.completed'>
                    <p class="ui-title-2">{{task.whatIsIt}}</p>
                    <p class="ui-text-regular">{{task.description}}</p>
                 <div class="ui-tag__wrapper ">
            <div class="ui-tag show-tags" v-for="tag in task.tags" :key="tag.title"  :class="{active: tag.use}">
              <span class="tag-title">{{tag.title}}</span>
             
           </div>
        
        </div>
                 
                </div>
                   
              </li>

          </ul>
      </section>
    </div>
</template>

<script>
    export default {
        data(){
        return{
            filter:'active'
}
        },
       computed:{
           tasks () {
             return  this.$store.getters.tasks
           }
       },
       methods:{
           deleteCard(id){
               console.log(id)
               this.$store.dispatch('deleteCard',id)
               .then(()=>{
                   this.$store.dispatch('loadTasks')
                   console.log('task deleted')})
           }
       }
    }
</script>

<style lang="stylus" scoped>

.task-item
    margin-bottom 20px
    &last-child
      margin-bottom 0
.task-info
    display flex
    flex-direction column
    justify-content space-between
    align-items center
.cross
    align-self flex-end

.ui-checkbox
    margin-top  20px
.ui-title-1
    margin-bottom 0
.ui-title-2
    align-self flex-start
.ui-text-regular
    align-self flex-start
.input-task
    border 1px solid transparent
    margin-left 10%
.input-textarea
    max-width 500px
    margin 0 auto 0 10%
.input-textarea:focus
    border 1px solid green

.radio-list
    display flex
    flex-direction row
    justify-content space-around
    align-items center
    padding 15px
.ui-tag__wrapper
    display flex
    flex-direction row
    justify-content flex-start
    max-width 800px
    margin-left 10%
.button-close
    width 20px
    height 20px
.button-close
    &.active
        transform: rotate(45deg)
.show-tags 
    &.active
        background-color blue
        color lavender
.open-input-tags
    display flex
    flex-direction column
    margin-bottom 20px
.open-input-bttn
    max-width 200px
    margin-bottom 20px
.input-task-tag
    margin-left 0
.button-send
    margin 30px auto 0 20%



</style>