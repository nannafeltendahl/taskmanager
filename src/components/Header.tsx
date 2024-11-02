import logo from '../images/taskmakerlogo.svg';


function Header() {
    return (
        <header className={"HeaderStyle"}>
            <img src={logo} alt="Task Maker Logo" style={{width: "100px"}}/>
            <h1>Task Maker</h1>
        </header>
    );
}

export default Header;

