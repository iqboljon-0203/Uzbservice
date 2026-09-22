import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, comment, lang = 'ru', hp_website } = body;

    // Honeypot anti-spam check: if bot filled hidden field, reject silently
    if (hp_website) {
      return NextResponse.json({
        ok: true,
        message: 'Request processed',
      });
    }

    if (!phone || phone.replace(/[^\d]/g, '').length < 9) {
      return NextResponse.json(
        {
          ok: false,
          error:
            lang === 'ru'
              ? 'Пожалуйста, укажите корректный номер телефона'
              : 'Iltimos, to\'g\'ri telefon raqamini kiriting',
        },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('ru-RU', {
      timeZone: 'Asia/Tashkent',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const leadData = {
      id: Date.now(),
      name: name?.trim() || (lang === 'ru' ? 'Клиент с сайта' : 'Saytdan mijoz'),
      phone: phone.trim(),
      service: service || (lang === 'ru' ? 'Общий ремонт' : 'Umumiy ta\'mirlash'),
      comment: comment?.trim() || '—',
      lang,
      timestamp,
      createdAt: new Date().toISOString(),
    };

    // 1. Save lead to Supabase (if configured)
    try {
      const { getServiceSupabase } = await import('@/lib/supabase');
      const supabase = getServiceSupabase();
      await supabase.from('leads').insert({
        name: leadData.name,
        phone: leadData.phone,
        service: leadData.service,
        comment: leadData.comment,
        lang: leadData.lang,
        status: 'new',
      });
    } catch (sbError) {
      console.warn('Could not save lead to Supabase (fallback to local json):', sbError);
    }

    // 2. Save lead to local leads.json backup to guarantee 0% data loss
    try {
      const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');
      let existingLeads = [];
      if (fs.existsSync(leadsFilePath)) {
        const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
        try {
          existingLeads = JSON.parse(fileContent);
        } catch {
          existingLeads = [];
        }
      }
      existingLeads.unshift(leadData);
      // Keep up to 1000 latest leads
      if (existingLeads.length > 1000) existingLeads = existingLeads.slice(0, 1000);
      fs.writeFileSync(leadsFilePath, JSON.stringify(existingLeads, null, 2), 'utf8');
    } catch (saveError) {
      console.error('Failed to save lead locally:', saveError);
    }

    // 2. Telegram Bot notification dispatch
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    const message = `
🔔 <b>Yangi buyurtma (TOSHKENTSERVICE.UZ)</b>

👤 <b>Ism:</b> ${leadData.name}
📞 <b>Telefon:</b> <a href="tel:${leadData.phone.replace(/[^\d+]/g, '')}">${leadData.phone}</a>
🔧 <b>Xizmat:</b> ${leadData.service}
💬 <b>Izoh:</b> ${leadData.comment}
🌐 <b>Til:</b> ${lang.toUpperCase()}
🕒 <b>Vaqt:</b> ${timestamp}
`;

    let telegramSent = false;

    const hasValidTelegramCreds =
      telegramBotToken &&
      telegramChatId &&
      !telegramBotToken.includes('your_bot_token') &&
      !telegramChatId.includes('your_chat_id');

    if (hasValidTelegramCreds) {
      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: message,
              parse_mode: 'HTML',
            }),
          }
        );
        const tgData = await tgRes.json();
        telegramSent = tgData.ok;
      } catch (tgError) {
        console.error('Failed to dispatch to Telegram API:', tgError);
      }
    } else {
      console.log('ℹ️ [TELEGRAM MOCK / NO CREDS] Lead recorded locally in data/leads.json:', leadData);
    }

    return NextResponse.json({
      ok: true,
      message: lang === 'ru' ? 'Заявка успешно принята' : 'Arizangiz muvaffaqiyatli qabul qilindi',
      telegramSent,
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
