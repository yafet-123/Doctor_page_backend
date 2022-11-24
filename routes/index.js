import test from "./test.js";
import auth from "./authRoutes.js";
import patient from "./patientRoutes.js";
import clinic from "./clinicRoutes.js";
import role from "./roleRoutes.js";
import country from "./countryRoutes.js";
import idtype from "./idtypeRoutes.js";
import occupation from "./occupationRoutes.js";
import patientStatus from "./patientStatusRoutes.js";
import phoneType from "./phoneTypeRoutes.js";
import relationship from "./relationshipRoutes.js";
import address from "./addressRoutes.js";
import title from "./titleRoutes.js";
import measurement from "./measurementRoutes.js";
import docDashboard from "./docDashboardRoutes.js";
import intraReferral from "./intraReferralRoutes.js";
import prescription from "./prescriptionRoutes.js";
import sickLeave from "./sickLeaveRoutes.js";
import search from "./searchRoutes.js";
import report from "./reportRoutes.js";
import diagnosisList from "./diagnosisListRoutes.js";

//user routes
import user from './userRoutes.js'

//rad routes
import radDepartment from "./radiology/radDepartmentRoutes.js";
import radRequest from "./radiology/radRequestRoutes.js";
import orderImaging from "./radiology/orderImagingRoutes.js";
import rad from "./radiology/radRoutes.js";

//lab routes
import labDepartment from "./laboratory/labDepartmentRoutes.js";
import labPanel from "./laboratory/labPanelRoutes.js";
import labTest from "./laboratory/labTestRoutes.js";
import labPanelTest from "./laboratory/labPanelTestRoutes.js";
import orderLab from "./laboratory/orderLabRoutes.js";
import lab from "./laboratory/labRoutes.js";

//casher routes
import casher from "./casherRoutes.js";

export {
  test,
  auth,
  patient,
  clinic,
  role,
  country,
  idtype,
  occupation,
  patientStatus,
  phoneType,
  relationship,
  address,
  title,
  measurement,
  docDashboard,
  intraReferral,
  prescription,
  sickLeave,
  search,
  report,
  diagnosisList,
  radDepartment,
  radRequest,
  orderImaging,
  rad,
  labDepartment,
  labPanel,
  labTest,
  labPanelTest,
  orderLab,
  lab,
  casher,
  user
};
