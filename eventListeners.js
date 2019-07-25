const controlPane = document.getElementById( "control-pane" );
const App = document.getElementsByClassName( "app" )[ 0 ];
let { oldTranslateX, oldTranslateY, mouseDownX, mouseDownY, dragging } = state.controlPane;

//BUTTONS
cleanCanvas.addEventListener( "click", e => {
	myCanvas.clean();
} )
fadeOut.addEventListener( "click", e => {
	state.fadeOut = !state.fadeOut;
} )
shapeFill.addEventListener( "click", e => {
	state.shapeFill = !state.shapeFill;
} )
randomSize.addEventListener( "click", e => {
	state.randomSize = !state.randomSize;
} )
//RANGE
shapeSizeRangeInput.addEventListener( "change", e => {
	state.shapeSize = e.target.value;
	shapeSizeInput.value = e.target.value
} )
shapeSizeInput.addEventListener( "change", e => {
	state.shapeSize = e.target.value;
	shapeSizeRangeInput.value = e.target.value
} )
lineWidthRangeInput.addEventListener( "change", e => {
	state.lineWidth = e.target.value;
	lineWidthInput.value = e.target.value
} )
lineWidthInput.addEventListener( "change", e => {
	state.lineWidth = e.target.value;
	lineWidthRangeInput.value = e.target.value
} )
speedRangeInput.addEventListener( "change", e => {
	state.speed = e.target.value;
	speedInput.value = e.target.value
} )
speedInput.addEventListener( "change", e => {
	state.speed = e.target.value;
	speedRangeInput.value = e.target.value
} )
togglePane.addEventListener( "change", e => {
	controlPane.classList.toggle( "active" );
	if ( controlPane.classList.contains( "active" ) ) {
		controlPane.setAttribute( "style", `transform: translate(${ oldTranslateX || 0 }px, ${ oldTranslateY || 0 }px)` )
	}
	else {
		controlPane.setAttribute( "style", `transform: translate(0px, -150%)` )
	}
} )
canvas.addEventListener( "mouseover", e => {
	if ( dragging ) { canvas.style.cursor = "not-allowed" }
} )
canvas.addEventListener( "mouseout", e => {
	canvas.style.cursor = "default";
} )


controlPane.addEventListener( "mousedown", e => {
	if ( e.target !== controlPane )
		return;
	e.stopPropagation();
	dragging = true
	mouseDownX = e.clientX;
	mouseDownY = e.clientY;
} )

App.addEventListener( "mousemove", e => {
	e.stopPropagation();
	if ( dragging ) {
		App.style.cursor = "move"
		const newTranslateX = e.clientX - mouseDownX + oldTranslateX
		const newTranslateY = e.clientY - mouseDownY + oldTranslateY
		controlPane.setAttribute( "style", `transform: translate(${ newTranslateX }px, ${ newTranslateY }px)` )
	}
} )
App.addEventListener( "mouseup", e => {
	e.stopPropagation();
	App.style.cursor = "default"
	if ( dragging ) {
		e.target === canvas
			? controlPane.setAttribute( "style", `transform: translate(${ oldTranslateX }px, ${ oldTranslateY }px)` )
			: ( oldTranslateX += e.clientX - mouseDownX,
				oldTranslateY += e.clientY - mouseDownY )
	}
	dragging = false;
} )
