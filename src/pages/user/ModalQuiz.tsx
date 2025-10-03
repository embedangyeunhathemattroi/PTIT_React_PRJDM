import React, { useState, useEffect } from "react";
import { Modal, Card, Radio, Progress, Button } from "antd";
import Swal from "sweetalert2";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  category: string;
}

interface AnswerRecord {
  questionId: number;
  selected: string;
  correct: string;
  isCorrect: boolean;
}

interface QuizModalProps {
  visible: boolean;
  onClose: () => void;
  questions: Question[];
  category: string;
  onSaveResult: (score: number, answers: AnswerRecord[]) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ visible, onClose, questions, category, onSaveResult }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!visible) {
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setScore(0);
    }
  }, [visible]);

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) setScore(prev => prev + 1);

    setAnswers(prev => [
      ...prev.filter(a => a.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        selected: selectedAnswer,
        correct: currentQuestion.answer,
        isCorrect,
      }
    ]);

    setSelectedAnswer(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Kết thúc quiz
      const percent = questions.length > 0 ? (score / questions.length) * 100 : 0;
      const imgUrl = percent >= 70 
        ? "https://img.powerpoint.com.vn/uploads/2024/01/27/nhung-hinh-anh-vui-nhon-chen-vao-powerpoint-98_042701237.gif"
        : "https://i.pinimg.com/originals/0e/33/30/0e3330287169a30f2df9ce0d137f7031.gif";

      Swal.fire({
        title: percent >= 70 ? "🎉 Chúc mừng!" : "😅 Cố gắng hơn nhé!",
        html: `
          <img src="${imgUrl}" style="width:150px;height:150px;display:block;margin:0 auto 20px;" />
          <p style="font-size:16px;">Bạn đạt ${score}/${questions.length} câu đúng!</p>
        `,
        showCloseButton: true,
        confirmButtonText: "Xem chi tiết đáp án"
      }).then(() => {
        // Hiển thị bảng chi tiết
        Swal.fire({
          title: "Chi tiết đáp án",
          html: `
            <table border="1" cellspacing="0" cellpadding="5" style="width:100%; text-align:left;">
              <thead>
                <tr>
                  <th>Câu hỏi</th>
                  <th>Đáp án bạn chọn</th>
                  <th>Đáp án đúng</th>
                  <th>Kết quả</th>
                </tr>
              </thead>
              <tbody>
                ${answers.map(a => {
                  const q = questions.find(q => q.id === a.questionId);
                  return `<tr>
                    <td>${q?.question}</td>
                    <td>${a.selected}</td>
                    <td>${a.correct}</td>
                    <td style="color:${a.isCorrect ? 'green' : 'red'}">
                      ${a.isCorrect ? '&#10003;' : '&#10007;'}
                    </td>
                  </tr>`;
                }).join("")}
              </tbody>
            </table>
          `,
          width: "800px",
          confirmButtonText: "OK",
        });
      });

      onSaveResult(score, answers);
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const quizProgress = questions.length > 0
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  return (
    <Modal
      title={`Vocabulary Quiz - ${category}`}
      open={visible}
      footer={null}
      onCancel={onClose}
      width={700}
    >
      {questions.length > 0 && (
        <>
          <Progress percent={quizProgress} style={{ marginBottom: 20 }} />
          <Card style={{ marginBottom: 20 }}>
            <h3 style={{ backgroundColor: selectedAnswer ? "#e6f7e6" : "transparent", padding:"5px 10px", borderRadius:4 }}>
              {currentQuestion.question}
            </h3>
            <Radio.Group
              value={selectedAnswer}
              onChange={e => setSelectedAnswer(e.target.value)}
              style={{ width:"100%" }}
            >
              {currentQuestion.options.map(opt => (
                <Radio key={opt} value={opt} style={{ display:"block", margin:"8px 0", padding:5, borderRadius:4 }}>
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          </Card>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <Button onClick={handlePrev} disabled={currentIndex===0}>Prev</Button>
            <Button type="primary" onClick={handleNext}>
              {currentIndex < questions.length - 1 ? "Next" : "Finish"}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default QuizModal;
