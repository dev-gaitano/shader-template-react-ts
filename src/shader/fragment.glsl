#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 vUv;

void main() {
        //vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 uv = vUv * 2. - 1.;

        gl_FragColor = vec4(uv.x, uv.y, 0., 1.);
}
