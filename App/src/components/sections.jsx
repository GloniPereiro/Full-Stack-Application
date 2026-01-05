import Zasoby from "./cardZasoby/Zasoby";
import Uploady from "./Upload";
import UsersComponent from "./Users";
import Uprawnienia from "./Uprawnienia";
import Monitoring from "./Monitoring";
import Ustawienia from "./Ustawienia";
import Logi from "./Logi";
import { Folders, Upload, Users, UserLock, ChartLine, Settings, Logs} from "lucide-react"

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
