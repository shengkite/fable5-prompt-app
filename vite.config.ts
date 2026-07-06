import { defineConfig } from 'vite'
import react from '@vitejs/react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/fable5-prompt-app/', // 填入您的 GitHub 儲存庫名稱
})