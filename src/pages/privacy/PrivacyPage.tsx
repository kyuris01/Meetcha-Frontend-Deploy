import React from "react";

const PrivacyPage: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleGoBack}
        style={{
          position: "sticky",
          top: "20px",
          left: "0",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
          marginBottom: "20px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#2980b9";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#3498db";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
      >
        ← 뒤로가기
      </button>

      <h1
        style={{
          textAlign: "center",
          color: "#2c3e50",
          borderBottom: "2px solid #3498db",
          paddingBottom: "10px",
          marginBottom: "30px",
        }}
      >
        개인정보 처리방침
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: "14px", color: "#7f8c8d" }}>최종 업데이트: 2025년 08월 31일</p>
      </div>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          1. 개인정보의 처리 목적
        </h2>
        <p>
          Meetcha(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 이와 관련한 목적이
          변경될 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
          예정입니다.
          <br />
          <br />
          회사는 본 방침에 명시된 목적의 범위 내에서만 개인정보를 이용하며, 명시된 목적을 벗어난
          제3자 제공은 하지 않습니다.
          <br />
          <br />
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>회원 가입 및 관리</li>
          <li>서비스 제공 및 운영</li>
          <li>고객 상담 및 문의 응대</li>
          <li>서비스 개선 및 신규 서비스 개발</li>
          <li>마케팅 및 광고 활용 (사용자 동의 시)</li>
          <li>보안 및 사기 방지</li>
        </ul>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          2. 수집하는 개인정보 항목 및 수집 방법
        </h2>
        <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>

        <h3 style={{ color: "#34495e", marginTop: "15px", marginBottom: "10px" }}>
          2-1. 직접 수집하는 개인정보
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>필수항목:</strong> 이메일 주소, 닉네임
          </li>
          <li>
            <strong>선택항목:</strong> 프로필 이미지, 생년월일, 성별
          </li>
        </ul>

        <h3 style={{ color: "#34495e", marginTop: "15px", marginBottom: "10px" }}>
          2-2. Google 소셜 로그인을 통한 개인정보 수집
        </h3>
        <p>
          <strong>Google OAuth 2.0 인증 서비스 사용:</strong>
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>OAuth 스코프:</strong> email, profile
          </li>
          <li>
            <strong>수집 정보:</strong> Google 계정 이메일 주소, Google 프로필 이름, Google 프로필
            이미지 URL
          </li>
          <li>
            <strong>수집 방법:</strong> Google OAuth 2.0 표준 인증 프로토콜을 통한 안전한 데이터
            전송
          </li>
          <li>
            <strong>권한 범위:</strong> 사용자가 Google 계정에 로그인할 때만 해당 정보에 접근
          </li>
        </ul>

        <p
          style={{
            backgroundColor: "#fff3cd",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ffeaa7",
            marginTop: "15px",
          }}
        >
          <strong>⚠️ 중요:</strong> Google 계정 비밀번호는 절대 수집하지 않으며, Google의 보안
          정책에 따라 모든 인증은 Google 서버에서 처리됩니다.
        </p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          3. 개인정보의 처리 및 보유기간
        </h2>
        <p>
          회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
          동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>회원정보:</strong> 회원 탈퇴 시까지 (단, 관계법령에 따라 보존이 필요한 경우 해당
            기간까지)
          </li>
          <li>
            <strong>Google 연동 정보:</strong> 회원 탈퇴 또는 Google 연동 해제 시 즉시 삭제
          </li>
          <li>
            <strong>서비스 이용기록:</strong> 3년
          </li>
          <li>
            <strong>계약 또는 청약철회 등에 관한 기록:</strong> 5년
          </li>
          <li>
            <strong>대금결제 및 재화 등의 공급에 관한 기록:</strong> 5년
          </li>
          <li>
            <strong>소비자의 불만 또는 분쟁처리에 관한 기록:</strong> 3년
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          4. 개인정보의 제3자 제공 및 국제전송
        </h2>
        <p>
          회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만
          처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에
          해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </p>

        <h3 style={{ color: "#34495e", marginTop: "15px", marginBottom: "10px" }}>
          4-1. Google 서비스와의 데이터 전송
        </h3>
        <p>Google 소셜 로그인 서비스 이용 시, 다음 사항에 동의하게 됩니다:</p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>Google의 개인정보 처리방침 및 서비스 약관 적용</li>
          <li>Google 서버(해외)로의 개인정보 전송</li>
          <li>Google의 데이터 보안 및 암호화 정책 적용</li>
        </ul>

        <h3 style={{ color: "#34495e", marginTop: "15px", marginBottom: "10px" }}>
          4-2. 제3자 제공 제한
        </h3>
        <p>
          회사는{" "}
          <strong>
            귀하의 정보를 제공된 목적 이외의 다른 목적으로 제3자에게 양도하거나 공개하지 않습니다.
          </strong>{" "}
          다만, 법령에 따른 요청·명령이 있는 경우 또는 정보주체의 별도 동의를 받은 경우에 한하여
          예외적으로 제공할 수 있습니다.
        </p>

        <p
          style={{
            backgroundColor: "#e8f5e8",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #c8e6c9",
            marginTop: "15px",
          }}
        >
          <strong>✅ 안전장치:</strong> Google은 EU-US Privacy Shield 인증을 받은 기업으로, 국제
          데이터 전송에 대한 적절한 보호조치를 제공합니다.
        </p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          5. 쿠키 및 추적 기술 사용
        </h2>
        <p>회사는 사용자 경험 향상과 서비스 개선을 위해 다음과 같은 기술을 사용합니다:</p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>세션 쿠키:</strong> 로그인 상태 유지 및 보안 인증
          </li>
          <li>
            <strong>분석 도구:</strong> 서비스 이용 통계 및 개선점 파악
          </li>
          <li>
            <strong>Google Analytics:</strong> 웹사이트 트래픽 분석 (개인 식별 불가)
          </li>
        </ul>
        <p>
          사용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으며, 이 경우 일부 서비스 이용에
          제한이 있을 수 있습니다.
        </p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          6. 개인정보의 파기
        </h2>
        <p>
          회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
          지체없이 해당 개인정보를 파기합니다.
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>전자적 파일 형태:</strong> 복구 및 재생이 불가능한 방법으로 영구 삭제
          </li>
          <li>
            <strong>종이 문서:</strong> 분쇄하거나 소각
          </li>
          <li>
            <strong>Google 연동 해제 시:</strong> Google에서 제공한 프로필 정보 즉시 삭제
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          7. 정보주체의 권리·의무 및 행사방법
        </h2>
        <p>
          정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>개인정보 열람요구</li>
          <li>오류 등이 있을 경우 정정 요구</li>
          <li>삭제요구</li>
          <li>처리정지 요구</li>
          <li>Google 연동 해제 요구</li>
        </ul>
        <p>
          제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실
          수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
        </p>
        <p>
          <strong>Google 연동 해제:</strong> 앱 설정에서 언제든지 Google 계정 연동을 해제할 수
          있으며, 연동 해제 시 Google에서 제공한 모든 정보가 즉시 삭제됩니다.
        </p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          8. 개인정보의 안전성 확보 조치
        </h2>
        <p>회사는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다.</p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>개인정보의 암호화 (AES-256)</li>
          <li>해킹 등에 대비한 기술적 대책 (방화벽, 침입차단시스템)</li>
          <li>개인정보에 대한 접근 제한 및 접근 권한 관리</li>
          <li>개인정보를 취급하는 직원의 최소화 및 교육</li>
          <li>개인정보보호 전담기구의 운영</li>
          <li>정기적인 보안 취약점 점검 및 보안 패치 적용</li>
          <li>Google OAuth 2.0 표준 보안 프로토콜 사용</li>
        </ul>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          9. 개인정보 보호책임자
        </h2>
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의
          불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "5px",
            margin: "15px 0",
          }}
        >
          <p>
            <strong>개인정보 보호책임자</strong>
          </p>
          <p>성명: 나윤상</p>
          <p>직책: 개발자</p>
          <p>연락처: nayounsang722@gmail.com</p>
          <p>팩스: 010-8764-7234</p>
        </div>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          10. 개인정보 처리방침 변경
        </h2>
        <p>
          이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및
          정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
        </p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          11. 개인정보의 안전한 전송
        </h2>
        <p>회사는 개인정보를 안전하게 전송하기 위해 다음과 같은 보안 조치를 취하고 있습니다:</p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>HTTPS 프로토콜을 통한 암호화된 통신 (TLS 1.3)</li>
          <li>Google OAuth 2.0 표준 인증 프로토콜 사용</li>
          <li>개인정보 전송 시 추가 암호화 적용</li>
          <li>정기적인 보안 취약점 점검 및 보안 패치 적용</li>
          <li>Google의 보안 정책 및 데이터 보호 표준 준수</li>
        </ul>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2
          style={{
            color: "#2c3e50",
            borderLeft: "4px solid #3498db",
            paddingLeft: "15px",
          }}
        >
          12. 연락처
        </h2>
        <p>개인정보 처리방침과 관련하여 궁금한 사항이 있으시면 아래로 연락해 주시기 바랍니다.</p>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "5px",
            margin: "15px 0",
          }}
        >
          <p>
            <strong>회사명:</strong> Meetcha
          </p>
          <p>
            <strong>주소:</strong> 서울특별시 광진구 능동로 120 (화양동)
          </p>
          <p>
            <strong>이메일:</strong> nayounsang722@gmail.com
          </p>
          <p>
            <strong>전화번호:</strong> 010-8764-7234
          </p>
        </div>
      </section>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#ecf0f1",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0", fontSize: "14px", color: "#7f8c8d" }}>
          본 개인정보 처리방침은 Google Play Store 정책 및 개인정보보호법을 준수하며 작성되었습니다.
        </p>
        <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#95a5a6" }}>
          Google OAuth 2.0 표준 보안 프로토콜을 사용하여 사용자 개인정보를 보호합니다.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;
