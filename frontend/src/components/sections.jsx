import Zasoby from "./files/cardZasoby/Zasoby";
import Uploady from "./files/Upload";
import UsersComponent from "./admin/Users";
import Uprawnienia from "./admin/Uprawnienia";
import Monitoring from "./monitoring/Monitoring";
import Ustawienia from "./admin/Ustawienia";
import Logi from "./admin/Logi";
import { Folders, Upload, Users, UserLock, ChartLine, Settings, Logs } from "lucide-react"

export const sections = {
  zasoby: {
    label: <><Folders /> Zasoby</>,
    component: <Zasoby />
  },
  uploady: {
    label: <><Upload /> Prześlij</>,
    component: <Uploady />
  },
  users: {
    label: <><Users /> Użytkownicy</>,
    component: <UsersComponent />
  },
  uprawnienia: {
    label: <><UserLock /> Uprawnienia</>,
    component: <Uprawnienia />
  },
  monitoring: {
    label: <><ChartLine /> Monitoring</>,
    component: <Monitoring />
  },
  ustawienia: {
    label: <><Settings /> Ustawienia</>,
    component: <Ustawienia />
  },
  logi: {
    label: <><Logs /> Logi</>,
    component: <Logi />
  }
};
