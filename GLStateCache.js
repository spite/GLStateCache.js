(function(){

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

var cache = {};

WebGLRenderingContext.prototype.useProgram = _h( WebGLRenderingContext.prototype.useProgram, function( program ) {

	var cached = ( cache.useProgramProgram === program );
	cache.useProgramProgram = program;
	return cached;

} );

WebGLRenderingContext.prototype.bindBuffer = _h( WebGLRenderingContext.prototype.bindBuffer, function( target, buffer ) {

	var cached = ( cache.bindBufferTarget === target ) && ( cache.bindBufferBuffer === buffer );
	cache.bindBufferTarget = target;
	cache.bindBufferBuffer = buffer;
	return cached;
	
} );

WebGLRenderingContext.prototype.bindRenderbuffer = _h( WebGLRenderingContext.prototype.bindRenderbuffer, function( target, buffer ) {

	var cached = ( cache.bindRenderbufferTarget === target ) && ( cache.bindRenderbufferBuffer === buffer );
	cache.bindRenderbufferTarget = target;
	cache.bindRenderbufferBuffer = buffer;
	return cached;
	
} );

WebGLRenderingContext.prototype.bindTexture = _h( WebGLRenderingContext.prototype.bindTexture, function( target, texture ) {

	var cached = ( cache.bindTextureTarget === target ) && ( cache.bindTextureTexture === texture );
	cache.bindTextureTarget = target;
	cache.bindTextureTexture = texture;
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

WebGLRenderingContext.prototype.disableVertexAttribArray = _h( WebGLRenderingContext.prototype.disableVertexAttribArray, function( index ) {

	var cached = ( cache.disableVertexAttribArrayIndex === index );
	cache.disableVertexAttribArray = index;
	return cached;

} );

})();