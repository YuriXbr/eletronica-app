
// Card component
// If card type == formulas then bg = #FF7648
// if card type == disciplines then bg = #FFC700
interface CardProps {
  type: string | "formulas";
  icon: string | "formulas";
  title: string | "formulas";
  bgColor: string | "#FF7648";
  link: string | "/";
}

const squareRootSVG = (
      <div className="h-fit w-fit">
        <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_4001_1961)">
            <path d="M22.9313 4.65319H11.2877L6.71721 20.7425C6.57898 21.1713 6.1868 21.4682 5.73649 21.4837C5.72379 21.4837 5.71152 21.4841 5.69946 21.4841C5.2639 21.4841 4.87 21.219 4.70712 20.8124L2.83859 16.1412H1.06851C0.478194 16.1413 0 15.6628 0 15.0726C0 14.4824 0.478678 14.004 1.06851 14.004H3.56223C3.99871 14.004 4.39229 14.2699 4.55457 14.6759L5.59003 17.2644L9.49094 3.25779C9.63299 2.81572 10.0442 2.51601 10.5084 2.51601H22.9314C23.5219 2.51601 24.0001 2.99453 24.0001 3.58452C24.0001 4.17451 23.5215 4.65319 22.9313 4.65319ZM23.5072 19.013L19.2948 14.2814L23.309 9.82552C23.3799 9.74726 23.3971 9.6346 23.3551 9.53804C23.3118 9.44164 23.2164 9.37947 23.1107 9.37947H20.5712C20.4936 9.37947 20.4204 9.41332 20.3689 9.47205L17.6744 12.5965L15.0006 9.47302C14.9501 9.41365 14.8759 9.37947 14.7976 9.37947H12.1422C12.0369 9.37947 11.9414 9.44131 11.8988 9.53712C11.8552 9.6332 11.873 9.7457 11.9432 9.82413L15.9125 14.2815L11.7333 19.0141C11.6635 19.0929 11.647 19.2053 11.6896 19.3007C11.7333 19.3968 11.8288 19.4579 11.9333 19.4579H14.5654C14.6447 19.4579 14.7197 19.4229 14.7703 19.3618L17.5596 16.0148L20.4151 19.3644C20.4662 19.4241 20.5404 19.4582 20.6186 19.4582H23.3083C23.4139 19.4582 23.5094 19.3968 23.552 19.3007C23.595 19.2042 23.5778 19.0918 23.5072 19.013Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_4001_1961">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
);

const threeDotsSVG = (
      <div className="h-fit w-fit rounded-full ">
        <svg fill="#fff" height="24" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 32.055 32.055" xmlSpace="preserve">
        <g>
          <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
            C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
            s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
            c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
        </g>
        </svg>
      </div>
  );

  /**
   * Card component
   * @param {string} (optional) type - card type
   * @param {string} (optional) icon - card icon
   * @param {string} (optional) title - card title
   */
export default function Card({ type = "formulas", icon = "formulas", title = "formulas", bgColor, link }: CardProps) {
  const handleClick = () => {
    window.location.href = `/${link}`;
  };

  return (
    <div className="p-3 mt-3 flex flex-row" onClick={handleClick}>
      <div className={`w-[9.7rem] h-[7.2rem] grid-flow-row grid grid-rows-2 p-4 rounded-xl`} style={{ backgroundColor: bgColor }}>
        <div className="flex flex-row justify-between">
          {squareRootSVG}
          {threeDotsSVG}
        </div>
          <a className="text-white text-lg font-regular poppins-regular pl-0 flex flex-row items-end">{title}</a>
      </div>
    </div>
  );
}

