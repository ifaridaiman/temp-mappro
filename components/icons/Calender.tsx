import React from "react";
import styled from "styled-components";

interface CalendarIconProps {
    fill: string;
    className?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = (props) => {
    return (
        <svg
            className={props.className}
            width="35"
            height="35"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z" />
        </svg>
    );
};

const CalendarIconStyled = styled(CalendarIcon)`
  svg {
    width: 24px;
    height: 24px;
  }

  path {
    fill: ${(props) => props.fill || "#000"};
  }
`;

export default CalendarIconStyled;
