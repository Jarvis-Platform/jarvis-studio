const dagRunAirflowUrl = (airflowRootUrl, dag_id, run_id, execution_date) => {
  return "".concat(
    airflowRootUrl,
    "/admin/airflow/graph?dag_id=",
    encodeURIComponent(dag_id),
    "&run_id=",
    encodeURIComponent(run_id),
    "&execution_date=",
    encodeURIComponent(execution_date)
  );
};

const getStatusColor = status => {
  let statusColor = "blue";
  switch (status) {
    case "SUCCESS":
      statusColor = "green";
      break;
    case "FAILED":
      statusColor = "red";
      break;
    case "RUNNING":
      statusColor = "light-blue";
      break;
    default:
      statusColor = "orange";
      break;
  }
  return statusColor;
};

const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const kebab = str => {
  return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

const toggleFullScreen = () => {
  let doc = window.document;
  let docEl = doc.documentElement;

  let requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  let cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
};

export default {
  randomElement,
  toggleFullScreen,
  kebab,
  dagRunAirflowUrl,
  getStatusColor
};
