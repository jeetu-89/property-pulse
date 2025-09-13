import { ReactNode } from "react";

interface InfoBoxProps {
  children: ReactNode;
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: {
    text: string;
    link: string;
    backgroundColor: string;
  };
}

const InfoBox = ({
  children,
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo
}: InfoBoxProps) => {
  return (
    <div className={` p-6 rounded-lg shadow-md ${backgroundColor}`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <a
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
};

export default InfoBox;
