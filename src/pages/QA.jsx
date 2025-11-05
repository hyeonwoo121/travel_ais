import { useState } from 'react'
import styles from './QA.module.css'

const QA = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: '예약 관련',
      questions: [
        {
          q: '예약은 어떻게 하나요?',
          a: '홈페이지에서 원하시는 상품을 선택하신 후 예약하기 버튼을 클릭하시거나, 고객센터(070-3283-5756)로 전화 주시면 상담을 통해 예약하실 수 있습니다.'
        },
        {
          q: '예약 확정은 언제 되나요?',
          a: '예약금 입금 확인 후 24시간 이내에 예약 확정 메시지를 보내드립니다.'
        }
      ]
    },
    {
      category: '결제 관련',
      questions: [
        {
          q: '결제 방법은 어떤 것들이 있나요?',
          a: '계좌이체, 카드결제, 무통장입금 등 다양한 결제 방법을 지원합니다.'
        },
        {
          q: '환불은 어떻게 받나요?',
          a: '출발일 기준으로 환불 규정이 적용되며, 자세한 사항은 상담을 통해 안내해드립니다.'
        }
      ]
    },
    {
      category: '여행 준비',
      questions: [
        {
          q: '여권은 어떻게 준비하나요?',
          a: '여권은 출발일 기준 6개월 이상 유효기간이 남아있어야 하며, 주민센터에서 발급받으실 수 있습니다.'
        },
        {
          q: '비자는 필요한가요?',
          a: '여행지에 따라 비자 필요 여부가 다릅니다. 상담 시 자세히 안내해드립니다.'
        }
      ]
    },
    {
      category: '보험 관련',
      questions: [
        {
          q: '여행자 보험은 필수인가요?',
          a: '필수는 아니지만 안전한 여행을 위해 가입을 권장드립니다. 저희가 대행 서비스도 제공하고 있습니다.'
        }
      ]
    }
  ]

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.qaContainer}>
      <div className={styles.qaHeader}>
        <h1>자주 묻는 질문</h1>
        <p>궁금하신 사항을 찾아보세요</p>
      </div>

      <div className={styles.faqList}>
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.category}</h2>
            {category.questions.map((faq, qIndex) => {
              const uniqueIndex = `${catIndex}-${qIndex}`
              const isOpen = openIndex === uniqueIndex

              return (
                <div key={qIndex} className={styles.faqItem}>
                  <button
                    className={`${styles.faqQuestion} ${isOpen ? styles.active : ''}`}
                    onClick={() => toggleAccordion(uniqueIndex)}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className={styles.faqAnswer}>
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className={styles.contactBox}>
        <h3>더 궁금하신 사항이 있으신가요?</h3>
        <p>언제든지 문의해주세요. 친절하게 답변 드리겠습니다.</p>
        <div className={styles.contactInfo}>
          <div>📞 070-3283-5756</div>
          <div>✉️ info@globaltravel.com</div>
        </div>
      </div>
    </div>
  )
}

export default QA
