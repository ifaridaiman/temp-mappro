import React from "react";
import styled from "styled-components";

interface ChangeDetectionIconProps {
    fill: string;
    className?: string;
}

const ChangeDetectionIcon: React.FC<ChangeDetectionIconProps> = (props) => {
    return (
        <svg
            className={props.className}
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1355_3196)">
                <path
                    d="M7.8125 1.5625H1.5625V21.875H0V0H9.375V1.5625H7.8125ZM25 0V25H15.625V17.8906C16.0262 17.8911 16.4122 17.7373 16.7031 17.4609L18.2453 15.9922L23.4375 14.6094V11.4203L17.1875 8.29531V9.56406L16.7031 9.10156C16.4122 8.82523 16.0262 8.67137 15.625 8.67188V0H25ZM23.4375 16.225L17.1875 17.8906V23.4375H23.4375V16.225ZM23.4375 1.5625H17.1875V6.54844L23.4375 9.67344V1.5625ZM10.9375 15.625H12.5V25H3.125V3.125H12.5V10.9375H10.9375V4.6875H9.375V21.875H4.6875V23.4375H10.9375V15.625ZM4.6875 7.32969L7.8125 8.89219V4.6875H4.6875V7.32969ZM4.6875 15.8578L7.8125 15.025V10.6406L4.6875 9.07812V15.8578ZM4.6875 20.3125H7.8125V16.6406L4.6875 17.475V20.3125ZM10.9375 14.0625H15.625V16.3281L18.8281 13.2812L15.625 10.2344V12.5H10.9375V14.0625Z"
                    fill={props.fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_1355_3196">
                    <rect width="25" height="25" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

const ChangeDetectionIconStyled = styled(ChangeDetectionIcon)`
  svg {
    width: 25px;
    height: 25px;
  }

  path {
    fill: ${(props) => props.fill || "#000"};
  }
`;

export default ChangeDetectionIconStyled;
