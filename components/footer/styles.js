import styled from 'styled-components';

const Logo = styled.img`
    height: 40px;
`;

const StyledFooter = styled.footer`
    width: 100%;
    height: 100px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        margin-left: 0.5rem;
    }

    a {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export { Logo, StyledFooter };
