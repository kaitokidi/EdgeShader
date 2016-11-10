// fragment shader
#version 120
uniform float sizeX;
uniform float sizeY;
uniform float size;
uniform vec2 light;
uniform float rotate;
uniform vec2 object;
uniform float windowSize;
uniform sampler2D textureImage;

void main(void) {

	vec2 o;
	o.x = object.x; o.x = 0.0;
	o.y = object.y; o.y = 0.0;
	vec2 l;
	l.x = light.x; l.x = 1.1;
	l.y = light.y; l.y = 1.1;

    vec2 offset[9] = vec2[] (
		vec2(-1, 1), vec2(0, 1), vec2(1, 1),
		vec2(-1, 0), vec2(0, 0), vec2(1, 0),
		vec2(-1,-1), vec2(0,-1), vec2(1,-1)
	);

	float sobel[9];

	mat3 sob = mat3( 
   		 1.0,  2.0,  1.0, 
   		 0.0,  0.0,  0.0, 
   		 -1.0, -2.0,  -1.0  
	);

	float rotation = rotate * 0.0174532925;
	mat3 rot = mat3(
		cos(rotation), sin(rotation), 0.0,
		-sin(rotation), cos(rotation), 0.0,
		0.0		   , 0.0		, 1.0
	);

	sob = rot*sob;

	sobel[0] = sob[0][0];
	sobel[1] = sob[0][1];
	sobel[2] = sob[0][2];
	sobel[3] = sob[1][0];
	sobel[4] = sob[1][1];
	sobel[5] = sob[1][2];
	sobel[6] = sob[2][0];
	sobel[7] = sob[2][1];
	sobel[8] = sob[2][2];

	vec4 toLum;
    toLum.r = 0.2126;
	toLum.g = 0.7152;
	toLum.b = 0.02722;
	toLum.a = 0.0;

    vec4 sample[9];
	float graySample[9];

	float sobelValue = 0.0;
    for (int i = 0; i < 9; i++) {
        sample[i] = texture2D(textureImage, 
                              gl_TexCoord[0].st + (offset[i]/size));
        graySample[i] = dot(sample[i],toLum);
        sobelValue = sobelValue + graySample[i]*sobel[i];
    }

	gl_FragColor = vec4( 
					sample[5].r - sobelValue,
					sample[5].g - sobelValue,
					sample[5].b - sobelValue,
					0);

//if(sample[0] == sample[6]) gl_FragColor = vec4(0,1,0,1);
}