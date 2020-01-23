import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import HabitsIndex from "../views/HabitsIndex.vue";
import TasksIndex from "../views/TasksIndex.vue";
import Cal from "../views/Cal.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/habits", name: "habits-index", component: HabitsIndex },
  { path: "/tasks", name: "tasks-index", component: TasksIndex },
  { path: "/calendar", name: "caldendar", component: Cal }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
