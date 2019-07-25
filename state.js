const state = {
	fadeOut: true,
	shapeFill: false,
	randomSize: true,
	shapeSize: parseInt( shapeSizeInput.value, 10 ),
	lineWidth: parseInt( lineWidthInput.value, 10 ),
	speed: speedInput.value,
	calculatedShape: false,
	controlPane: {
		dragging: false,
		mouseDownX: null,
		mouseDownY: null,
		oldTranslateX: null,
		oldTranslateY: null
	}
}