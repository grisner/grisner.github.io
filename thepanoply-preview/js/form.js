const baseUrl="https://docs.google.com/forms/d/e";
const formId="1FAIpQLScTm5KoP2kXT1wh5mtM3DI4S84NzGfCh_NkO69MKzqWlwkMUg";


/*## -- Exempelform -- ##*/

const mailParam="entry.1349343839";
const telnoParam="entry.1662488425";
const placeParam="entry.570129751";
const yearParam="entry.1026295849_year";
const monthParam="entry.1026295849_month";
const dayParam="entry.1026295849_day";
const hourParam="entry.1026295849_hour";
const minParam="entry.1026295849_minute";

console.log('6');


const post = (event) => {
	console.log('posting data');
	

	// Collection
	const mailAnswer=event.target.mail.value;
	const telnoAnswer=event.target.telno.value;
	const placeAnswer=event.target.place.value;

	const date = new Date(event.target.dateTime.value);
	const yearAnswer = date.getFullYear();
	const monthAnswer=date.getMonth() + 1;
	const dayAnswer=date.getDate();
	const hourAnswer=date.getHours();
	const minAnswer=date.getMinutes();

	// Composition
	const mail=`${mailParam}=${mailAnswer}`;
	const telno=`${telnoParam}=${telnoAnswer}`;
	const place=`${placeParam}=${placeAnswer}`;
	const year=`${yearParam}=${yearAnswer}`;
	const month=`${monthParam}=${monthAnswer}`;
	const day=`${dayParam}=${dayAnswer}`;
	const hour=`${hourParam}=${hourAnswer}`;
	const min=`${minParam}=${minAnswer}`;

	console.log({
		mail,
		telno,
		place,
		year,
		month,
		day,
		hour,
		min,
	})

	const url = `${baseUrl}/${formId}/formResponse?${mail}&${telno}&${place}&${year}&${month}&${day}&${hour}&${min}`;

	console.log({url})

	const options = {
		method: 'POST',
		mode: 'no-cors',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS"
		}
	};

	fetch(url, options).then(v=>console.log({v}));

	const sentStatus = document.getElementById("sentStatus");
	sentStatus.style.visibility = "Visible";

	return false;
}
