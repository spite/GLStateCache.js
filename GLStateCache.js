(function(){

var guid = (function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return function() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};
})();

function _h( f, c ) {
	return function() {
		var res;
		if( !c.apply( this, arguments ) ) {
			res = f.apply( this, arguments );
		} else {
			console.log( f.name + ' cached' );
			//var trace = printStackTrace();
			//alert(trace.join('\n\n'));
		}
		return res;
	}
}

function _h2( f, c ) {
	return function() {
		var res = f.apply( this, arguments );
		c.apply( res || this, arguments );
		return res;
	}
}

var cache = {
	uniform1f: {},
	pixelStorei: {},
	bufferDataArraySizeOrData: {},
	bufferDataArrayUsage: {},
	bufferDataElementArraySizeOrData: {},
	bufferDataElementArrayUsage: {},
	enable: {}
};

WebGLRenderingContext.prototype.enable = _h( WebGLRenderingContext.prototype.enable, function( cap ) {

	var cached = ( cache.enable[ cap ] === true );
	cache.enable[ cap ] = true;
	return cached;

} );

WebGLRenderingContext.prototype.disable = _h( WebGLRenderingContext.prototype.disable, function( cap ) {

	var cached = ( cache.enable[ cap ] === false );
	cache.enable[ cap ] = false;
	return cached;

} );

WebGLRenderingContext.prototype.useProgram = _h( WebGLRenderingContext.prototype.useProgram, function( program ) {

	var cached = ( cache.useProgramProgram === program );
	cache.useProgramProgram = program;
	return cached;

} );

WebGLRenderingContext.prototype.bindBuffer = _h( WebGLRenderingContext.prototype.bindBuffer, function( target, buffer ) {

	var cached;

	switch (target) {
		case this.ARRAY_BUFFER:
			cached = ( cache.bindBufferTargetArray ===  buffer );
			cache.bindBufferTargetArray = buffer;
			break;
		case this.ELEMENT_ARRAY_BUFFER:
			cached = ( cache.bindBufferTargetElementArray ===  buffer );
			cache.bindBufferTargetElementArray = buffer;
			break;
	}

	return cached;

} );

/*

Commented because data content can change, but the object itself doesn't

WebGLRenderingContext.prototype.bufferData = _h( WebGLRenderingContext.prototype.bufferData, function( target, sizeOrData, usage ) {

	var cached = false;

	switch (target) {
		case this.ARRAY_BUFFER:
			cached = ( cache.bufferDataArraySizeOrData[ target ] === sizeOrData && cache.bufferDataArrayUsage[ target ] === usage );
			cache.bufferDataArraySizeOrData[ target ] = sizeOrData;
			cache.bufferDataArrayUsage[ target ] = usage;
			break;
		case this.ELEMENT_ARRAY_BUFFER:
			cached = ( cache.bufferDataElementArraySizeOrData[ target ] === sizeOrData && cache.bufferDataElementArrayUsage[ target ] === usage );
			cache.bufferDataElementArraySizeOrData[ target ] = sizeOrData;
			cache.bufferDataElementArrayUsage[ target ] = usage;
			break;
	}

	return cached;

} );
*/

WebGLRenderingContext.prototype.bindRenderbuffer = _h( WebGLRenderingContext.prototype.bindRenderbuffer, function( target, buffer ) {

	var cached = ( cache.bindRenderbufferTarget === target ) && ( cache.bindRenderbufferBuffer === buffer );
	cache.bindRenderbufferTarget = target;
	cache.bindRenderbufferBuffer = buffer;
	return cached;

} );

WebGLRenderingContext.prototype.bindFramebuffer = _h( WebGLRenderingContext.prototype.bindFramebuffer, function( target, framebuffer ) {

	var cached = ( cache.bindFramebufferTarget === target ) && ( cache.bindFramebufferFramebuffer === framebuffer );
	cache.bindFramebufferTarget = target;
	cache.bindFramebufferFramebuffer = framebuffer;
	return cached;

} );

/*WebGLRenderingContext.prototype.createFramebuffer = _h2( WebGLRenderingContext.prototype.createFramebuffer, function() {

	this.id = guid();
	console.log( 'create framebuffer' );

} );*/

WebGLRenderingContext.prototype.bindTexture = _h( WebGLRenderingContext.prototype.bindTexture, function( target, texture ) {

	var cached;

	switch (target) {
		case this.TEXTURE_2D:
			cached = ( cache.bindTexture2D === texture );
			cache.bindTexture2D = texture;
			break;
		case this.TEXTURE_CUBE_MAP:
			cached = ( cache.bindTextureCubeMap === texture );
			cache.bindTextureCubeMap = texture;
	}

	return cached;

} );

WebGLRenderingContext.prototype.activeTexture = _h( WebGLRenderingContext.prototype.activeTexture, function( texture ) {

	var cached = ( cache.activeTexture === texture );
	cache.activeTexture = texture;
	return cached;

} );

WebGLRenderingContext.prototype.blendEquation = _h( WebGLRenderingContext.prototype.blendEquation, function( mode ) {

	var cached = ( cache.blendEquation === mode );
	cache.blendEquation = mode;
	return cached;

} );

WebGLRenderingContext.prototype.viewport = _h( WebGLRenderingContext.prototype.viewport, function( x, y, w, h ) {

	var cached = ( cache.viewportX === x ) && ( cache.viewportY === y ) && ( cache.viewportW === w ) && ( cache.viewportH === h );

	cache.viewportX = x;
	cache.viewportY = y;
	cache.viewportW = w;
	cache.viewportH = h;

	return cached;

} );

WebGLRenderingContext.prototype.scissor = _h( WebGLRenderingContext.prototype.scissor, function( x, y, w, h ) {

	var cached = ( cache.scissorX === x ) && ( cache.scissorY === y ) && ( cache.scissorW === w ) && ( cache.scissorH === h );

	cache.scissorX = x;
	cache.scissorY = y;
	cache.scissorW = w;
	cache.scissorH = h;

	return cached;

} );

WebGLRenderingContext.prototype.depthRange = _h( WebGLRenderingContext.prototype.depthRange, function( near, far ) {

	var cached = cache.depthRangeNear === near && cache.depthRangeFar === far;
	cache.depthRangeNear = near;
	cache.depthRangeFar = far;

	return cached;

} );

WebGLRenderingContext.prototype.cullFace = _h( WebGLRenderingContext.prototype.cullFace, function( mode ) {

	var cached = cache.cullFaceMode === mode;
	cache.cullFaceMode = mode;

	return cached;

} );

WebGLRenderingContext.prototype.frontFace = _h( WebGLRenderingContext.prototype.frontFace, function( mode ) {

	var cached = cache.frontFaceMode === mode;
	cache.frontFaceMode = mode;

	return cached;

} );

WebGLRenderingContext.prototype.lineWidth = _h( WebGLRenderingContext.prototype.lineWidth, function( width ) {

	var cached = cache.lineWidthWidth === width;
	cache.lineWidthWidth = width;

	return cached;

} );

WebGLRenderingContext.prototype.polygonOffset = _h( WebGLRenderingContext.prototype.polygonOffset, function( factor, units ) {

	var cached = cache.polygonOffsetFactor === factor && cache.polygonOffsetUnits === units;
	cache.polygonOffsetFactor = factor;
	cache.polygonOffsetUnits = units;

	return cached;

} );

WebGLRenderingContext.prototype.disableVertexAttribArray = _h( WebGLRenderingContext.prototype.disableVertexAttribArray, function( index ) {

	var cached = ( cache.disableVertexAttribArrayIndex === index );
	cache.disableVertexAttribArrayIndex = index;
	return cached;

} );

WebGLRenderingContext.prototype.enableVertexAttribArray = _h( WebGLRenderingContext.prototype.enableVertexAttribArray, function( index ) {

	var cached = ( cache.enableVertexAttribArrayIndex === index );
	cache.enableVertexAttribArrayIndex = index;
	return cached;

} );

/*
WebGLRenderingContext.prototype.uniform1f = _h( WebGLRenderingContext.prototype.uniform1f, function( location, value ) {

	var cached = ( cache.uniform1f[ location ] === value );
	cache.uniform1f[ location ] = value;
	if( cached ) { console.log( location + ' is ' + value ); }
	return cached;

} );
*/

WebGLRenderingContext.prototype.pixelStorei = _h( WebGLRenderingContext.prototype.pixelStorei, function( pname, param ) {

	var cached = ( cache.pixelStorei[ pname ] === param );
	cache.pixelStorei[ pname ] = param;
	//if( cached ) { console.log( pname + ' is ' + param ); }
	//else { console.log( 'setting ' + pname + ' to ' +param )}
	return cached;

} );

})();