import Zasoby from "./cards/cardZasoby/Zasoby";
import Uploady from "./Content/Upload";
import Users from "./Content/Users";
import Uprawnienia from "./Content/Uprawnienia";
import Monitoring from "./Content/Monitoring";
import Ustawienia from "./Content/Ustawienia";
import Logi from "./Content/Logi";

export const sections = {
  zasoby: {
    label: "📁 Zasoby",
    component: <Zasoby />
  },
  uploady: {
    label: "⬆️ Uploady",
    component: <Uploady />
  },
  users: {
    label: "👥 Użytkownicy",
    component: <Users />
  },
  uprawnienia: {
    label: "🔐 Uprawnienia",
    component: <Uprawnienia />
  },
  monitoring: {
    label: "📊 Monitoring",
    component: <Monitoring />
  },
  ustawienia: {
    label: "⚙️ Ustawienia",
    component: <Ustawienia />
  },
  logi: {
    label: "🧾 Logi",
    component: <Logi />
  }
};
