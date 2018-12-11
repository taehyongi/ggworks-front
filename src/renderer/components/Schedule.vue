<template>
  <v-layout v-resize="onResize">
    <!-- <vue-tuicalendar
      ref="calendar"
      :options="options"
      :schedules="schedules"
      @click-schedule="handleClickSchedule"
      @after-render-schedule="handleAfterRenderSchedule"
      class="schedule"
    >
    </vue-tuicalendar> -->
  </v-layout>
</template>

<script>
/* eslint-disable */ 
export default {
  name: 'calendar',
  data: () => ({
    windowSize: {
      x: 0,
      y: 0
    },
    options: {
      defaultView: 'month',
    }
  }),
  // data: () => ({
  //   {
  //     windowSize: {
  //       x: 0,
  //       y: 0
  //     },
  //     options: {
  //       defaultView: 'month',
  //       moreLayerSize: {
  //           height: 'auto'
  //       },
  //     },
  //     schedules: [
  //       {
  //         id: '1',
  //         calendarId: '1',
  //         title: 'A schedule',
  //         category: 'time',
  //         dueDateClass: '',
  //         start: '2018-11-22T22:30:00+09:00',
  //         end: '2018-11-23T02:30:00+09:00',
  //       },
  //       {
  //         id: '2',
  //         calendarId: '1',
  //         title: 'Another schedule',
  //         category: 'time',
  //         dueDateClass: '',
  //         start: '2018-11-23T17:30:00+09:00',
  //         end: '2018-11-24T17:31:00+09:00',
  //         isReadOnly: true,
  //       },
  //     ],
  //   });
  // },
  methods: {
    onResize() {
      // this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      // console.log(window.innerWidth);
      // console.log(this.$refs.calendar);
      // this.$refs.calendar.render()
    },
  },
  mounted() {
    this.onResize();
  }
  // mounted() {
  //   handleClickSchedule: ({ schedule }) => {
  //     console.log(schedule);
  //   };
  //   handleAfterRenderSchedule: ({ schedule }) => {
  //     const element = this.$refs.calendar.fireMethod(
  //       "getElement",
  //       schedule.id,
  //       schedule.calendarId
  //     );

  //     const instance = new Schedule({
  //       propsData: { schedule }
  //     });

  //     element.innerHTML = "";
  //     instance.$mount();
  //     element.appendChild(instance.$el);
  //   }
  // },
};
</script>

<style scoped>
.schedule {
  width: 100%;
  height: 100%;
}

</style>
