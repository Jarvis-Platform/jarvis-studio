export const dagRunAirflowUrl = (dag_id: string, run_id: string, execution_date: string) => {
	const airflowRootUrl = process.env.VUE_APP_AIRFLOW_URL;
	const dagIdEncoded = encodeURIComponent(dag_id);
	const runIdEncoded = encodeURIComponent(run_id);
	const executionDateEncoded = encodeURIComponent(execution_date);
	return `${airflowRootUrl}/admin/airflow/graph?dag_id=${dagIdEncoded}&run_id=${runIdEncoded}&execution_date=${executionDateEncoded}`;
};

export default {
	dagRunAirflowUrl,
};
