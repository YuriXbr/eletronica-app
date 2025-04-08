/* CARD COMPONENT */
export const TextHeader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div>
      <a href="">
        <div className="flex justify-between items-center p-4 pb-0 ml-3">
          <h2 className="text-2xl font-bold">{text}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </a>
    </div>
  );
};