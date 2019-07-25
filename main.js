const ctx = canvas.getContext( "2d" );

function Canvas ( width, height ) {
	this.height = height || canvas.height;
	this.width = width || canvas.width;
	canvas.width = width;
	canvas.height = height;
	this.frameID = 0

	this.calculateShape = () => {
		const cols = Math.floor( this.width / state.shapeSize ) - 1;
		const rows = Math.floor( this.height / state.shapeSize ) - 1;
		const randomCol = Math.floor( Math.random() * cols );
		const randomRow = Math.floor( Math.random() * rows );
		const ratio = ( state.randomSize ? Math.floor( Math.random() * 4 + 1 ) / 4 : 1 );

		const calculatePath = ( x, y ) => {
			let maxArc = state.shapeSize / 2 * ratio;

			x += ( this.width % state.shapeSize ) / 2 === 0 ? state.shapeSize / 2 * ( 1 - ratio ) + state.shapeSize / 2 : ( this.width % state.shapeSize ) / 2 + state.shapeSize / 2 + state.shapeSize / 2 * ( 1 - ratio )
			y += ( this.height % state.shapeSize ) / 2 === 0 ? state.shapeSize / 2 * ( 1 - ratio ) + state.shapeSize / 2 : ( this.height % state.shapeSize ) / 2 + state.shapeSize / 2 + state.shapeSize / 2 * ( 1 - ratio )
			ctx.beginPath();
			ctx.lineWidth = state.lineWidth;
			ctx.moveTo( x, maxArc + y );
			ctx.moveTo( x, maxArc + y );
			ctx.arcTo( x, 2 * maxArc + y, maxArc + x, 2 * maxArc + y + rand15Percent( maxArc ), randomArc( maxArc / 2, maxArc ) );
			ctx.arcTo( 2 * maxArc + x, 2 * maxArc + y, 2 * maxArc + x + rand15Percent( maxArc ), maxArc + y, randomArc( maxArc / 2, maxArc ) );
			ctx.arcTo( 2 * maxArc + x, y + rand15Percent( maxArc ), maxArc + x, y, randomArc( maxArc / 2, maxArc ) );
			ctx.arcTo( x + rand15Percent( maxArc ), y, x, y + maxArc, randomArc( maxArc / 2, maxArc ) )
			ctx.closePath();
		}
		calculatePath( state.shapeSize * randomCol, state.shapeSize * randomRow );
	}
	this.renderShape = () => {
		ctx.globalCompositeOperation = "source-over";
		const color = randHEX();
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		state.shapeFill && ctx.fill()
		!state.shapeFill && ctx.stroke();
	}
	this.fadeOut = () => {
		ctx.globalCompositeOperation = "lighter";
		ctx.fillStyle = "#FFFFFF01"
		ctx.fillRect( 0, 0, canvas.width, canvas.height )
	}
	this.spamShapes = () => {
		state.fadeOut && this.fadeOut();
		//console.log( "new frame" )

		if ( !state.calculatedShape ) {
			this.calculateShape();
			//console.log( "calculating" )
			state.calculatedShape = true;
		}

		if ( this.frameID % ( 11 - state.speed ) === 0 ) {
			this.renderShape();
			//console.log( "drawing" )
			state.calculatedShape = false;
		}
		this.frameID = window.requestAnimationFrame( this.spamShapes.bind( this ) )
	}
	this.clean = () => {
		ctx.fillStyle = "#FFFFFF"
		ctx.fillRect( 0, 0, canvas.width, canvas.height )
	}
}

const myCanvas = new Canvas( 400, 400 );
myCanvas.spamShapes();