import React from 'react';
import styled from 'styled-components';

interface CategoryClassificationIconProps {
    fill: string;
    className?: string;
}

const NewIcon: React.FC<CategoryClassificationIconProps> = (props) => {
    return (
        <svg className={props.className} width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1H2C1.44772 1 1 1.44772 1 2V8C1 8.55228 1.44772 9 2 9H8C8.55228 9 9 8.55228 9 8V2C9 1.44772 8.55228 1 8 1Z" stroke={props.fill} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19 5H13C12.4477 5 12 5.44772 12 6V12C12 12.5523 12.4477 13 13 13H19C19.5523 13 20 12.5523 20 12V6C20 5.44772 19.5523 5 19 5Z" stroke={props.fill} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 13H2C1.44772 13 1 13.4477 1 14V20C1 20.5523 1.44772 21 2 21H8C8.55228 21 9 20.5523 9 20V14C9 13.4477 8.55228 13 8 13Z" stroke={props.fill} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19 17H13C12.4477 17 12 17.4477 12 18V24C12 24.5523 12.4477 25 13 25H19C19.5523 25 20 24.5523 20 24V18C20 17.4477 19.5523 17 19 17Z" stroke={props.fill} stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}

const CategoryClassificationStyled = styled(NewIcon)`
    svg {
        width: 21px;
        height: 26px;
    }

    path {
        fill: ${props => props.fill || '#000'};
    }
`;

export default CategoryClassificationStyled;
