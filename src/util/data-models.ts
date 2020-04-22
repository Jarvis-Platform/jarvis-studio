import { BIG_QUERY_URL } from '@/constants/urls/external';
import convert from 'convert-units';
import numeral from 'numeral';

export const getBigQueryURL = (projectId: string, datasetId: string, tableId: string) => {
	return `${BIG_QUERY_URL}?project=${projectId}&p=${projectId}&d=${datasetId}&t=${tableId}&page=table`;
};

export const getFormattedNumRows = (value: number) => {
	return numeral(value).format('10,000');
};

export const getFormattedNumBytes = (value: number) => {
	const numBytesConverted = convert(Number(value)).from('b').toBest({ cutOffNumber: 1 });
	return `${numeral(numBytesConverted.val).format('10,000.00')} ${numBytesConverted.unit}`;
};
