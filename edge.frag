// fragment shader
#version 120
uniform sampler2D textureImage;

void main(void)
{
    vec2 tc_offset[9] = vec2[] (
		vec2(-1,1),
		vec2(0,1),
		vec2(1,1),

		vec2(-1,0),
		vec2(0,0),
		vec2(1,0),

		vec2(-1,-1),
		vec2(0,-1), 
		vec2(1,-1)
	);

	float sobel[9] = float[](
   		 1.0,  2.0,  1.0, 
   		 0.0,  0.0,  0.0, 
   		-1.0, -2.0, -1.0  
	);	
    vec4 sample[9];

    for (int i = 0; i < 9; i++)
    {
        sample[i] = texture2D(textureImage, 
                              gl_TexCoord[0].st + tc_offset[i]);
    }

    gl_FragColor = (  sample[0]*sobel[0]
					+ sample[1]*sobel[1]
					+ sample[2]*sobel[2]
					+ sample[3]*sobel[3]
					+ sample[4]*sobel[4]
					+ sample[5]*sobel[5]
					+ sample[6]*sobel[6]
					+ sample[7]*sobel[7]
					+ sample[8]*sobel[8] )/9.0;
}
