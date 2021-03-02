import { StyledNavbar } from './styles';

const Navbar = ({ account }) => (
    <StyledNavbar>
        <small>
            Current Account: <small id="account">{account}</small>
        </small>
    </StyledNavbar>
);
export default Navbar;
