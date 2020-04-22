<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col v-for="item in links" :key="item.id" cols="12" lg="5" sm="6">
				<v-hover>
					<v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2} rounded-card`">
						<v-img src="" aspect-ratio="2.75" height="25px" :class="item.color" />

						<v-card-title primary-title>
							<h3 class="headline mb-0">{{ item.title }}</h3>
							<p class="mb-0 subtitle-1">{{ item.description }}</p>
						</v-card-title>

						<v-card-actions>
							<v-btn text color="primary" class="learn-more-btn">Learn more</v-btn>
							<v-spacer />
							<v-btn text color="primary">Get started</v-btn>
						</v-card-actions>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DataOverviewContent extends Vue {
	get links() {
		return [
			{
				id: '1',
				title: 'Data Models',
				description: 'Get fast and detailed overview on all datasets and tables managed by Jarvis',
				color: 'orange',
			},
			{
				id: '2',
				title: 'Data Workflows',
				description: 'Monitor data workflows executions, check configurations and execute jobs.',
				color: 'teal',
			},
			{
				id: '3',
				title: 'Data Quality',
				description: 'Supervise data quality with simple tSQL queries and maintaining a high quality of information',
				color: 'blue',
			},
			{
				id: '4',
				title: 'Data Visualization',
				description: 'Access to Data Visualizations and Dashboards built on the top of the Data available in Jarvis',
				color: 'purple',
			},
		];
	}
}
</script>
