import "./textArea.scss";

interface TextProps {
  text: string;
  setText: (e: string) => void;
  progressBar: boolean;
}

const TextArea = ({ text, setText, progressBar }: TextProps) => {
  const maxLength = 120;

  const getProgressState = () => {
    const length = text.trim().length;

    if (length === 0) return { state: "low", width: 0 };
    if (length < 30)
      return {
        state: "low",
        width: (length / maxLength) * 100,
      };
    if (length < 70)
      return {
        state: "medium",
        width: (length / maxLength) * 100,
      };
    if (length < 115)
      return {
        state: "nice",
        width: (length / maxLength) * 100,
      };
    return {
      state: "good",
      width: (length / maxLength) * 100,
    };
  };

  const progress = getProgressState();

  return (
    <div className="addComment__textArea">
      <textarea
        rows={5}
        placeholder="Напишите короткую информацию о вашей заведении"
        value={text}
        onChange={(e) => setText(e.target.value)}></textarea>

      {progressBar && (
        <div className="addComment__textArea__progress">
          <div className="progress-indicator">
            <div
              className={`progress-bar ${progress.state}`}
              style={{ width: `${progress.width}%` }}></div>
          </div>
          <p className="progress-message">{progress.state}</p>
        </div>
      )}
    </div>
  );
};

export default TextArea;
