import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, comment, lang = 'ru' } = body;

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: 'Номер телефона обязателен' },
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

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    const message = `
🔔 <b>Новая заявка с сайта TOSHKENTSERVICE.UZ</b>

👤 <b>Имя:</b> ${name || 'Не указано'}
📞 <b>Телефон:</b> <a href="tel:${phone.replace(/[^\d+]/g, '')}">${phone}</a>
🔧 <b>Услуга:</b> ${service || 'Не выбрано'}
💬 <b>Комментарий:</b> ${comment || '—'}
🌐 <b>Язык:</b> ${lang.toUpperCase()}
🕒 <b>Время (Ташкент):</b> ${timestamp}
`;

    let telegramSent = false;

    if (telegramBotToken && telegramChatId) {
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
      console.log('ℹ️ [TELEGRAM MOCK] New lead received:', {
        name,
        phone,
        service,
        comment,
        timestamp,
      });
    }

    return NextResponse.json({
      ok: true,
      message: 'Заявка успешно принята',
      telegramSent,
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
