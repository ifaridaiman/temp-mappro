import React from "react";
import styled from "styled-components";

interface EditIconProps {
    fill: string;
    className?: string;
}

const EditIcon: React.FC<EditIconProps> = (props) => {
    return (
        <svg
            className={props.className}
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M29.12,6.05,26,2.88a3,3,0,0,0-4.24,0L6.29,18.29a3.06,3.06,0,0,0-.72,1.18L2.08,29.92l10.46-3.49a3.15,3.15,0,0,0,1.17-.72L29.12,10.29a3,3,0,0,0,0-4.24Zm-21,13.28,8.75-8.74,1.58,1.58L9.67,20.92ZM18.24,9.17l1.59-1.58,4.58,4.58-1.58,1.59ZM7.1,21.19l3.72,3.71L5.25,26.75Zm5.57,2.73-1.59-1.59,8.75-8.74,1.58,1.58Zm15-15-1.88,1.88L21.24,6.17l1.88-1.88A1,1,0,0,1,23.83,4a1,1,0,0,1,.71.29l3.17,3.18a1,1,0,0,1,.29.7A1,1,0,0,1,27.71,8.88Z"
                fill={props.fill || "#000"}
            />
        </svg>
    );
};

const EditIconStyled = styled(EditIcon)`
  svg {
    width: 24px;
    height: 24px;
  }

  path {
    fill: ${(props) => props.fill || "#000"};
  }
`;

export default EditIconStyled;
