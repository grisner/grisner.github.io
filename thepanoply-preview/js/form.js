const baseUrl="https://docs.google.com/forms/d/e";

/*## -- Prodform -- ##*/
const prms = {
	id: "1FAIpQLSdwnB0_50U8xu14WWsWq9XKouXCk7J3jojb8-8JOxBzujZjpg",
	mail: "entry.1085999444",
	telno: "entry.1146311830",
	place: "entry.749042839",
	year: "entry.1762746159_year",
	month: "entry.1762746159_month",
	day: "entry.1762746159_day",
}

/*## -- Exempelform -- ##*/

const _prms = {
	id: "1FAIpQLScTm5KoP2kXT1wh5mtM3DI4S84NzGfCh_NkO69MKzqWlwkMUg",
	mail: "entry.1349343839",
	telno: "entry.1662488425",
	place: "entry.570129751",
	year: "entry.1026295849_year",
	month: "entry.1026295849_month",
	day: "entry.1026295849_day",
}

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
	const mail=`${prms.mail}=${mailAns}`;
	const telno=`${prms.telno}=${telnoAns}`;
	const place=`${prms.place}=${placeAns}`;
	const year=`${prms.year}=${yearAns}`;
	const month=`${prms.month}=${monthAns}`;
	const day=`${prms.day}=${dayAns}`;

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

	fetch(`${baseUrl}/${prms.id}/formResponse?${mail}&${telno}&${place}&${year}&${month}&${day}`, options);

	const okBtn = document.getElementById("submit");
	okBtn.value = "Förfrågan skickad";
	okBtn.classList = "btn disabled";
	okBtn.disabled = true;
	
	

	const toast = document.getElementById("sentStatus");
	toast.style.visibility = "Visible";

	return false;
}

const reEnableForm = () => {
	console.log('reenabling form');
	const okBtn = document.getElementById("submit");
	okBtn.classList = "btn enabled";
	okBtn.disabled = false;
}
