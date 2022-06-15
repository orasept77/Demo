import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                IconsResolver({
                    prefix: false,
                    customCollections: [
                        'icon',
                    ]
                }),
            ]
        }),
        Icons({
            scale: 1,
            compiler: 'vue3',
            defaultClass: 'icon',
            customCollections: {
                'icon': FileSystemIconLoader(
                    './public/icons',
                    svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
                ),
            }
        })
    ],
    base: '/jaw-app-public/',
    build: {
        minify: true
    },
    define: {
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: false,
        __INTLIFY_PROD_DEVTOOLS__: false,
    },
})
