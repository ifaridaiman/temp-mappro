import React from "react";
import styled from "styled-components";

interface DataPreparationIconProps {
    fill?: string;
    className?: string;
}

const DataPreparationIcon: React.FC<DataPreparationIconProps> = (props) => {
    return (
        <svg
            className={props.className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke={props.fill || "#000000"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const DataPreparationIconStyled = styled(DataPreparationIcon)`
  svg {
    width: 24px;
    height: 24px;
  }

  path {
    stroke: ${(props) => props.fill || "#000"};
  }
`;

export default DataPreparationIconStyled;
