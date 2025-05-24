import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MovieReviews. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
