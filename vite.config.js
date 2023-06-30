import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
    return {
        resolve: {
            alias: {
                'babylonjs': mode === 'development' ? 'babylonjs/babylon.max' : 'babylonjs'
            }
        },
        assetsInclude: ['**/*.ico', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'],
        base: '/SlunecniSoustava/'

    };
});
