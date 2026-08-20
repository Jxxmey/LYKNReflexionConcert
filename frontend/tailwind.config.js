/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // ใช้ Prompt เป็นฟอนต์หลัก (อ่านง่าย ทันสมัย)
        sans: ['Prompt', 'sans-serif'],
        // ใช้ Mali สำหรับหัวข้อหรือข้อความที่ต้องการความน่ารัก
        cute: ['Mali', 'cursive'],
      },
    },
  },
  plugins: [],
}