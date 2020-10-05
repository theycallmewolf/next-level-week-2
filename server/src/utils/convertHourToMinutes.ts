export default function convertHourToMinutes(time: string) {
	//9:00

  // desestruturar o split (que origina um array) de 2 elementos : 'hour' e 'minutes
	const [
		hour,
		minutes
	] = time.split(':').map(Number);
	const timeInMinutes = hour * 60 + minutes;
	return timeInMinutes;
}
