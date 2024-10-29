import React from "react";
import styled from "styled-components";

interface SearchIconProps {
    stroke?: string;
    className?: string;
}

const SearchIcon: React.FC<SearchIconProps> = (props) => {
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
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke={props.stroke || "#000000"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const SearchIconStyled = styled(SearchIcon)`
  svg {
    width: 24px;
    height: 24px;
  }

  path {
    stroke: ${(props) => props.stroke || "#000"};
  }
`;

export default SearchIconStyled;
