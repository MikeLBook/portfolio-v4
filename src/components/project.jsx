import React from 'react';
import {isBrowser} from 'react-device-detect';

const Project = ({ projectClass, image, title, description, tags, links, disableOffset }) => {
    return (
        <div className={isBrowser ? 'project hidden' : 'project'}>
            <div className={`project-display ${projectClass}`}>
                <img src={image} alt="project image" className={`project-image ${!disableOffset && 'offset'}`} />
            </div>
            <div className="project-information">
                <h2>
                    {title}
                </h2>
                <p className='project-description'>
                    {description}
                </p>
                <div className="tags">
                    {tags.map((tag, index) => {
                        return (<div key={`${tag}-${index}`} className="tag">{tag}</div>)
                    })}
                </div>
                {links && 
                (
                    <div className="project-links">
                        <a href={links[0]}><i className="fab fa-github project-link"></i></a>
                        <a href={links[1]}><i className="fas fa-external-link-alt project-link"></i></a>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Project
