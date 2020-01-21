<template>
  <div id="app">
    <vue-cal
      class="vuecal--blue-theme"
      :events="events"
      selected-date="2018-11-19"
      :time-from="10 * 60"
      hide-weekends="hide-weekends"
      :dbl-click-to-navigate="false"
    >
      <template v-slot:cell-content="{ cell, view, goNarrower, events }">
        <div class="vuecal__cell-date" :class="view.id" @click="goNarrower">
          <span class="clickable">{{ cell.content }}</span>
        </div>
        <span class="vuecal__cell-events-count" v-if="view.id === 'month' &amp;&amp; events.length">
          {{ events.length }}
        </span>
        <span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) &amp;&amp; !events.length">
          Nothing here 👌
        </span>
      </template>
    </vue-cal>
  </div>
</template>

<style></style>

<script>
import Vue from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: () => ({
    events: [
      {
        start: "2018-11-19 10:35",
        end: "2018-11-19 11:30",
        title: "Doctor appointment"
      },
      {
        start: "2018-11-19 18:30",
        end: "2018-11-19 19:15",
        title: "Dentist appointment"
      },
      {
        start: "2018-11-20 18:30",
        end: "2018-11-20 20:30",
        title: "Crossfit"
      },
      {
        start: "2018-11-21 11:00",
        end: "2018-11-21 13:00",
        title: "Brunch with Jane"
      },
      {
        start: "2018-11-21 19:30",
        end: "2018-11-21 23:00",
        title: "Swimming lesson"
      }
    ]
  })
};
</script>
