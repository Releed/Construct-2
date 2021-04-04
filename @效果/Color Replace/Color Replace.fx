// Replace Color
// Rojohound
// PS 2.0
// Replace a certian color with another.

//#PARAM float oldr 0 : old red : Red value to replace.
//#PARAM float oldg 0 : old green : Green value to replace.
//#PARAM float oldb 0 : old blue : Blue value to replace.


//#PARAM float newr 255 : new red : New red value.
//#PARAM float newg 255 : new green : New green value.
//#PARAM float newb 255 : new blue : New blue value.
float oldr;
float oldb;
float oldg;
float newr;
float newb;
float newg;

// Foreground texture
texture ForegroundTexture;

// Background texture
//texture BackgroundTexture;

// Foreground sampler
sampler2D foreground = sampler_state {
    Texture = (ForegroundTexture);
    MinFilter = Point;
    MagFilter = Point;
    MipFilter = Point;
};


// Effect function
float4 EffectProcess( float2 Tex : TEXCOORD0 ) : COLOR0
{
	float4 front = tex2D(foreground, Tex.xy);
        front.rgb /= front.a;
	 if(front.a != 0 && round(front.r * 255) == oldr && round(front.b * 255) == oldb && round(front.g * 255) == oldg)
	 {
		front.r = newr/255;
		front.b = newb/255;
		front.g = newg/255;
	 }
        front.rgb *= front.a;
    return front;
}

// ConstructEffect
technique ConstructEffect
{
    pass p0
    {
        VertexShader = null;
        PixelShader = compile ps_2_0 EffectProcess();
    }
}
