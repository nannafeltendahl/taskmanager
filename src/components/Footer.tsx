function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>Copyright Task Maker ⓒ {year}</p>
        </footer>
    );
}

export default Footer;