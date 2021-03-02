import { Logo, StyledFooter } from './styles';

const Footer = () => (
    <StyledFooter>
        <a href="https://www.trufflesuite.com/ganache" target="_blank" rel="noopener noreferrer">
            <Logo src="/ganache-logomark.svg" alt="Ganache" />
        </a>
        <a href="https://www.trufflesuite.com/" target="_blank" rel="noopener noreferrer">
            <Logo src="/truffle-logomark.svg" alt="Trufflesuite" />
        </a>
        <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB"
            target="_blank"
            rel="noopener noreferrer">
            <Logo src="/metamask.png" alt="Metamask" />
        </a>
    </StyledFooter>
);
export default Footer;
