const baseUrl="https://docs.google.com/forms/d/e";
const formId="1FAIpQLScTm5KoP2kXT1wh5mtM3DI4S84NzGfCh_NkO69MKzqWlwkMUg";


/*## -- Exempelform -- ##*/

const mailPrm="entry.1349343839";
const telnoPrm="entry.1662488425";
const placePrm="entry.570129751";
const yearPrm="entry.1026295849_year";
const monthPrm="entry.1026295849_month";
const dayPrm="entry.1026295849_day";

console.log('6');


const post = (event) => {
	console.log('posting data');
	

	// Collection
	const mailAns=event.target.mail.value;
	const telnoAns=event.target.telno.value;
	const placeAns=event.target.place.value;

	const date = new Date(event.target.date.value);
	const yearAns = date.getFullYear();
	const monthAns=date.getMonth() + 1;
	const dayAns=date.getDate();

	// Composition
	const mail=`${mailPrm}=${mailAns}`;
	const telno=`${telnoPrm}=${telnoAns}`;
	const place=`${placePrm}=${placeAns}`;
	const year=`${yearPrm}=${yearAns}`;
	const month=`${monthPrm}=${monthAns}`;
	const day=`${dayPrm}=${dayAns}`;

	console.log({
		mail,
		telno,
		place,
		year,
		month,
		day,
	})

	const options = {
		method: 'POST',
		mode: 'no-cors',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS"
		}
	};

	fetch(`${baseUrl}/${formId}/formResponse?${mail}&${telno}&${place}&${year}&${month}&${day}`, options);

	const okBtn = document.getElementById("submit");
	okBtn.value = "Förfrågan skickad";
	okBtn.classList += " disabled";
	okBtn.disabled = true;
	

	const toast = document.getElementById("sentStatus");
	toast.style.visibility = "Visible";

	return false;
}
