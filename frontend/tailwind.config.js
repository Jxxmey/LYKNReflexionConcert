/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // บังคับให้ฟอนต์เริ่มต้นของเว็บ (sans) เปลี่ยนเป็น Prompt
        sans: ['Prompt', 'sans-serif'],
        // สร้างคลาสใหม่ font-heading สำหรับใช้กับ Kanit เวลามีหัวข้อที่ต้องการความเท่
        heading: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}