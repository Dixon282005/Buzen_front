import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo (dev/prod)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    
    // ✅ Configuración CRUCIAL para Vercel
    server: {
      port: 3000,
      host: true, // Importante para despliegues
    },

    // ✅ Configuración de BUILD para producción
    build: {
      outDir: 'dist',
      sourcemap: false, // Mejor performance
      emptyOutDir: true, // Limpiar directorio en cada build
    },

    // ✅ Resolver para imports (opcional pero útil)
    resolve: {
      alias: {
        '@': '/src', // Puedes usar import '@/components'
      }
    },

    // ✅ DEFINIR variables de entorno para que funcionen en build
    define: {
      'import.meta.env.VITE_JAMENDO_CLIENT_ID': JSON.stringify(env.VITE_JAMENDO_CLIENT_ID),
      // Agrega aquí TODAS tus variables de entorno
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },

    // ✅ Optimización para Vercel
    optimizeDeps: {
      exclude: ['lucide-react'] // Ejemplo: excluir dependencias pesadas
    }
  }
})