const SEP_03_2019_INPUT_VALUE = '2019-09-03';
const SEP_03_2019_DATE_VALUE = new Date(SEP_03_2019_INPUT_VALUE);

const OCT_07_2019_INPUT_VALUE = '2019-10-07';
const OCT_07_2019_DATE_VALUE = new Date(OCT_07_2019_INPUT_VALUE);

export default {
	props: {
		date: SEP_03_2019_DATE_VALUE
	},

	html: `
		<input type=date>
		<p>[object Date] ${SEP_03_2019_DATE_VALUE}</p>
	`,

	ssrHtml: `
		<input type=date value='${SEP_03_2019_INPUT_VALUE}'>
		<p>[object Date] ${SEP_03_2019_DATE_VALUE}</p>
	`,

	async test({ assert, component, target, window }) {
		const input = target.querySelector('input');
		assert.equal(input.value, SEP_03_2019_INPUT_VALUE);
		assert.equal(component.date.toString(), SEP_03_2019_DATE_VALUE.toString());

		const event = new window.Event('input');

		input.value = OCT_07_2019_INPUT_VALUE;
		await input.dispatchEvent(event);

		assert.equal(component.date.toString(), OCT_07_2019_DATE_VALUE.toString());
		assert.htmlEqual(target.innerHTML, `
			<input type='date'>
			<p>[object Date] ${OCT_07_2019_DATE_VALUE}</p>
		`);

		component.date = SEP_03_2019_DATE_VALUE;
		assert.equal(input.value, SEP_03_2019_INPUT_VALUE);
		assert.htmlEqual(target.innerHTML, `
			<input type='date'>
			<p>[object Date] ${SEP_03_2019_DATE_VALUE}</p>
		`);

		// empty string should be treated as undefined
		input.value = '';
		await input.dispatchEvent(event);

		assert.equal(component.date, undefined);
		assert.htmlEqual(target.innerHTML, `
			<input type='date'>
			<p>[object Undefined] undefined</p>
		`);
	},
};