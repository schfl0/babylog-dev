import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("logs", "./routes/logs.jsx"),
  route("add-logger", "./routes/addLoggerAction.jsx"),
  route("delete-logger", "./routes/deleteLoggerAction.jsx"),
  route("bottle-logger", "./routes/bottleLoggerAction.jsx"),
  route("food-logger", "./routes/foodLoggerAction.jsx"),
  route("nap-logger", "./routes/napLoggerAction.jsx"),
  route("temp-logger", "./routes/tempLoggerAction.jsx"),
  route("med-logger", "./routes/medLoggerAction.jsx"),
  route("add-todayview", "./routes/addTodayViewAction.jsx"),
  route("delete-todayview", "./routes/deleteTodayViewAction.jsx"),
] satisfies RouteConfig;
