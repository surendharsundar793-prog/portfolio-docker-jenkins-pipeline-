import React from 'react'
import '../assets/Styles/skills.css'
import AnimatedContent from './AnimatedContent'
import ScrollFloat from './ScrollFloat'
import { Folder, FileCode } from 'lucide-react'

const skillsData = [
  { 
    name: "FRONTEND", 
    type: "folder",
    children: [
      { name: "React_JS.tsx", info: "Expert" },
      { name: "JavaScript.js", info: "Advanced" },
      { name: "Framer_Motion.lib", info: "Intermediate" },
      { name: "Global_Styles.css", info: "Expert" }
    ] 
  },
  { 
    name: "BACKEND", 
    type: "folder",
    children: [
      { name: "Spring_Boot.java", info: "Intermediate" },
      { name: "Hibernate.orm", info: "Intermediate" },
      { name: "REST_Endpoints.api", info: "Advanced" },
      { name: "Oracle_DB.sql", info: "Advanced" }
    ] 
  },
  { 
    name: "INFRASTRUCTURE", 
    type: "folder",
    children: [
      { name: "AWS_Cloud.cfg", info: "Basic" },
      { name: "Docker_Deploy.yaml", info: "Intermediate" },
      { name: "Linux_Kernel.sh", info: "Advanced" },
      { name: "CI_CD_Pipeline.yml", info: "Intermediate" }
    ] 
  },
  { 
    name: "TOOLING", 
    type: "folder",
    children: [
      { name: "Git_Version.git", info: "Expert" },
      { name: "VS_Code.env", info: "Daily" },
      { name: "Maven_Build.xml", info: "Advanced" },
      { name: "Infrastructure.tf", info: "Basic" }
    ] 
  }
]

const Skills = () => {
  return (
    <section className="skills-section">
      <div className="skills-container">

        <div className="skills-header">
          <ScrollFloat 
            animationDuration={1.2}
            start="top 90%"
            end="top 40%"
            scrub={0.5}
            textClassName="skills-heading-text"
          >
            <span className="prompt">suren@portfolio:~/skills$</span>
          </ScrollFloat>
          <div className="terminal-log">
             $ tree --level 2 ./expertise
          </div>
        </div>

        <div className="tree-structure">
          <div className="tree-root">.</div>
          
          {skillsData.map((folder, index) => (
            <AnimatedContent
              key={index}
              distance={20}
              duration={0.5}
              delay={index * 0.1}
              className="tree-branch-wrapper"
              once
            >
              <div className="tree-folder">
                <span className="tree-line">├──</span>
                <Folder size={16} className="tree-icon-folder" />
                <span className="folder-name">{folder.name}</span>
              </div>
              
              <div className="tree-children">
                {folder.children.map((child, cidx) => (
                  <div className="tree-file" key={cidx}>
                    <span className="tree-line-indent">│   </span>
                    <span className="tree-line">
                      {cidx === folder.children.length - 1 ? '└──' : '├──'}
                    </span>
                    <FileCode size={14} className="tree-icon-file" />
                    <span className="file-name">{child.name}</span>
                  </div>
                ))}
              </div>
            </AnimatedContent>
          ))}
          <div className="tree-summary">
             4 directories, 16 files
          </div>
        </div>

      </div>
    </section>
  )
}

export default Skills
