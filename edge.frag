// fragment shader
#version 120
uniform sampler2D textureImage;

void main(void)
{
    vec2 offset[9] = vec2[] (
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
   		 -1.0, -2.0,  -1.0  
	);	

	float toLuminance [4] = float[](
	//	0.2126, 0.7152, 0.02722, 0.0
1.0,1.0,1.0,0.0
	);

    vec4 sample[9];

	float size = 512.0;
    for (int i = 0; i < 9; i++)
    {
        sample[i] = texture2D(textureImage, 
                              gl_TexCoord[0].st + (offset[i]/size));
    }
	

    gl_FragColor = 0.0*sample[5] + 
					1.0* vec4(
					
		((sample[0].r*toLuminance[0]*sobel[0]
		+ sample[1].r*toLuminance[0]*sobel[1]
		+ sample[2].r*toLuminance[0]*sobel[2]
		+ sample[3].r*toLuminance[0]*sobel[3]
		+ sample[4].r*toLuminance[0]*sobel[4]
		+ sample[5].r*toLuminance[0]*sobel[5]
		+ sample[6].r*toLuminance[0]*sobel[6]
		+ sample[7].r*toLuminance[0]*sobel[7]
		+ sample[8].r*toLuminance[0]*sobel[8] )/9 ), 

		0*((sample[0].g - sample[0].g*toLuminance[1]*sobel[0]
		+ sample[1].g - sample[1].g*toLuminance[1]*sobel[1]
		+ sample[2].g - sample[2].g*toLuminance[1]*sobel[2]
		+ sample[3].g - sample[3].g*toLuminance[1]*sobel[3]
		+ sample[4].g - sample[4].g*toLuminance[1]*sobel[4]
		+ sample[5].g - sample[5].g*toLuminance[1]*sobel[5]
		+ sample[6].g - sample[6].g*toLuminance[1]*sobel[6]
		+ sample[7].g - sample[7].g*toLuminance[1]*sobel[7]
		+ sample[8].g - sample[8].g*toLuminance[1]*sobel[8] )/9 ), 

		0*((sample[0].b - sample[0].b*toLuminance[2]*sobel[0]
		+ sample[1].b - sample[1].b*toLuminance[2]*sobel[1]
		+ sample[2].b - sample[2].b*toLuminance[2]*sobel[2]
		+ sample[3].b - sample[3].b*toLuminance[2]*sobel[3]
		+ sample[4].b - sample[4].b*toLuminance[2]*sobel[4]
		+ sample[5].b - sample[5].b*toLuminance[2]*sobel[5]
		+ sample[6].b - sample[6].b*toLuminance[2]*sobel[6]
		+ sample[7].b - sample[7].b*toLuminance[2]*sobel[7]
		+ sample[8].b - sample[8].b*toLuminance[2]*sobel[8] )/9 ),

		255

);
					

//    gl_FragColor = (0.0*sample[5] + 
//					1.0*((sample[0].r*toLuminance[0]*sobel[0]
//					+ sample[1].r*toLuminance[1]*sobel[1]
//					+ sample[2].r*toLuminance[1]*sobel[2]
//					+ sample[3].r*toLuminance[1]*sobel[3]
//					+ sample[4].r*toLuminance[0]*sobel[4]
//					+ sample[5].r*toLuminance[0]*sobel[5]
					//+ sample[6].r*toLuminance[0]*sobel[6]
					//+ sample[7].r*toLuminance[0]*sobel[7]
//					+ sample[8].r*toLuminance[0]*sobel[8] )/9 )
//					)/2;
//if(sample[0] == sample[6]) gl_FragColor = vec4(0,1,0,1);
}
