// seed.js
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function seed() {
  const data = [
    {
      name: "Troy (sample)",
      age: "35",
      gender: "Male",
      description: "Mô tả rút gọn lấy từ index-troy.html",
      avatar_url: "/images/troy.png",
      metadata: { source: "troy-file" }
    },
    {
      name: "Yuri (sample)",
      age: "16",
      gender: "Male",
      description: "Mô tả rút gọn lấy từ index-yuri.html",
      avatar_url: "/images/yuri.png",
      metadata: { source: "yuri-file" }
    }
  ]

  const { error } = await supabase.from('ocs').insert(data)
  if (error) console.error(error)
  else console.log('seeded')
}

seed()
