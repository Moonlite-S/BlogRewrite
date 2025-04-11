import { useNavigate } from "react-router-dom";

export function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <nav>
                <h6 className="footer-title">Contact Me</h6>
                <a className="link link-hover" target="_blank" href="mailto:example@example.com">Email</a>
                <a className="link link-hover" target="_blank" href="https://www.linkedin.com/in/example">LinkedIn</a>
                <a className="link link-hover" target="_blank" href="https://github.com/Moonlite-S">GitHub</a>
            </nav>
            <nav>
                <h6 className="footer-title">Other Links</h6>
                <a className="link link-hover" onClick={() => navigate("/about")}>About me</a>
                <a className="link link-hover" onClick={() => navigate("/projects")}>Projects</a>
                <a className="link link-hover" onClick={() => navigate("/blogs")}>Blogs</a>
            </nav>
        </footer>
    )
}