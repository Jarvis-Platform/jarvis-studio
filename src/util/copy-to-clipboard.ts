export const copyToClipboard = (informationValue: string) => {
	const el = document.createElement('textarea');
	el.value = informationValue;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};
