import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load variables from .env.local without the VITE_ prefix restriction.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],

    // Explicitly define only your Groq keys for the build.
    // This removes the Gemini key from the process.env mapping.
    define: {
      'process.env.VITE_GROQ_KEY_1': JSON.stringify(env.VITE_GROQ_KEY_1),
      'process.env.VITE_GROQ_KEY_2': JSON.stringify(env.VITE_GROQ_KEY_2),
      'process.env.VITE_GROQ_KEY_3': JSON.stringify(env.VITE_GROQ_KEY_3),
      'process.env.VITE_GROQ_KEY_4': JSON.stringify(env.VITE_GROQ_KEY_4),
      'process.env.VITE_GROQ_KEY_5': JSON.stringify(env.VITE_GROQ_KEY_5),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // Standardizes the prefix for your environment variables.
    envPrefix: 'VITE_',
  };
});