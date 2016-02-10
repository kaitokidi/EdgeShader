// fragment shader

uniform sampler2D textureImage;

void main(void)
{
    const vec2 tc_offset[9] = { 
		vec2(0,0),
		vec2(0,-1),
		vec2(0,1),
		vec2(1,0),
		vec2(1,-1),
		vec2(1,1),
		vec2(-1,0),
		vec2(-1,-1),
		vec2(-1,1)
	};

	const mat3 m = mat3(
   		1.0, 2.0, 1.0, // first column (not row!)
   		0.0, 0.0, 0.0, // second column
   		-1.0, -2.0, -1.0  // third column
	);
	
    vec4 sample[9];

    for (int i = 0; i < 9; i++)
    {
        sample[i] = texture2D(textureImage, 
                              gl_TexCoord[0].st + tc_offset[i]);
    }

    gl_FragColor = (  sample[0].r*m[0][0] 
					+ sample[1].r*m[0][1]
					+ sample[2].r*m[0][2]
					+ sample[6].r*m[2][0]
					+ sample[7].r*m[2][1]
					+ sample[8].r*m[2][2] )/9.0;
}
