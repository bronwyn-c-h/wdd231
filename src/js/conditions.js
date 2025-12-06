import "../css/style.css";
import "../css/conditions.css";
import {
  getParkData,
  getParkAlerts,
  getParkVisitorCenters
} from "./parkService.mjs";
import {
  activityListTemplate,
  alertTemplate,
  visitorCenterTemplate
} from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");
  alertsContainer.innerHTML = "";
  const html = alerts.map(alertTemplate);
  alertsContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

function setVisitorCenters(centers) {
  const centersContainer = document.querySelector(".visitor ul");
  const html = centers.map(visitorCenterTemplate);
  centersContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

function setActivities(activities) {
  const activitiesContainer = document.querySelector(".activities ul");
  const html = activityListTemplate(activities);
  activitiesContainer.insertAdjacentHTML("afterbegin", html);
}

async function init() {
  console.log("Starting conditions page init...");
  try {
    const parkData = await getParkData();
    console.log("Park data:", parkData);
    
    const alerts = await getParkAlerts(parkData.parkCode);
    console.log("Alerts:", alerts);
    
    const visitorCenters = await getParkVisitorCenters(parkData.parkCode);
    console.log("Visitor centers:", visitorCenters);
    
    setHeaderFooter(parkData);
    setAlerts(alerts);
    setVisitorCenters(visitorCenters);
    setActivities(parkData.activities);
    
    console.log("Conditions page init completed successfully");
  } catch (error) {
    console.error("Error in conditions page init:", error);
  }
}

init();