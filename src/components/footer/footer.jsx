import React from 'react';
import './footer.css'; // Import your CSS file
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <footer>
            <div className="footerContainer">
                <div className="socialIcons">
                    <a href=""><i className="fab fa-f"><FacebookIcon /></i></a>
                    <a href=""><i className="fab fa-instagram"><InstagramIcon /></i></a>
                    <a href=""><i className="fab fa-twitter"> <TwitterIcon /></i></a>
                    <a href=""><i className="fab fa-google-plus"><GoogleIcon /></i></a>
                    <a href=""><i className="fab fa-youtube"></i><YouTubeIcon /></a>
                </div>
                <div className="footerNav">
                    <ul>
                        <li><a href="/Home">Home</a></li>
                      
                        <li><a href="/AboutUs">About</a></li>
                        <li><a href="/ContactUs">Contact Us</a></li>
                    
                    </ul>
                </div>
            </div>
            <div className="footerBottom">
                <p>Copyright &copy;2024; Designed by <span className="designer">Yam Yard</span></p>
            </div>
        </footer>
    );
};

export default Footer;
