import React, { useEffect } from 'react';
import Logo from '../../assets/landing-image.svg';
import About from '../../assets/about.svg';
import sdtools from '../../assets/sdtools.JPG';
import resume from '../../assets/resume.pdf';
import phase2 from '../../assets/phase2.webp';
import ohh from '../../assets/ohh.png';
import Project from '../../components/project';
import { isBrowser } from 'react-device-detect';

const Portfolio = () => {

    useEffect(() => {
        if (isBrowser) {
            const projects = document.querySelectorAll('.project')
            const contact = document.querySelector('.contact-container');
            const button = document.querySelector('.github-plug');
            const headers = document.querySelectorAll('.section-header');
            const allElements = [...projects, contact, button, ...headers];
            const triggerBottom = window.innerHeight / 10 * 9;
            window.addEventListener('scroll', () => {
                allElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    if (elementTop < triggerBottom) {
                        element.classList.remove('hidden');
                    } else {
                        element.classList.add('hidden');
                    }
                });
            })
        }
    }, [])


    return (
        <>
            <div className="landing">
                <div className="landing-image-container">
                    <img src={Logo} className='landing-person' width='80%' />
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='landing-image-blob'>
                        <path fill="#00FF8B" d="M37.4,-57C47.5,-44.1,54.1,-31.9,62,-17.8C69.8,-3.6,79,12.5,77.3,27.3C75.5,42.1,62.8,55.5,48.1,64.4C33.4,73.3,16.7,77.7,1.6,75.6C-13.6,73.4,-27.2,64.8,-39.7,55.2C-52.3,45.6,-63.8,35,-68.5,22C-73.1,8.9,-70.9,-6.7,-67.3,-23C-63.6,-39.3,-58.5,-56.4,-47,-68.8C-35.5,-81.3,-17.8,-89.2,-2.1,-86.3C13.6,-83.5,27.3,-69.9,37.4,-57Z" transform="translate(100 100)" />
                    </svg>
                </div>
                <div className="landing-text-container">
                    <h1>Hello.</h1>
                    <h1>I'm <strong>Michael</strong>.</h1>
                    <p>I am a software engineer with full stack experience using <strong>Python, JavaScript, Kotlin, PHP, HTML5, and CSS3/SASS</strong>. I develop web applications both on and off the job. I enjoy problem solving as well as working with new tools and technologies.</p>
                </div>
            </div>
            <div className="project-container">
                <h1 className={isBrowser ? 'section-header hidden' : 'section-header'}>Experience</h1>
                <Project
                    projectClass='project-phase2'
                    image={phase2}
                    title='Phase 2'
                    description="I currently work at Phase 2 as a software engineer on their POGO team. POGO is a white labeled commercial real estate product that integrates property management, maintenance, bookable spaces, services, amenities, and more into a single platform."
                    tags={['VueJS', 'Kotlin', 'Swift', 'SASS']}
                    disableOffset={true}
                />
                <Project
                    projectClass='project-ohh'
                    image={ohh}
                    title='Oklahoma Heart Hospital'
                    description="As an Applications Developer for Oklahoma Heart Hospital, I was responsible for creating and maintaining dashboards within Cerner PowerChart, report writing and data retrieval using Cerner Command Language, and upkeep of back end jobs and services. During my time there I trained and deployed an AI assisted billing model as well as an in house fax service to save costs, using Millenniums Remote Report Distribution"
                    tags={['React', 'Laravel', 'CCL', 'jQuery']}
                />
                <Project
                    projectClass='project-sdtools'
                    image={sdtools}
                    title='Service Desk Automation'
                    description='Before my transition into a proper software role, I developed applications for the service desk at GlobalHealth. I created various python scripts to automate tasks across various departments, many of which were in the realm of reporting tools. These scripts were accessed through a web console which was hosted internally using IIS'
                    tags={['Python', 'Flask', 'Bootstrap', 'IIS']}
                />
                <form action="https://github.com/MikeLBook">
                    <button type="submit" className={isBrowser ? 'github-plug hidden' : 'github-plug'}><h3>See more on github</h3></button>
                </form>
                <h1 className={isBrowser ? 'section-header hidden' : 'section-header'}>Contact</h1>
            </div>
            <div className="contact-container">
                <div className="contact-card">
                    <h2>Michael Book</h2>
                    <h3>Oklahoma City, OK</h3>
                    <h3>mikebook24@gmail.com</h3>
                    <h3><a href="https://www.linkedin.com/in/michael-book-7a2831128/">LinkedIn</a></h3>
                    <h3><a href={resume}>Resume</a></h3>
                </div>
                <img src={About} className="contact-image" />
            </div>
        </>
    )
}

export default Portfolio;