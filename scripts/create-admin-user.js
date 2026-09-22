const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Parse .env
const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let val = (match[2] || '').trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[match[1]] = val;
  }
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@toshkentservice.uz';
const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin2025';

async function createAdmin() {
  console.log(`Creating/Updating admin: ${ADMIN_EMAIL}...`);
  
  // List existing users to see if already exists
  const { data: listData } = await supabase.auth.admin.listUsers();
  const existing = listData?.users?.find(u => u.email === ADMIN_EMAIL);

  if (existing) {
    const { data, error } = await supabase.auth.admin.updateUserById(existing.id, {
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });
    if (error) console.error('Error updating admin:', error);
    else console.log('✅ Admin user password updated successfully:', data.user.email);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });
    if (error) console.error('Error creating admin:', error);
    else console.log('✅ Admin user created successfully:', data.user.email);
  }
}

createAdmin();
