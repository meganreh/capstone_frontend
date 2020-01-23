<template>
  <div id="app">
    <vue-cal
      style="height: 500px; width: 100%;"
      class="vuecal--blue-theme"
      :events="events"
      :time="false"
      :disable-views="['years']"
      :on-event-click="onEventClick"
      events-on-month-view="short"
      editable-events
    >
      <template v-slot:cell-content="{ cell, view, goNarrower, events }">
        <div class="vuecal__cell-date" :class="view.id" @click="goNarrower">
          <span class="clickable">{{ cell.content }}</span>
        </div>
        <span class="vuecal__cell-events-count" v-if="view.id === 'month' &amp;&amp; events.length">
          {{ events.length }}
        </span>
        <span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) &amp;&amp; !events.length"></span>
      </template>
    </vue-cal>
  </div>
</template>

<style>
 {
  font-family: "Raleway", Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 100;
  line-height: 1.65;
}

.vuecal__event {
  cursor: pointer;
  font-family: "Raleway", Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 300;
  line-height: 2;
}

.vuecal__event-title {
  font-size: 1em;
  font-family: "Raleway", Helvetica, sans-serif;
  /*font-weight: bold;*/
  margin: 4px 0 8px;
  color: #fff;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  font-family: "Raleway", Helvetica, sans-serif;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
  font-family: "Raleway", Helvetica, sans-serif;
}

.vuecal__event.incomplete {
  font-family: "Raleway", Helvetica, sans-serif;
  background-color: rgba(229, 89, 71, 0.3);
  border: 1px solid rgb(229, 89, 71);
  color: #091a1d;
}
.vuecal__event.completed {
  font-family: "Raleway", Helvetica, sans-serif;
  background-color: rgba(71, 211, 229, 0.3);
  border: 1px solid rgb(144, 210, 190);
  color: #091a1d;
}
</style>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: () => ({
    events: [
      {
        start: "2020-01-20 10:30",
        end: "2020-01-20 11:30",
        // You can also define event dates with Javascript Date objects:
        // startDate: new Date(2018, 11 - 1, 16, 10, 30),
        // endDate: new Date(2018, 11 - 1, 16, 11, 30),
        title: "Grocery shopping",

        class: "completed"
      },
      {
        start: "2020-01-20 10:30",
        end: "2020-01-20 11:30",
        // You can also define event dates with Javascript Date objects:
        // startDate: new Date(2018, 11 - 1, 16, 10, 30),
        // endDate: new Date(2018, 11 - 1, 16, 11, 30),
        title: "Practice tuba",

        class: "completed"
      },
      {
        start: "2020-01-23 10:30",
        end: "2020-01-23 11:30",
        // You can also define event dates with Javascript Date objects:
        // startDate: new Date(2018, 11 - 1, 16, 10, 30),
        // endDate: new Date(2018, 11 - 1, 16, 11, 30),
        title: "Walk the dog",

        class: "incomplete"
      }
    ]
  })
};
</script>
