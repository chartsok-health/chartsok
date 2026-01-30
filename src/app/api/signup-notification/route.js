import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, displayName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const userName = displayName || email.split('@')[0];

    // Send welcome email to the new user
    const welcomeEmailPromise = resend.emails.send({
      from: 'chartsok <onboarding@resend.dev>',
      to: [email],
      subject: 'chartsok에 오신 것을 환영합니다! Welcome to chartsok!',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%); padding: 40px 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 800;">chartsok</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">AI 기반 스마트 차트 솔루션</p>
          </div>
          <div style="padding: 40px 30px; background: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #1E3A5F; margin: 0 0 20px 0; font-size: 22px;">환영합니다, ${userName}님! 🎉</h2>
            <p style="color: #4b5563; line-height: 1.8; margin-bottom: 20px;">
              chartsok 가입을 진심으로 환영합니다!<br/>
              이제 AI가 차트 작성을 도와드립니다. 진료에 집중하세요.
            </p>
            <div style="background: #f0f9ff; border-left: 4px solid #4B9CD3; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1E3A5F; margin: 0 0 10px 0; font-size: 16px;">시작하기</h3>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>대시보드에서 온보딩을 완료하세요</li>
                <li>첫 진료 녹음을 시작해보세요</li>
                <li>AI가 생성한 SOAP 차트를 확인하세요</li>
              </ul>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://chartsok.com/dashboard"
                 style="display: inline-block; background: linear-gradient(135deg, #4B9CD3 0%, #3A7BA8 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                대시보드 바로가기
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
              궁금한 점이 있으시면 언제든 문의해 주세요.<br/>
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

    // Send notification email to chartsok admin
    const adminEmailPromise = resend.emails.send({
      from: 'chartsok <onboarding@resend.dev>',
      to: ['chartsok.health@gmail.com'],
      subject: `[신규 가입] ${userName} (${email})`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎉 신규 회원 가입</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 100px;">이름</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${userName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">이메일</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
                  <a href="mailto:${email}" style="color: #4B9CD3;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: 600; color: #374151;">가입일시</td>
                <td style="padding: 12px 0; color: #1f2937;">${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
              </tr>
            </table>
            <div style="margin-top: 25px; padding: 15px; background: #ecfdf5; border-radius: 8px; text-align: center;">
              <p style="color: #059669; margin: 0; font-weight: 600;">새로운 사용자가 chartsok에 가입했습니다!</p>
            </div>
          </div>
        </div>
      `,
    });

    // Send both emails in parallel
    const [welcomeResult, adminResult] = await Promise.all([
      welcomeEmailPromise,
      adminEmailPromise,
    ]);

    if (welcomeResult.error || adminResult.error) {
      console.error('Email errors:', { welcome: welcomeResult.error, admin: adminResult.error });
      // Don't fail the request if email fails - user is already signed up
    }

    return NextResponse.json({
      success: true,
      welcomeEmailId: welcomeResult.data?.id,
      adminEmailId: adminResult.data?.id,
    });
  } catch (error) {
    console.error('Signup notification error:', error);
    // Don't fail - signup was successful, just email failed
    return NextResponse.json({ success: false, error: error.message });
  }
}
