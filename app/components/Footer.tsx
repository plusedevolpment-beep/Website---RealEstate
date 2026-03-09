import React from 'react';
import '../Blog/blog.css';

const Footer = () => (
    <footer className="ft">
        <div className="ft-top">
            <h2>Find your dream home today.</h2>
            <div className="ft-btns">
                <a href="/listings" className="ft-bp">Browse Listings</a>
                <a href="/contact" className="ft-bo">Contact Agent</a>
            </div>
        </div>

        <div className="ft-grid">
            <div className="ft-brand">
                <h3>Al Areeq</h3>
                <p>Trusted partner helping families buy, rent and invest in premium Dubai properties since 2012.</p>
            </div>
            <div>
                <h4>Properties</h4>
                <ul>
                    <li><a href="#">Buy</a></li>
                    <li><a href="#">Rent</a></li>
                    <li><a href="#">Luxury</a></li>
                    <li><a href="#">Off-Plan</a></li>
                </ul>
            </div>
            <div>
                <h4>Company</h4>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="#">Agents</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4>Resources</h4>
                <ul>
                    <li><a href="/Blog">Blog</a></li>
                    <li><a href="#">Market Reports</a></li>
                    <li><a href="#">Area Guides</a></li>
                    <li><a href="#">Calculator</a></li>
                </ul>
            </div>
        </div>

        <div className="ft-bot">
            <p>&copy; 2025 Al Areeq Real Estate. All rights reserved.</p>
            <div className="ft-leg">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">RERA Licensed</a>
            </div>
        </div>
    </footer>
);

export default Footer;