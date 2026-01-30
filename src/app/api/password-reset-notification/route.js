import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Send custom password reset confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: 'chartsok <onboarding@resend.dev>',
      to: [email],
      subject: 'chartsok 비밀번호 재설정 안내',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%); padding: 40px 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800;">chartsok</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">AI 기반 스마트 차트 솔루션</p>
          </div>
          <div style="padding: 40px 30px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #1E3A5F; margin: 0 0 20px 0; font-size: 22px;">비밀번호 재설정 요청</h2>
            <p style="color: #4b5563; line-height: 1.8; margin-bottom: 20px;">
              비밀번호 재설정을 요청하셨습니다.<br/>
              Firebase에서 별도의 비밀번호 재설정 링크가 포함된 이메일이 발송되었습니다.
            </p>
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">⚠️ 주의사항</h3>
              <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>이 요청을 하지 않으셨다면 이 이메일을 무시하세요</li>
                <li>비밀번호 재설정 링크는 일정 시간 후 만료됩니다</li>
                <li>의심스러운 활동이 있다면 고객지원에 문의해주세요</li>
              </ul>
            </div>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
              도움이 필요하시면 언제든 문의해 주세요.<br/>
              <a href="mailto:chartsok.health@gmail.com" style="color: #4B9CD3;">chartsok.health@gmail.com</a>
            </p>
          </div>
          <div style="text-align: center; padding: 25px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 chartsok. All rights reserved.<br/>
              Powered by jpumki software
            </p>
          </div>
        </div>
      `,
    });

    // Send notification to admin about password reset request
    const adminEmailPromise = resend.emails.send({
      from: 'chartsok <onboarding@resend.dev>',
      to: ['chartsok.health@gmail.com'],
      subject: `[비밀번호 재설정] ${email}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🔑 비밀번호 재설정 요청</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 100px;">이메일</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
                  <a href="mailto:${email}" style="color: #4B9CD3;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: 600; color: #374151;">요청일시</td>
                <td style="padding: 12px 0; color: #1f2937;">${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
              </tr>
            </table>
            <div style="margin-top: 25px; padding: 15px; background: #fef3c7; border-radius: 8px; text-align: center;">
              <p style="color: #92400e; margin: 0;">사용자가 비밀번호 재설정을 요청했습니다.</p>
            </div>
          </div>
        </div>
      `,
    });

    // Send both emails in parallel
    const [userResult, adminResult] = await Promise.all([
      userEmailPromise,
      adminEmailPromise,
    ]);

    if (userResult.error || adminResult.error) {
      console.error('Email errors:', { user: userResult.error, admin: adminResult.error });
    }

    return NextResponse.json({
      success: true,
      userEmailId: userResult.data?.id,
      adminEmailId: adminResult.data?.id,
    });
  } catch (error) {
    console.error('Password reset notification error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
