const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let val = (match[2] || '').trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[match[1]] = val;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const tables = ['site_settings', 'services', 'reviews', 'counters', 'service_details', 'breakdowns', 'leads'];
  console.log('=== SUPABASE JADVALLAR HOLATI ===');
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*');
    if (error) {
      console.log(`❌ ${t}: Xatolik - ${error.message}`);
    } else {
      console.log(`✅ ${t}: ${data.length} ta yozuv mavjud.`);
      if (t === 'services') {
        console.log('   Xizmatlar:', data.map(s => s.title_uz).join(', '));
      }
      if (t === 'service_details') {
        console.log('   Ichki sahifalar (slug):', data.map(s => s.slug).join(', '));
      }
      if (t === 'site_settings') {
        console.log('   Sozlamalar bo\'limlari:', [...new Set(data.map(s => s.section))].join(', '));
      }
    }
  }
}
check();
