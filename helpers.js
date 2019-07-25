function randomArc ( minArc, maxArc ) {
	return Math.floor( Math.random() * ( maxArc - minArc + 1 ) + minArc )
}
function rand15Percent ( maxArc ) {
	return Math.floor( Math.random() * ( maxArc * 0.15 + 1 ) ) * 2 - maxArc * 0.15;
}
const randHEX = () => {
	let rand = Math.floor( Math.random() * 16777216 ).toString( 16 );
	while ( rand.length < 6 ) {
		rand = "0" + rand;
	}
	return "#" + rand;
}