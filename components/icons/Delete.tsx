import React from "react";
import styled from "styled-components";

interface DeleteButtonProps {
    fill: string;
    className?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
    return (
        <svg
            className={props.className}
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Fill">
                <rect height="12" width="2" x="15" y="12" fill={props.fill || "#000"} />
                <rect height="12" width="2" x="19" y="12" fill={props.fill || "#000"} />
                <rect height="12" width="2" x="11" y="12" fill={props.fill || "#000"} />
                <path
                    d="M20,6V5a3,3,0,0,0-3-3H15a3,3,0,0,0-3,3V6H4V8H6V27a3,3,0,0,0,3,3H23a3,3,0,0,0,3-3V8h2V6ZM14,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H14ZM24,27a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1V8H24Z"
                    fill={props.fill || "#000"}
                />
            </g>
        </svg>
    );
};

const DeleteButtonStyled = styled(DeleteButton)`
  svg {
    width: 24px;
    height: 24px;
  }

  path, rect {
    fill: ${(props) => props.fill || "#000"};
  }
`;

export default DeleteButtonStyled;
