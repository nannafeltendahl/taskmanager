import AddTaskIcon from '@mui/icons-material/AddTask';

function Header() {
    return (
        <header>
            <h1>
                <AddTaskIcon style={{ fontSize: "3rem", marginRight: "10px"}}/>
                Task Maker
            </h1>
        </header>
    );
}

export default Header;